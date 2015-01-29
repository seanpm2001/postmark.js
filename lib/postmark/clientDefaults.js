module.exports = {
  requestHost: "api.postmarkapp.com",
  authorizationHeader: null,
  ssl: true,
  //define a function that can accept the options for a client
  requestFactory: function(options) {
    var client = require('http' + (options.ssl === true ? 's' : ''));

    return function(path, type, content, callback) {
      var msg = null;
      if (content) {
        msg = JSON.stringify(content);
      }
      var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(msg)
      };
      headers[options.authorizationHeader] = options.api_key;

      var req = client.request({
        host: options.requestHost,
        path: path,
        method: type,
        headers: headers,
        port: (options.ssl ? 443 : 80)
      }, function(response) {

        var body = "";

        response.on("data", function(i) {
          body += i;
        });

        response.on("end", function() {
          if (response.statusCode == 200) {
            if (callback) {
              try {
                var ret = JSON.parse(body);
                callback(null, ret);
              } catch (e) {
                callback(e);
              }
            }
          } else {
            if (callback) {
              var data;
              try {
                data = JSON.parse(body);
                callback(null, {
                  status: response.statusCode,
                  message: data['Message'],
                  code: data['ErrorCode']
                });
              } catch (e) {
                callback({
                  status: 404,
                  message: "Unsupported Request Method and Protocol",
                  code: -1 // this is a fake error code !
                });
              }

            }
          }
        });
      });

      req.on('error', function(err) {
        if (callback) {
          callback(err);
        }
      });

      if (msg) {
        req.write(msg);
      }
      req.end();
    }
  }
};