import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/va-user'
import './components/va-user2'
import './components/va-user3'
import './components/va-user-av'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})