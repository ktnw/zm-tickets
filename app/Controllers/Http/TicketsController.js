'use strict'

const Category = use('App/Models/Category')
const { validateAll } = use('Validator')
const Ticket = use('App/Models/Ticket')
const RandomString = use('randomstring')
const Database = use('Database')

class TicketController {

	/**
	 * Show the list of existing tickets.
	 */
	async index ({ request, response, view }) {
		const tickets = await Database
		.select('*')
		.from('tickets')
		.innerJoin('categories', 'categories.id', 'tickets.category_id')

	    return view.render('tickets.index', { tickets: tickets })
	}

	/**
	 * Show the form for opening a new ticket.
	 */
	async new ({ request, response, view }) {
	    const categories = await Category.all()

	    return view.render('tickets.new', { categories: categories.toJSON() })
	}

	async create ({ request, response, session, auth }) {
	    const user = await auth.getUser()

	    // validate form input
	    const validator = await validateAll(request.all(), {
	        title: 'required',
	        category: 'required',
	        priority: 'required',
	        message: 'required'
	    })

	    if (validator.fails()) {
	    	session.withErrors(validator.messages()).flashAll()

	        return response.redirect('back')
    	}

	    // persist ticket to database
	    const ticket = await Ticket.create({
	        title: request.input('title'),
	        user_id: user.id,
	        ticket_id: RandomString.generate({ length: 10, capitalization: 'uppercase' }),
	        category_id: request.input('category'),
	        priority: request.input('priority'),
	        message: request.input('message'),
	        status: "Open",
	    })

	    return response.redirect('tickets')

	}

}

module.exports = TicketController
