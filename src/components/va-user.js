import { LitElement, html, css } from '@polymer/lit-element'
import { directive, render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'

customElements.define('va-user', class User extends LitElement {
  constructor(){
    super() 
  }

  static get properties(){
    return {
      id: {
        type: String
      },
      firstName: {
        type: String
      }, 
      lastName: {
        type: String
      },   
      avatar: {
        type: String    
      }, 
      bio: {
        type: String    
      },
      availableDays: {
        type: String
      },
      sports: {
        type: String
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  testHandler(){
    alert("test")
  }


  async addFavHandler(){   
    console.log(this.classList)
    try {
      await UserAPI.addFavUser(this.id)
      Toast.show('Competitor Saved')

      const currentUser = document.getElementsByClassName('user-card ' + this.id)

      let flash = document.createElement('div')
      flash.className="flash"
      document.body.appendChild(flash)

      setTimeout(function(){
        while(currentUser.length > 0){
          currentUser[0].parentNode.removeChild(currentUser[0])
        }
        flash.remove()
      },200)

    }catch(err){
      Toast.show(err, 'error')
    }
  }

  declineUser(){

    console.log(this)

    const currentUser = document.getElementsByClassName('user-card ' + this.id)
    
    let flash = document.createElement('div')
    flash.className="flash"
    document.body.appendChild(flash)

    setTimeout(function(){
      while(currentUser.length > 0){
        currentUser[0].parentNode.removeChild(currentUser[0])
      }
      flash.remove()
    },200)
  }
  
  render(){    
    return html`
    <style>

      h1, h2, h3, h4, p {
        color: #fff;
      }

      .profile-divider {
        width: 100%;
        height: 1px;
        background-color: #8a8a8a;
        margin-top: 2%;
        margin-bottom: 2%;
      }
      
      .user-info {
        text-align: left;
        overflow-x: hidden;
      }
      
      .sports-container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        min-height: 50px;
        margin-top: -20px;
      }
      
      .user-info h4 {
        font-weight: 500;
      }
      
      .profile-bio {
        font-size: 0.8em;
      }
      
      .profile-availability {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 50px;
        margin-top: -20px;
      }
      
      .wk-day {
        margin: auto;
      }

      .wk-day p {
        color: #b3b3b3;
      }
      
      .user-info {
        background: #636363;
        border-radius: 30px 30px 0px 0px;
        max-width: 100%;
        padding: 1em;
        padding-top: 0em;
        height: 75vh;
        box-shadow: 0px -20px 30px 0px #1e1e1e80;
        box-shadow: 0px -2px 1px 0px #ffffff8c;
        overflow: hidden;
      }

      .user-profile {
        text-align: center;
        margin: 0;
        max-width: 100%;
        max-height: 100vh;
        background: rgb(27,29,32);
        background: linear-gradient(0deg, rgba(27,29,32,1) 56%, rgba(65,68,72,1) 71%);
      }

      h2 {
        margin-top: 1.1em;
      }

      .acceptBtn::part(base) {
        z-index: 100;
        position: absolute;
        background: #0ab60f;
        box-shadow: inset 0px 0px 5px rgba(27,29,32,1);
        opacity: 0.9;
        border: none;
        width: 65px;
        height: 65px;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
      }

      .declineBtn::part(base) {
        z-index: 100;
        position: absolute;
        background: #E6400C;
        box-shadow: inset 0px 0px 5px rgba(27,29,32,1);
        opacity: 0.9;
        border: none;
        width: 65px;
        height: 65px;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
      }


      .acceptBtn::part(label) {
        padding: 0;
        height: 35px;
        width: 35px;
      }

      .declineBtn::part(label) {
        padding: 0;
        height: 35px;
        width: 35px;
      }

      .buttons-container {
        width: 100%;
        height: 150px;
        position: absolute;
        display: flex;
        margin-top: calc(100vh - 210px);
        background: url("/images/nav-fade.png");
        background-repeat: no-repeat;
        background-size: cover;
      }

      .btm-nav1 {
        width: 100%;
        position: absolute;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
      }

      .acceptBtn {
        left: 20%;
      }

      .declineBtn {
        left: calc(100% - 65px - 20%);
      }

      .btm-nav2 {
        width: 100%;
        position: absolute;
        bottom: 0;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
      }

      .btm-nav-btn2 {
        margin: auto;
        margin-bottom: 10px;
      }

      .btm-nav-btn2::part(base) {
        font-size: 1.5em;
        border: none;
        color: #d4d4d4;
      }

      .btm-nav-btn2.home-btn::part(base) {
        color: var(--brand-color);
      }

      .home-btn {
        margin-bottom: 20px;
        border-radius: 50%;
        background: rgb(65,68,72);
        background: radial-gradient(circle, rgba(65,68,72,0.1) 38%, rgba(212,212,212,0.2) 100%);
      }

      .available {
        font-weight: bold;
        color: #0ab60f;
      }

      .sports-container p {
        margin: auto;
        box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3);
        border-radius: 15px;
        padding: 0.5em
      }
      

    </style>

    <div class="user-profile calign"> 

        <div class="buttons-container">

          <div class="btm-nav1">
            <sl-button class="acceptBtn" size="large" type="text" circle class="addFavBtn" @click=${this.addFavHandler.bind(this)}>
                <img src="/images/tick.svg" alt="tick" width="35" height="35">
            </sl-button>
            <sl-button class="declineBtn" size="large" type="text" circle class="addFavBtn" @click=${this.declineUser.bind(this)}>
                <img src="/images/cross.svg" alt="tick" width="35" height="35">
            </sl-button>
          </div>

          <div class="btm-nav2">
            <sl-button class="btm-nav-btn2" @click=${()=> gotoRoute('/profile')} type="text" circle size="large"><sl-icon name="person-fill"></sl-icon></sl-button>
            <sl-button class="btm-nav-btn2 home-btn" @click=${()=> gotoRoute('/')} type="text" circle size="large"><sl-icon name="house-fill"></sl-icon></sl-button>
            <sl-button class="btm-nav-btn2" @click=${()=> gotoRoute('/messages')} type="text" circle size="large"><sl-icon name="chat-dots-fill"></sl-icon></sl-button>
          </div>
      </div>

        <sl-avatar class="profile-av-home" shape="rounded" style="--size: 270px; margin-bottom: 1em; box-shadow: 0px 10px 10px 0px #00000040;" image="${App.apiBase}/images/${this.avatar}"></sl-avatar>

        <div class="invis-div"></div>

        <div class="user-info">
          <h2>${this.firstName}</h2>
          <div class="user-location" style="display: flex; flex-wrap: wrap;">
            <img style="height: 15px; width: 15px;" src="../../images/location.svg" alt="">
            <p style="font-weight: 200; padding: 0; margin: 0 0 0 5px;"> 0 kilometers away </p>
          </div>

          <h4> Sports </h4>
          <div class="sports-container">
            <p class="tennis">${this.sports.includes('tennis') ? 'Tennis' : html`<style> .tennis{display: none}</style>` }</p>
            <p class="boxing">${this.sports.includes('boxing') ? 'Boxing' : html`<style> .boxing{display: none}</style>` }</p>
            <p class="basketball">${this.sports.includes('basketball') ? 'Basketball' : html`<style> .basketball{display: none}</style>` }</p>
            <p class="tableTennis">${this.sports.includes('tableTennis') ? 'Table Tennis' : html`<style> .tableTennis{display: none}</style>` }</p>
            <p class="martialArts">${this.sports.includes('martialArts') ? 'Martial Arts' : html`<style> .martialArts{display: none}</style>` }</p>
            <p class="chess">${this.sports.includes('chess') ? 'Chess' : html`<style> .chess{display: none}</style>`}</p>
          </div>

          <div class="profile-divider"></div>
            <p class="profile-bio">${this.bio}</p>
          <div class="profile-divider"></div>

          <h4> Available </h4>
          <div class="profile-availability">
            <div class="wk-day monday"> ${this.availableDays.includes('monday') ? html`<style> .wk-day.monday p{color: #00f50c}</style>` : null } <p>Mon</p></div>
            <div class="wk-day tuesday"> ${this.availableDays.includes('tuesday') ? html`<style> .wk-day.tuesday p{color: #00f50c}</style>` : null } <p>Tue</p></div>
            <div class="wk-day wednesday"> ${this.availableDays.includes('wednesday') ? html`<style> .wk-day.wednesday p{color: #00f50c}</style>` : null } <p>Wed</p></div>
            <div class="wk-day thursday"> ${this.availableDays.includes('thursday') ? html`<style> .wk-day.thursday p{color: #00f50c}</style>` : null } <p>Thu</p></div>
            <div class="wk-day friday"> ${this.availableDays.includes('friday') ? html`<style> .wk-day.friday p{color: #00f50c}</style>` : null } <p>Fri</p></div>
            <div class="wk-day saturday"> ${this.availableDays.includes('saturday') ? html`<style> .wk-day.saturday p{color: #00f50c}</style>` : null } <p>Sat</p></div>
            <div class="wk-day sunday"> ${this.availableDays.includes('sunday') ? html`<style> .wk-day.sunday p{color: #00f50c}</style>` : null } <p>Sun</p></div>
          </div>

        </div>
      </div> 
    </div>
    
  `}
  
})
