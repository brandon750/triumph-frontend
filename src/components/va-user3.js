import { LitElement, html, css } from '@polymer/lit-element'
import { directive, render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'

customElements.define('va-user3', class User extends LitElement {
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

  moreInfoHandler(){
    const userDetails = this.shadowRoot.querySelector('.user-details')
    const showMoreBtn = this.shadowRoot.querySelector('.show-more-btn')
    const showLessBtn = this.shadowRoot.querySelector('.show-less-btn')

    if(userDetails.classList.contains('hide')) {
      userDetails.classList.remove('hide')
      showMoreBtn.classList.add('hide')
      showLessBtn.classList.remove('hide')
    }
    else {
      userDetails.classList.add('hide')
      showMoreBtn.classList.remove('hide')
      showLessBtn.classList.add('hide')
    }
  }

  handleMessageClick(){
    const isTextSelected = window.getSelection().toString();
    if (!isTextSelected) {
      this.messageScreen();
    }
  }

  messageScreen(){

    const dialogEl = document.createElement('div')

    dialogEl.className = 'message-screen'

    const dialogContent = html`
      <style>
      .message-screen {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      background: var(--body-bg);
      width: 100%;
      height: 100%;
      }

      .wrap {
        height: 100%;
        width: 100%;
      }

      .back-btn {
        position: absolute;
        display: flex;
        justify-content: center;
        top: 13px;
        left: 10px;
        /* box-shadow: 0px 5px 5px 0px #00000025; */
        border-radius: 50%;
      }

      .back-btn img {
        margin: auto;
        height: 100%;
      }

      .back-btn::part(base){
        background: var(--brand-color);
        border-radius: 50%;
        bordeR: none;
        width: 35px;
        height: 35px;
      }

      .profile-av-msg {
        --size: 180px;
        padding: 0.8em;
        box-shadow: 0px 5px 5px 0px #00000030;
        border-radius: 50%;
        margin: auto;
        margin-top: 3em;
      }

      .msg-name {
        display: block;
        width: 100%;
        display: flex;
      }

      .msg-name p{
        margin: auto;
        font-size: 1.1em;
        font-weight: 400;
        margin-top: 1em;
      }

      .fake-msgs {
        width: 100%;
        bottom: 0;
        position: absolute;
        border-radius: 30px 30px 0 0;
        background: rgba(255,255,255,0.2);
        box-shadow: inset 0px 2px 0px 0px rgba(255,255,255,0.4);
        height: 62%;
        display: flex;
        flex-wrap: wrap;
      }

      .msgs-container {
        width: 100%;
        position: absolute;
        display: flex;
        flex-wrap: wrap;
      }

      .received-msg {
        /* width: 100%; */
        background: rgba(255,255,255,0.3);
        padding: 1em;
        border-radius: 10px 10px 10px 0px;
        color: var(--heading-color);
        max-width: 60%;
        font-weight: 400;
        font-size: 0.9em;
        box-shadow: 0px 5px 5px 0px #00000030;
        margin-left: 1em;
      }

      .msg {
        width: 100%;
        margin-top: 1em;
      }


      .sent-msg {
        float: right;
        background: rgb(233,164,0);
        background: linear-gradient(90deg, rgba(233,164,0,1) 0%, rgba(233,98,0,1) 100%);
        padding: 1em;
        border-radius: 10px 10px 0px 10px;
        color: #fff;
        max-width: 60%;
        font-size: 0.9em;
        font-weight: 400;
        box-shadow: 0px 5px 5px 0px #00000030;
        margin-right: 1em;
      }

      .av-wrap {
        display: flex;
        width: 100%;
      }

      .fake-input {
        width: 90%;
        position: absolute; 
        bottom: 0;
        background: rgba(72,78,88,0.8);
        margin: 1em;
        border-radius: 30px;
        padding: 1em;
        /* display: flex; */
      }

      .fake-input p {
        margin: 0;
        padding: 0;
        max-width: fit-content;
        display: inline;
      }

      .fake-input box-icon {
        float: right;
      }

      .messages-title{
        position: absolute;
        width: 100%;
        display: flex;
      }

      .messages-title p{
        margin: auto;
        margin-top: 1.29em;
        font-weight: 400;
      }
    
  </style>
  <div class="wrap">
    <div class="messages-title"><p>Messages</p></div>
    <div class="av-wrap">
      <sl-avatar class="profile-av-msg" shape="circle" image="${App.apiBase}/images/${this.avatar}"></sl-avatar>
    </div>

    <div class="msg-name">
      <p>${this.firstName}</p>
    </div>
    <div class="fake-msgs">
      <br>
      <div class="msgs-container">
        <br>
        <div class="msg"><div class="sent-msg">This is where conversations would take place</div></div>
        <div class="msg"><div class="received-msg">If I had time to figure it out</div></div>
        <div class="msg"><div class="sent-msg">And had I written it in React</div></div>
        <div class="msg"><div class="received-msg">Instead of Lit-html</div></div>
      </div>
      <div class="fake-input">
        <p>Type a message...</p>
        <box-icon type='solid' name='send' color="#fff"></box-icon>
      </div>
    </div>
      <sl-button class="back-btn" @click=${this.removeView.bind(this)}>
        <img src="/../images/back-btn.svg">
      </sl-button>
  </div>
  `
    render(dialogContent, dialogEl)

    document.body.append(dialogEl)

  }

  removeView(){
    const msgScreen = document.getElementsByClassName('message-screen')

    while(msgScreen.length > 0){
      msgScreen[0].parentNode.removeChild(msgScreen[0])
    } 
  }

  
  
  render(){    
    return html`
    <style>

      .show-more-btn {
        margin-top: 0.25em;
        /* margin-left: 1.9em; */
        z-index: 999;
        opacity: 0.4;
      }

      .show-more-btn::part(label):hover {
        color:var(--brand-color);
        transition: 0.3s;
      }

      .show-less-btn {
        margin-top: -1em;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }

      .show-less-btn::part(label):hover {
        color:var(--brand-color);
        transition: 0.3s;
      }

      .user-details {
        padding: 1em;
      }


      .user-info-small sl-button::part(base) {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        margin-top: -1em;
      }

      .user-info-small sl-button::part(label) {
        color: #fff;
        padding: 0;
        font-weight: 200;
      }

      .test {
        border: 2px solid red;
      }

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
      
      .user-info-small {

        width: 100%;
        padding-top: 0em;
        overflow: hidden;
        z-index: 11;
      }

      .user-profile-small {
        z-index: 10;
        margin: 0;
        border-radius: 30px;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
      }

      h2 {
        font-size: 1.2em;
        margin-top: 2em;
      }

      .available {
        font-weight: bold;
        color: #0ab60f;
      }

      .sports-container p {
        margin: auto;
        box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3);
        border-radius: 15px;
        padding: 0.5em;
        margin-top: 0.3em;
      }

      .profile-av-small {
        background: #575c61;
        border-radius: 50%;
        --size: 100px; 
        margin-bottom: 1em; 
        box-shadow: 0px 5px 5px 0px #00000040;
        float: left;
        margin: 0.5em 0.5em 0.5em 0em;
        padding: 0.5em;
      }

      .hide {
        display: none;
      }

      .m-top {
        margin-top: 0.2em;
      }

      .smessage::part(base) {
        width: 100%;
        height: fit-content;
        background: none;
        border: none;
      }

      .smessage {
        width: 100%;
        border: 2px solid red;
        position: absolute;
      }

      .background {
        background: rgb(255,255,255);
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 15%, rgba(255,255,255,0.12) 35%);
        position: absolute;
        width: 100%;
        height: 80px;
        margin-top: -50px;
        z-index: 1;
      }


    </style>
    
    <div class="user-profile-small calign"> 
        <div class="user-info-small">
          <sl-avatar @click=${this.messageScreen.bind(this)} class="profile-av-small" shape="circle" image="${App.apiBase}/images/${this.avatar}"></sl-avatar>
          <h2>${this.firstName}</h2>
          <div class="user-location" style="display: flex; flex-wrap: wrap;">
            <img style="height: 15px; width: 15px;" src="../../images/location.svg" alt="">
            <p style="font-weight: 200; padding: 0; margin: 0 0 0 5px;"> 0 kilometers away </p>
            <div class="background" @click=${this.messageScreen.bind(this)}></div>
        </div>

          <br>

          <div class="user-details hide">

            <h4> Sports </h4>
            <div class="sports-container">
              <p class="tennis m-top">${this.sports.includes('tennis') ? 'Tennis' : html`<style> .tennis{display: none}</style>` }</p>
              <p class="boxing m-top">${this.sports.includes('boxing') ? 'Boxing' : html`<style> .boxing{display: none}</style>` }</p>
              <p class="basketball m-top">${this.sports.includes('basketball') ? 'Basketball' : html`<style> .basketball{display: none}</style>` }</p>
              <p class="tableTennis m-top">${this.sports.includes('tableTennis') ? 'Table Tennis' : html`<style> .tableTennis{display: none}</style>` }</p>
              <p class="martialArts m-top">${this.sports.includes('martialArts') ? 'Martial Arts' : html`<style> .martialArts{display: none}</style>` }</p>
              <p class="chess m-top">${this.sports.includes('chess') ? 'Chess' : html`<style> .chess{display: none}</style>`}</p>
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

          <sl-button class="show-more-btn" @click=${this.moreInfoHandler.bind(this)}>Show Profile <sl-icon name="caret-down-fill"></sl-icon></sl-button>
          <sl-button class="show-less-btn hide" @click=${this.moreInfoHandler.bind(this)}>Hide Profile <sl-icon name="caret-up-fill"></sl-icon></sl-button>
        </div>

      </div> 
    </div>
    
  `}
  
})
