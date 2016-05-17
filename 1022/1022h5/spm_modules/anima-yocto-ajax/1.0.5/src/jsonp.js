var $ = require('anima-yocto-core'),
    util = require('./util');

require('anima-yocto-event');

var jsonpID = 0,
    document = window.document,
    ajaxBeforeSend = util.ajaxBeforeSend,
    ajaxSuccess = util.ajaxSuccess,
    ajaxError = util.ajaxError;

$.ajaxJSONP = function(options, deferred){
  if (!('type' in options)) return $.ajax && $.ajax(options);

  var _callbackName = options.jsonpCallback,
    callbackName = ($.isFunction(_callbackName) ?
      _callbackName() : _callbackName) || ('jsonp' + (++jsonpID)),
    script = document.createElement('script'),
    originalCallback = window[callbackName],
    responseData,
    abort = function(errorType) {
      $(script).triggerHandler('error', errorType || 'abort')
    },
    xhr = { abort: abort }, abortTimeout

  if (deferred) deferred.promise(xhr)

  $(script).on('load error', function(e, errorType){
    clearTimeout(abortTimeout)
    $(script).off().remove()

    if (e.type == 'error' || !responseData) {
      ajaxError(null, errorType || 'error', xhr, options, deferred)
    } else {
      ajaxSuccess(responseData[0], xhr, options, deferred)
    }

    window[callbackName] = originalCallback
    if (responseData && $.isFunction(originalCallback))
      originalCallback(responseData[0])

    originalCallback = responseData = undefined
  })

  if (ajaxBeforeSend(xhr, options) === false) {
    abort('abort')
    return xhr
  }

  window[callbackName] = function(){
    responseData = arguments
  }

  script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
  document.head.appendChild(script)

  if (options.timeout > 0) abortTimeout = setTimeout(function(){
    abort('timeout')
  }, options.timeout)

  return xhr
}

module.exports = $;
