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
