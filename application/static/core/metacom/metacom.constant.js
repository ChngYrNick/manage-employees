'use strict';

angular.module('core.metacom').factory('metacom', [
  'Metacom',
  'WebsocketTransport',
  'HttpTransport',
  (Metacom, WebsocketTransport, HttpTransport) => {
    const protocol = location.protocol === 'http:' ? 'ws' : 'wss';

    Metacom.transport = {
      ws: WebsocketTransport,
      http: HttpTransport,
    };

    return Metacom.create(`${protocol}://${location.host}/api`);
  },
]);
