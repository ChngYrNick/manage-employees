'use strict';

angular.module('core.metacom').factory('HttpTransport', [
  'MetacomError',
  'Metacom',
  (MetacomError, Metacom) => {
    class HttpTransport extends Metacom {
      async open() {
        this.active = true;
        this.connected = true;
      }

      close() {
        this.active = false;
        this.connected = false;
      }

      send(data) {
        this.lastActivity = new Date().getTime();
        fetch(this.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: data,
        }).then((res) => {
          const { status } = res;
          if (status === 200) {
            return res.text().then((packet) => {
              if (packet.error) throw new MetacomError(packet.error);
              this.message(packet);
            });
          }
          throw new Error(`Status Code: ${status}`);
        });
      }
    }

    return HttpTransport;
  },
]);
