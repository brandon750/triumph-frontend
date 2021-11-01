import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

class SettingsView {
  init(){
    document.title = 'Settings'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`

      <style>
        .settingsLogOut {
          cursor: pointer;
        }
      </style>

      <va-app-header title="Settings" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <div class="settingsHeader">GENERAL</div>
        <div class="switchDiv"><p><style>.switchDiv p {font-weight: 400;}</style>Push Notifications</p><sl-switch class="switchDivSwitch" style="--width: 80px; --height: 32px; --thumb-size: 26px;"></sl-switch></div>
        <div class="switchDiv"><p>Location Services</p><sl-switch class="switchDivSwitch" style="--width: 80px; --height: 32px; --thumb-size: 26px;"></sl-switch></div>
        <div class="settingsFakeLink">Language</div>
        <div class="settingsFakeLink">Accessibility</div>
        <br>
        <div class="settingsHeader">ACCOUNT</div>
        <div class="settingsFakeLink">Manage my account</div>
        <div class="settingsFakeLink">Privacy and safety</div>
        <div class="settingsFakeLink">Share Profile</div>
        <br>
        <div class="settingsHeader">SUPPORT</div>
        <div class="settingsFakeLink">Report a problem</div>
        <div class="settingsFakeLink">Report an account</div>
        <div class="settingsFakeLink">Contact and FAQ</div>
      
        <div class="settingsLogOut" @click="${() => Auth.signOut()}"><p>Sign Out</p></div>

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new SettingsView()