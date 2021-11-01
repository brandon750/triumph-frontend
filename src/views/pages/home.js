import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class HomeView {
  async init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()
    await this.getUsers()    
  }

  async getUsers(){
    try{
      this.users = await UserAPI.getAllUsers()
      console.log(this.users)
      this.render()

    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
    <style>

      .page-content {
        padding: 0;
        max-height: 100%;
        overflow: hidden;
        text-align: center;
      }

      /* .users-grid-home :nth-child(1) {
        display: none;
      } */

      #no-more {
        font-weight: bolder;
        padding: 3em;
      }

      
    </style>

      <va-app-header title="Competitors" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content">
        
        <div class="users-grid-home">
        ${this.users == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${
          
            this.users.map(user => 
            JSON.stringify(Auth.currentUser).includes(user._id) ? '' :
            html`
            <va-user class="user-card ${user._id}"
              id="${user._id}"
              firstName="${user.firstName}"
              lastName="${user.lastName}"
              avatar="${user.avatar}"
              bio="${user.bio}"
              sports="${user.sports}"
              availableDays="${user.availableDays}"
            >
            </va-user>
            `    
            )
          }

        `}
        </div>

        <p id="no-more">No More Competitors!</p>

      </div>   
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()