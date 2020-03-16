'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';

  var StatusCode = {
    OK: 200
  };

  function makeRequest(onSuccess, onPostError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onPostError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onPostError('Произошла ошибка соединения');
    });
    return xhr;
  }

  function getRequest(onPostSuccess, onError) {
    var xhr = makeRequest(onPostSuccess, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
  }

  function postRequest(data, onPostSuccess, onPostError) {
    var xhr = makeRequest(onPostSuccess, onPostError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  }

  window.load = {
    postRequest: postRequest,
    getRequest: getRequest
  };
})();
