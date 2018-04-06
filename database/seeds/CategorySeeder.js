'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

class CategorySeeder {
  async run () {
    await Database.table('categories').insert([
        {
            name: 'Vozovky',
            created_at: '2017-03-07 00:00:00',
            updated_at: '2017-03-07 00:00:00'
        },
        {
            name: 'Mestsky mobiliar',
            created_at: '2017-03-07 00:00:00',
            updated_at: '2017-03-07 00:00:00'
        }
	])
  }
}

module.exports = CategorySeeder
