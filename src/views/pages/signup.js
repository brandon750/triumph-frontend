import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`      
      <div class="page-content page-centered">      
        <div class="signinup-box">
          <h1 id="signup-header"> Create Account </h1>
          <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
            <div class="input-group">
              <sl-input class="input-bar" name="firstName" type="text" placeholder="Enter First Name" required pill ></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="input-bar" name="lastName" type="text" placeholder="Enter Last Name" required pill ></sl-input>
            </div>
            <div class="input-group">
              <sl-input class="input-bar" name="email" type="email" placeholder="Enter Email" required pill ></sl-input>
            </div>
            <div class="input-group">
            <sl-input class="input-bar" name="phoneNumber" type="number" placeholder="Enter Phone Number" required pill ></sl-input>
            </div>
            <div class="input-group last">
              <sl-input class="input-bar" name="password" type="password" placeholder="Enter Password" required toggle-password pill ></sl-input>
            </div>         
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;">Create Account</sl-button>
          </sl-form>
          <p>Have an account? <a href="/signin" @click=${anchorRoute}>Sign In</a></p>
          <div class="line-divider"></div>
          <p>Or login here:
            <div class="social-buttons">
            <div class="social-btn a"></div>
            <div class="social-btn b"></div>
            <div class="social-btn c"></div>
          </div>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()