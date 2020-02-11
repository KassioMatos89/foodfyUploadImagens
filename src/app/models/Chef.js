const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
            SELECT *
            FROM chefs
            ORDER BY name ASC`, function ( err, results ){
                if ( err ) throw `Database Error! ${err}`
                callback(results.rows)
            })
    },
    create(data, callback) {
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES (
                $1,
                $2,
                $3
            ) RETURNING id
        `

        const values = [
            data.chef_name,
            data.chef_avatar_url,
            date(Date.now()).iso
        ]

        db.query(query, values, function( err, results ) {
            if ( err ) throw `Database Error! ${ err }`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        
    }
}