import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class MessagesView {
  init(){
    document.title = 'Template'

    this.render()  
    Utils.pageIntroAnim()
    this.getFavUsers()
  }

  async getFavUsers(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favUsers = currentUser.favouriteUsers
      console.log(this.favUsers)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`

    <style>

      .page-content {
        overflow-x: hidden;
      }
      .avatar-div{
        left: 0;
        overflow: auto;
        white-space: nowrap;
      }

      ::-webkit-scrollbar {
          height: 4px;
          width: px;
          background: transparent;  
      }

      ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 20px;
      }

      h3 {
        color: var(--brand-color);
        font-size: 1em;
      }

    </style>

      <va-app-header title="Messages" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  
        <h3>New Competitors</h3>     
        <div class="avatar-div">
          ${this.favUsers == null ? html`
            <sl-spinner></sl-spinner>
          ` : html`
            ${this.favUsers.map(user => html`

            <va-user-av class="user-card ${user._id}"
              id="${user._id}"
              firstName="${user.firstName}"
              lastName="${user.lastName}"
              avatar="${user.avatar}"
              bio="${user.bio}"
              sports="${user.sports}"
              availableDays="${user.availableDays}"
            >
            </va-user-av>

            `)}
          `}
        </div>
        <br>
        <h3>Messages</h3>  
        ${this.favUsers == null ? html`
            <sl-spinner></sl-spinner>
          ` : html`
            ${this.favUsers.map(user => html`

            <va-user3 class="user-card ${user._id}"
              id="${user._id}"
              firstName="${user.firstName}"
              lastName="${user.lastName}"
              avatar="${user.avatar}"
              bio="${user.bio}"
              sports="${user.sports}"
              availableDays="${user.availableDays}"
            >
            </va-user3>

            `)}
          `}
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new MessagesView()