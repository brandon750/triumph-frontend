import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class ProfileView {
  init(){
    console.log('ProfileView.init')
    document.title = 'Profile'    
    this.render()    
    Utils.pageIntroAnim()
  }


  render(){

    const template = html`
    <style>
        .profile-wrap {
          margin-top: 4em;
        }
    </style>
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>

      <div class="profile-wrap">

        <va-user2 class="user-card ${Auth.currentUser._id}"
          id="${Auth.currentUser._id}"
          firstName="${Auth.currentUser.firstName}"
          lastName="${Auth.currentUser.lastName}"
          avatar="${Auth.currentUser.avatar}"
          bio="${Auth.currentUser.bio}"
          sports="${Auth.currentUser.sports}"
          availableDays="${Auth.currentUser.availableDays}"
        >
        </va-user2>

      </div>

      <sl-button class="edit-class-btn" circle size="small" @click=${()=> gotoRoute('/editProfile')}><sl-icon name="gear-fill"></sl-icon></sl-button>
    `
    render(template, App.rootEl)
  }
}


export default new ProfileView()