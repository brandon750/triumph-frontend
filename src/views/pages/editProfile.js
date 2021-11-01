import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'
import moment from 'moment'

class EditProfileView {
  init(){
    console.log('EditProfileView.init')
    document.title = 'Edit Profile'    
    this.user = null
    this.render()    
    Utils.pageIntroAnim()
    this.getUser()    
  }

  async getUser(){
    try {
      this.user = await UserAPI.getUser(Auth.currentUser._id)      
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  async updateProfileSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn2')
    submitBtn.setAttribute('loading', '')
    try {
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, formData)      
      delete updatedUser.password        
      this.user = updatedUser     
      Auth.currentUser = updatedUser
      this.render()
      Toast.show('profile updated')
    }catch(err){      
      Toast.show(err, 'error')
    }
    submitBtn.removeAttribute('loading')
  }

  render(){
    const template = html`
      <style>
        
      input[type="file"] {
        display: none;
      }

      .input-group.a {
        margin-bottom: 0.5em;
      }

      </style>

      <va-app-header title="Edit Profile" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      <div class="page-content calign">        
        ${(this.user == null) ? html`
          <sl-spinner></sl-spinner>
        `:html`

          <sl-form class="page-form" @sl-submit=${this.updateProfileSubmitHandler.bind(this)}>

          <div class="input-group a">         
            ${(this.user.avatar) ? html`
            <sl-avatar id="edit-prof-av" style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
              <label for="file-upload" class="custom-file-upload">
              <sl-icon name="pencil-fill"></sl-icon>
              </label>
                <input id="file-upload" type="file" name="avatar" />
            `: html`
              <label for="file-upload" class="custom-file-upload">
              <sl-icon name="pencil-fill"></sl-icon>
              </label>
              <input id="file-upload" type="file" name="avatar" />
            `}
          </div>

          <h2>${Auth.currentUser.firstName}</h2>
          <p id="rank-text" >Intermediate | Rank: 527</p>
          <h4 id="location-tag">Canning Vale, WA</h4>

            <div class="input-group">
              <sl-input class="input-bar2" pill type="text" name="firstName" value="${this.user.firstName}" placeholder="First Name"></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="input-bar2" pill type="text" name="lastName" value="${this.user.lastName}" placeholder="Last Name"></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="input-bar2" pill type="text" name="email" value="${this.user.email}" placeholder="Email Address"></sl-input>
            </div>
            
            <div class="input-group">
              <sl-textarea class="input-bar2 b" name="bio" rows="4" placeholder="Bio" value="${this.user.bio}"></sl-textarea>
            </div>
            <sl-button type="primary" pill class="submit-btn2" submit>Update Profile</sl-button>
          </sl-form>
        `}
      </div>
    `
    render(template, App.rootEl)
  }
}

export default new EditProfileView()