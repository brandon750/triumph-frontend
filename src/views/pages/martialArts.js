import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import Toast from '../../Toast'
import UserAPI from '../../UserAPI'

class MartialArtsView {
  init(){
    document.title = 'Martial Arts'   
    this.favUsers = null
    this.filteredUsers = null  
    this.sport = 'martialArts'
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
          overflow-x: hidden;
        }

        h3 {
          color: var(--brand-color);
        }
      </style>

      <va-app-header title="Martial Arts" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      
      <div class="page-content">

<h3>New Competitors</h3>     
<div class="avatar-div">
${
    this.favUsers == null ? html`
      <sl-spinner></sl-spinner>
    ` : JSON.stringify(this.favUsers).includes(this.sport) ?
    html`
      ${ this.favUsers.map(user => 
        JSON.stringify(user).includes(this.sport) ?             
        html`
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
        ` : '' )
      }
    ` : html`<h4 class="text-center"><style>h4{margin: auto;}</style>You haven't liked any ${this.sport} playing users!</h4>`
  } 
</div>
<br>
<h3>Messages</h3>  
  ${
    this.favUsers == null ? html`
      <sl-spinner></sl-spinner>
    ` : JSON.stringify(this.favUsers).includes(this.sport) ?
    html`
      ${ this.favUsers.map(user => 
        JSON.stringify(user).includes(this.sport) ?             
        html`
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
        ` : '' )
      }
    ` : html`<h4 class="text-center"><style>h4{margin: auto;}</style>You haven't liked any ${this.sport} playing users!</h4>`
  } 
</div>   
    `
    render(template, App.rootEl)
  }
}


export default new MartialArtsView()