import App from './../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`      
      <div class="page-content page-centered">
        <div class="signinup-box">
          <img width="50%" src="/../images/logo.svg">
          <p>Welcome back</p>
          <sl-form class="form-signup dark-theme" @sl-submit=${this.signInSubmitHandler}>          
            <div class="input-group">
              <sl-input class="input-bar" name="email" type="email" placeholder="Email" required pill ></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="input-bar" name="password" type="password" placeholder="Password" required toggle-password pill ></sl-input>
            </div>
            <sl-button class="submit-btn" type="primary" submit style="width: 60%;">Log In</sl-button>
          </sl-form>
          <p>No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
          <div class="line-divider"></div>
          <div class="social-buttons">
            <div class="social-btn a"></div>
            <div class="social-btn b"></div>
            <div class="social-btn c"></div>
          </div>
          <div class="line-divider"></div>
          <p> Forgot your password? </p> <p id="TOO-BAD" >Too bad.</p>
        </div>
      </div>
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()