const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
            SELECT * 
            FROM receipts
            ORDER BY title ASC`, function ( err, results ){
                if ( err ) throw `Database Error! ${err}`

                callback(results.rows)
            })
    },
    create(data, callback) {
        const query = (`
            INSERT INTO receipts (
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ( $1, $2, $3, $4, $5, $6 )
            RETURNING id
        `)

        const values = [
            data.recipe_image,
            data.recipe_title,
            data.recipe_ingredient,
            data.recipe_preparation,
            data.recipe_information,
            date(Date.now()).iso
        ]

        db.query(query, values, function ( err, results ) {
            if ( err ) throw `Database Error! ${ err }`

            callback(results.rows[0])
        })
    }
}