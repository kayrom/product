// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
function ajaxBeforeSend(xhr, settings) {
  var context = settings.context
  if (settings.beforeSend && settings.beforeSend.call(context, xhr, settings) === false)
    return false
}
function ajaxSuccess(data, xhr, settings, deferred) {
  var context = settings.context, status = 'success'
  settings.success && settings.success.call(context, data, status, xhr)
  if (deferred) deferred.resolveWith(context, [data, status, xhr])
  ajaxComplete(status, xhr, settings)
}
// type: "timeout", "error", "abort", "parsererror"
function ajaxError(error, type, xhr, settings, deferred) {
  var context = settings.context
  settings.error && settings.error.call(context, xhr, type, error)
  if (deferred) deferred.rejectWith(context, [xhr, type, error])
  ajaxComplete(type, xhr, settings)
}
// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
function ajaxComplete(status, xhr, settings) {
  var context = settings.context
  settings.complete && settings.complete.call(context, xhr, status)
}

module.exports = {
  ajaxBeforeSend: ajaxBeforeSend,
  ajaxSuccess: ajaxSuccess,
  ajaxError: ajaxError
}
