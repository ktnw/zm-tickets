'use strict'

const Model = use('Model')

class Ticket extends Model {

	category() {
	    return this.belongsTo('App/Model/Category')
	}

}

module.exports = Ticket
