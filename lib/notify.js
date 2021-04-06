const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const config = require('../config');
const debug = require('debug')('pep-proxy:CM-Notify');

exports.notify = function (options, data, callBackOK, callbackError) {
  // if (config.canismajor.verbs.includes(options.method)) {
  options.headers = options.headers || {};

  callbackError =
    callbackError ||
    function (status, resp) {
      debug(status);
      debug(resp);
    };
  callBackOK =
    callBackOK ||
    function (status, resp) {
      debug('Response: ', status);
      debug(' Body: ', resp);
    };

  const url = config.canismajor;
  const xhr = new XMLHttpRequest();
  xhr.open(options.method, url + options.path, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  // if (options.headers["content-type"]) {
  //     xhr.setRequestHeader("Content-Type", options.headers["content-type"]);
  // }
  for (const headerIdx in options.headers) {
    switch (headerIdx) {
      // Unsafe headers
      case 'host':
        break;
      case 'connection':
        break;
      case 'referer':
        break;
      //            case "accept-encoding":
      //            case "accept-charset":
      //            case "cookie":
      case 'content-type':
        break;
      case 'origin':
        break;
      default:
        xhr.setRequestHeader(headerIdx, options.headers[headerIdx]);
        break;
    }
  }

  xhr.onerror = function () {
    // DO NOTHING?
  };
  xhr.onreadystatechange = function () {
    // This resolves an error with Zombie.js
    if (flag) {
      return;
    }

    if (xhr.readyState === 4) {
      flag = true;

      if (xhr.status !== 0 && xhr.status < 400) {
        const allHeaders = xhr.getAllResponseHeaders().split('\r\n');
        const headers = {};
        for (const h in allHeaders) {
          headers[allHeaders[h].split(': ')[0]] = allHeaders[h].split(': ')[1];
        }
        callBackOK(xhr.status, xhr.responseText, headers);
      } else {
        callbackError(xhr.status, xhr.responseText);
      }
    }
  };

  let flag = false;
  console.log('Sending ', options.method, ' to: ' + url);
  console.log(' Headers: ', options.headers);
  console.log(' Body: ', data);
  if (data !== undefined) {
    try {
      xhr.send(data);
    } catch (e) {
      console.log('error cauthg');
      callbackError(e.message);
    }
  } else {
    try {
      xhr.send();
    } catch (e) {
      callbackError(e.message);
    }
  }
  // } else {
  //   console.log(options.method + ' not supported by cm');
  // }
};
