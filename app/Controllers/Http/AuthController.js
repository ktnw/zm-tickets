'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class AuthController {
	/**
	 * Show register page
	 */
	showRegisterPage({view}) {
	    return view.render('auth.register')
	}

	/**
	 * Handle user registration
	 */
	async register({request, session, response, auth}) {
	    // validate form input
	    const validation = await validate(request.all(), User.rules)

	    // show error messages upon validation fail
	    if (validation.fails()) {
	      session
	        .withErrors(validation.messages())
	        .flashAll()

	      return response.redirect('back')
	    }

	    // persist to database
	    const user = await User.create({
	        username: request.input('username'),
	        email: request.input('email'),
	        password: request.input('password')
	    })

	    // login the user
	    await auth.login(user)

	    // redirect to homepage
	    response.redirect('/')
	}

	/**
	 * Show login page
	 */
	showLoginPage({view}) {
	    return view.render('auth.login')
	}

	/**
	 * Handle user login request
	 */
	async login ({ request, auth }) {
    	const { email, password } = request.all()
    	await auth.attempt(email, password)

    	return 'Logged in successfully'
	}

	/**
	 * Logout authenticated user
	 */
	async logout({ request, response, auth }) {

	    await auth.logout()

	    // redirect to login page
	    response.redirect('/login')
	}
}

module.exports = AuthController
