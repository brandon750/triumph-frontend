import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class GuideView {
  init(){
    document.title = 'Guide'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
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

  async updateCurrentUser(){
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, { newUser: false}, 'json')
      console.log('user updated')
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
    gotoRoute('/')
  }

  render(){

    const template = html`

      <style>
        input[type="file"] {
          color: #fff;
          text-align: center;
        }

        ::-webkit-file-upload-button {
          background: var(--brand-color);
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 0.4em;
          box-shadow: 0px 10px 10px 0px #0000001e;
        }

        .checkbox::part(label) {
          color: #fff;
        }

      </style>

      <va-app-header title="" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">        

        <h2 class="brand-color">Welcome ${Auth.currentUser.firstName}!</h2>
        <!-- <p>Only a few more steps and you're all set up!</p> -->
        
        ${(this.user == null) ? html`
          <sl-spinner></sl-spinner>
        `:html`

          <sl-form class="page-form" @sl-submit=${this.updateProfileSubmitHandler.bind(this)}>

          <!-- <div class="input-group">      
            <p>Upload a profile picture:</p>   
            ${(this.user.avatar) ? html`
            <sl-avatar id="edit-prof-av" style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
                <input id="file-upload" type="file" name="avatar" />
            `: html`
              <input type="file" name="avatar" />
            `}
          </div> -->

          <p>Select your availability:</p> 
            <div class="input-group">
              <sl-checkbox class="checkbox" name="availableDays" value="monday" checked>
                Monday
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="availableDays" value="tuesday" checked>
                  Tuesday
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="availableDays" value="wednesday" checked>
                  Wednesday
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="availableDays" value="thursday" checked>
                  Thursday
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="availableDays" value="friday" checked>
                  Friday
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="availableDays" value="saturday" checked>
                  Saturday
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="availableDays" value="sunday" checked>
                  Sunday
              </sl-checkbox>
            </div>

            <p>Select your sports:</p> 

            <div class="input-group">
              <sl-checkbox class="checkbox" name="sports" value="tennis">
                Tennis
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="sports" value="boxing">
                Boxing
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="sports" value="basketball">
                Basketball
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="sports" value="tableTennis">
                Table Tennis
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="sports" value="martialArts">
                Martial Arts
              </sl-checkbox>
            </div>
            <div class="input-group">
              <sl-checkbox class="checkbox" name="sports" value="chess">
                Chess
              </sl-checkbox>
            </div>
            


            <sl-button type="primary" pill class="submit-btn2" submit>Update Profile</sl-button>
          </sl-form>
        `}
        
        <!-- <sl-button type="primary" @click=${() => gotoRoute('/')}>Okay got it!</sl-button> -->
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new GuideView()