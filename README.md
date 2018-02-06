# choo-notification
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

[Web Notification][notification] plugin for Choo.

## Usage
```js
var html = require('choo/html')
var choo = require('choo')

var app = choo()
app.use(require('choo-devtools')())
app.use(require('./')())

app.route('/', (state, emit) => {
  return html`
    <body>
      <button onclick=${enable} disabled=${state.notification.permission}>
        ${state.notification.permission
          ? 'Notifications are enabled'
          : 'Enable notifications'}
      </button>

      <button onclick=${notify}>
        Clicky
      </button>
    </body>
  `

  function enable () {
    emit('notification:request')
  }

  function notify () {
    if (state.notification.permission) {
      emit('notification:new', 'clicky!')
    }
  }
})

app.mount('body')
```

## Events
### `'notification:request'` | `state.events.NOTIFICATION_REQUEST`
Request to use the notifications API. Emits either `'notification:granted'` or
`'notification:denied'` after calling it. Also emits a `'render'` event after
the permission state changes.

### `'notification:granted'` | `state.events.NOTIFICATION_GRANTED`
Emitted after calling `'notification:request'`.

### `'notification:denied'` | `state.events.NOTIFICATION_DENIED`
Emitted after calling `'notification:request'`.

### `'notification:new'` | `state.events.NOTIFICATION_NEW`
Emit a new notification. Make sure you have access to send notifications before.

## API
### `notificationPlugin = chooNotification()`
Create a new `choo-notification` instance.

## Installation
```sh
$ npm install choo-notification
```

## License
[Apache-2.0](./LICENSE)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/choo-notification.svg?style=flat-square
[3]: https://npmjs.org/package/choo-notification
[4]: https://img.shields.io/travis/choojs/choo-notification/master.svg?style=flat-square
[5]: https://travis-ci.org/choojs/choo-notification
[6]: https://img.shields.io/codecov/c/github/choojs/choo-notification/master.svg?style=flat-square
[7]: https://codecov.io/github/choojs/choo-notification
[8]: http://img.shields.io/npm/dm/choo-notification.svg?style=flat-square
[9]: https://npmjs.org/package/choo-notification
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard

[notification]: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
