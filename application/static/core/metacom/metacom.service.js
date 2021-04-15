'use strict';

angular.module('core.metacom').factory('Metacom', [
  'EventEmitter',
  'MetacomError',
  'MetacomInterface',
  (EventEmitter, MetacomError, MetacomInterface) => {
    const CALL_TIMEOUT = 7 * 1000;
    const PING_INTERVAL = 60 * 1000;
    const RECONNECT_TIMEOUT = 2 * 1000;

    class Metacom extends EventEmitter {
      constructor(url, options = {}) {
        super();
        this.url = url;
        this.socket = null;
        this.api = {};
        this.callId = 0;
        this.calls = new Map();
        this.streams = new Map();
        this.currentStream = null;
        this.active = false;
        this.connected = false;
        this.lastActivity = new Date().getTime();
        this.callTimeout = options.callTimeout || CALL_TIMEOUT;
        this.pingInterval = options.pingInterval || PING_INTERVAL;
        this.reconnectTimeout = options.reconnectTimeout || RECONNECT_TIMEOUT;
        this.open();
      }

      static create(url, options) {
        const { transport } = Metacom;
        const Transport = url.startsWith('ws') ? transport.ws : transport.http;
        return new Transport(url, options);
      }

      message(data) {
        if (data === '{}') return;
        this.lastActivity = new Date().getTime();
        let packet;
        try {
          packet = JSON.parse(data);
        } catch {
          return;
        }
        const [callType, target] = Object.keys(packet);
        const callId = packet[callType];
        const args = packet[target];
        if (callId && args) {
          if (callType === 'callback') {
            const promised = this.calls.get(callId);
            if (!promised) return;
            const [resolve, reject] = promised;
            if (packet.error) {
              reject(new MetacomError(packet.error));
              return;
            }
            resolve(args);
            return;
          }
          if (callType === 'event') {
            const [interfaceName, eventName] = target.split('/');
            const metacomInterface = this.api[interfaceName];
            metacomInterface.emit(eventName, args);
          }
          if (callType === 'stream') {
            const { name, size, status } = packet;
            if (name) {
              const stream = { name, size, chunks: [], received: 0 };
              this.streams.set(callId, stream);
              return;
            }
            const stream = this.streams.get(callId);
            if (status) {
              this.streams.delete(callId);
              const blob = new Blob(stream.chunks);
              blob.text().then((text) => {
                console.log({ text });
              });
              return;
            }
            this.currentStream = stream;
          }
        }
      }

      async load(...interfaces) {
        const introspect = this.scaffold('system')('introspect');
        const introspection = await introspect(interfaces);
        const available = Object.keys(introspection);
        for (const interfaceName of interfaces) {
          if (!available.includes(interfaceName)) continue;
          const methods = new MetacomInterface();
          const iface = introspection[interfaceName];
          const request = this.scaffold(interfaceName);
          const methodNames = Object.keys(iface);
          for (const methodName of methodNames) {
            methods[methodName] = request(methodName);
          }
          this.api[interfaceName] = methods;
        }
      }

      scaffold(iname, ver) {
        return (methodName) => async (args = {}) => {
          const callId = ++this.callId;
          const interfaceName = ver ? `${iname}.${ver}` : iname;
          const target = interfaceName + '/' + methodName;
          if (!this.connected) await this.open();
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (this.calls.has(callId)) {
                this.calls.delete(callId);
                reject(new Error('Request timeout'));
              }
            }, this.callTimeout);
            this.calls.set(callId, [resolve, reject]);
            const packet = { call: callId, [target]: args };
            this.send(JSON.stringify(packet));
          });
        };
      }
    }

    return Metacom;
  },
]);
