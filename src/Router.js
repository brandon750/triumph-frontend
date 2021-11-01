// import views
import homeView from './views/pages/home'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import profileView from './views/pages/profile'
import editProfileView from './views/pages/editProfile'
import guideView from './views/pages/guide'
import favouriteUsersView from './views/pages/favouriteUsers'
import messagesView from './views/pages/messages'
import categoriesView from './views/pages/categories'
import settingsView from './views/pages/settings'
import tennisView from './views/pages/tennis'
import boxingView from './views/pages/boxing'
import basketballView from './views/pages/basketball'
import tableTennisView from './views/pages/tableTennis'
import martialArtsView from './views/pages/martialArts'
import chessView from './views/pages/chess'

// define routes
const routes = {
	'/': homeView,	
	'/guide': guideView,
	'404' : fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/profile': profileView,
	'/editProfile': editProfileView,
	'/favouriteUsers': favouriteUsersView,
	'/messages': messagesView,
	'/categories': categoriesView,	
	'/settings': settingsView,
	'/tennis': tennisView,	
	'/boxing': boxingView,	
	'/basketball': basketballView,			
	'/tableTennis': tableTennisView,
	'/martialArts': martialArtsView,	
	'/chess': chessView,		
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// programmatically load any route
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}


// allows anchor <a> links to load routes
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
