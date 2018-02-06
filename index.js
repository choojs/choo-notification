var assert = require('assert')

module.exports = notificationsStore

function notificationsStore () {
  _notificationsStore.storeName = 'choo-notification'
  return _notificationsStore

  function _notificationsStore (state, emitter) {
    assert.equal(typeof state, 'object', 'choo-notification: state should be type object')
    assert.equal(typeof emitter, 'object', 'choo-notification: emitter should be type object')

    state.events.NOTIFICATION_REQUEST = 'notification:request'
    state.events.NOTIFICATION_GRANTED = 'notification:granted'
    state.events.NOTIFICATION_DENIED = 'notification:denied'
    state.events.NOTIFICATION_NEW = 'notification:new'

    state.notification = {
      permission: false
    }

    emitter.on(state.events.DOMCONTENTLOADED, function () {
      setPermission(window.Notification.permission)

      emitter.on(state.events.NOTIFICATION_REQUEST, function () {
        if (state.notification.permission) {
          return Promise.resolve().then(function () {
            emitter.emit(state.events.NOTIFICATION_GRANTED)
          })
        }

        window.Notification.requestPermission().then(function (permission) {
          setPermission(permission)
          if (state.notification.permission) {
            emitter.emit(state.events.NOTIFICATION_GRANTED)
          } else {
            emitter.emit(state.events.NOTIFICATION_DENIED)
          }
        })
      })

      emitter.on(state.events.NOTIFICATION_NEW, function (title, opts) {
        new window.Notification(title, opts) // eslint-disable-line
      })

      function setPermission (permission) {
        state.notification.permission = permission === 'granted'
        emitter.emit('render')
      }
    })
  }
}
