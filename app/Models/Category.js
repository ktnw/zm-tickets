'use strict'

const Model = use('Model')

class Category extends Model {

	tickets () {
	    return this.hasMany('App/Model/Ticket')
	}

}

module.exports = Category
