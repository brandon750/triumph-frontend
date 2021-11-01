import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import 'boxicons'

class CategoriesView {
  init(){
    document.title = 'Categories'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <style>
      .page-content {
        background-color: #33383D;
        overflow-x: hidden;
      }

        .search-bar {
          display: flex;
          flex-wrap: wrap;
          width: 90%;
          background-color: #515360;
          border-radius: 30px;
          text-align: left;
          margin: auto;
          height: 40px;
          box-shadow: 1px 2px 5px 0px #FFFFFF3B inset;
          box-shadow: 0px 5px 20px 0px #00000040;
        }

        .search-cont {
          margin: auto 0.5em auto 0.5em;
          font-size: 0.9em;
        }

        .category-option {
          display: flex;
          flex-wrap: wrap;
          width: 100vw;
          height: 60px;
          background: #9D9D9D4D;
          border-radius: 20px 0px 0px 20px;
          margin-bottom: 9px;
          margin-top: 12px;
        }

        .category-option:hover {
          background: #757575;
          transition: 0.3s;
        }

        .category-option p {
          font-size: 1.1em;
        }

        .category-icon {
          margin: auto 0.5em auto 0.5em;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          box-shadow: -1px -1px 20px 0px #FFFFFF40 inset;
          display: flex;
        }

        .category-icon img {
          width: 30px;
          margin: auto;
        }

        .xtra {
          opacity: 0.3;
        }

      </style>
      <va-app-header class="cat-header" title="Categories" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <div class="search-bar">
          <box-icon class="search-cont" color="white" name='search-alt-2'></box-icon>
          <p class="search-cont">Search Category</p>
        </div> 
        <a href="/tennis">
          <div class="category-option">
            <div class="category-icon">
              <img src="/../images/tennis.png">
            </div>
            <p>Tennis</p>
          </div>
        </a>

        <a href="/boxing">
          <div class="category-option">
            <div class="category-icon">
              <img src="/../images/boxing.png">
            </div>
            <p>Boxing</p>
          </div>
        </a>

        <a href="/basketball">
          <div class="category-option">
            <div class="category-icon">
              <img src="/../images/basketball.png">
            </div>
            <p>Basketball</p>
          </div>
        </a>

        <a href="/tableTennis">
          <div class="category-option">
            <div class="category-icon">
              <img src="/../images/table-tennis.png">
            </div>
            <p>Table Tennis</p>
          </div>
        </a>

        <a href="/martialArts">
          <div class="category-option">
            <div class="category-icon">            
              <img src="/../images/martial-arts.png"></div>
            <p>Martial Arts</p>
          </div>
        </a>

        <a href="/chess">
          <div class="category-option">
            <div class="category-icon">
              <img src="/../images/chess.png">
            </div>
            <p>Chess</p>
          </div>
        </a>

        <p class="xtra">More to come!</p>
        
      </div>     
    `
    render(template, App.rootEl)
  }
}


export default new CategoriesView()