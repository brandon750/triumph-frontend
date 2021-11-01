import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class FavouriteUsersView {
  init(){
    document.title = 'FavouriteUsers'
    this.favUsers = null    
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
          padding: 1em;
          overflow: auto;
        }
      </style>

      <va-app-header title="Your Competitors" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <div class="users-grid">
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
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new FavouriteUsersView()