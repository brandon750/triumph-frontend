import { LitElement, html, css } from '@polymer/lit-element'
import { directive, render } from 'lit-html'
import {anchorRoute, gotoRoute} from '../Router'
import Auth from '../Auth'
import App from '../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'

customElements.define('va-user-av', class User extends LitElement {
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
      .user-avatar {
        margin: 0.2em;
        display: inline-block;
        max-width: 130px;
      }

      .user-avatar p{
        color: #fff;
        font-weight: 400;
        font-size: 1em;
      }

      .profile-av {
        --size: 120px;
        border-radius: 50%;
        padding: 0.5em;
        box-shadow: 0px 5px 5px 0px #00000025;
      }

      .av-button::part(base) {
        background: none;
        border: none;
      }

      .av-button {
        height: 190px;
      }

      .av-button p{
        margin: 0;
        font-weight: 600;
        font-size: 1.1em;
      }

    </style>

    <div class="user-avatar">
      <sl-button class="av-button" @click=${this.messageScreen.bind(this)}>
        <sl-avatar class="profile-av" shape="circle" image="${App.apiBase}/images/${this.avatar}"></sl-avatar>
        <p>${this.firstName}</p>
      </sl-button>
    </div>

    
  `}
  
})
