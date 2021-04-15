'use strict';

angular.module('core.metacom').factory('WebsocketTransport', [
  '$window',
  'Metacom',
  ($window, Metacom) => {
    const connections = new Set();

    $window.addEventListener('online', () => {
      for (const connection of connections) {
        if (!connection.connected) connection.open();
      }
    });

    class WebsocketTransport extends Metacom {
      async open() {
        if (this.connected) return;
        const socket = new WebSocket(this.url);
        this.active = true;
        this.socket = socket;
        connections.add(this);

        socket.addEventListener('message', ({ data }) => {
          if (typeof data === 'string') {
            this.message(data);
            return;
          }
          if (!this.currentStream) return;
          this.currentStream.chunks.push(data);
          this.currentStream = null;
        });

        socket.addEventListener('close', () => {
          this.connected = false;
          setTimeout(() => {
            if (this.active) this.open();
          }, this.reconnectTimeout);
        });

        socket.addEventListener('error', () => {
          socket.close();
        });

        setInterval(() => {
          if (this.active) {
            const interval = new Date().getTime() - this.lastActivity;
            if (interval > this.pingInterval) this.send('{}');
          }
        }, this.pingInterval);

        return new Promise((resolve) => {
          socket.addEventListener('open', () => {
            this.connected = true;
            resolve();
          });
        });
      }

      close() {
        this.active = false;
        connections.delete(this);
        if (!this.socket) return;
        this.socket.close();
        this.socket = null;
      }

      send(data) {
        if (!this.connected) return;
        this.lastActivity = new Date().getTime();
        this.socket.send(data);
      }
    }

    return WebsocketTransport;
  },
]);
