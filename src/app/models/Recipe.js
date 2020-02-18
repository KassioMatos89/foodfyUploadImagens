const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
            SELECT receipts.*, chefs.name AS chef_name
            FROM receipts
            LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
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
                created_at,
                chef_id
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7 )
            RETURNING id
        `)

        const values = [
            data.recipe_image,
            data.recipe_title,
            data.recipe_ingredient,
            data.recipe_preparation,
            data.recipe_information,
            date(Date.now()).iso,
            data.chef
        ]

        db.query(query, values, function ( err, results ) {
            if ( err ) throw `Database Error! ${ err }`

            callback(results.rows[0])
        })
    },
    find (id, callback) {
        
        db.query(`
            SELECT receipts.*, chefs.name AS chef_name
            FROM receipts
            LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
            WHERE receipts.id = $1`, [id], function (err, results ){ 
            if ( err ) throw `Database Error! ${ err }`

            callback(results.rows[0])
        })
    },
    findBy (filter, callback) {
        db.query(`
            SELECT receipts.*, chefs.name AS chef_name
            FROM receipts
            LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
            WHERE receipts.title ILIKE '%${filter}%'
            ORDER BY receipts.title`, function ( err, results ) {
                if ( err ) throw `Database Error! ${ err }`
                
                callback(results.rows)
            })
    },
    update (data, callback) {
        const query = `
            UPDATE receipts SET
                title = ($1),
                image = ($2),
                ingredients = ($3),
                preparation = ($4),
                information = ($5),
                chef_id = ($6)
            WHERE ID = ($7)
        `
        const values = [
            data.recipe_title,
            data.recipe_image,
            data.recipe_ingredient,
            data.recipe_preparation,
            data.recipe_information,
            data.chef,
            data.id
        ]

        db.query(query, values, function( err, results ){
            if ( err ) throw `Database Error! ${ err }`

            callback()
        })
    },
    delete (id, callback) {
        db.query(`
            DELETE FROM receipts WHERE id = $1`, [id], function( err, results ) {
                if ( err ) throw `Database Error! ${ err }`
                
                callback()
        })
    },
    chefsSelectOptions (callback) {
        db.query(`
            SELECT name, id FROM chefs ORDER BY name`, function( err, results ) {
                if ( err ) throw `Database Error! ${ err }`
                
                callback(results.rows)
            })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = ""
    
        if ( filter ) {
            filterQuery = `
                WHERE receipts.title ILIKE '%${filter}%'
            `
        }

        query = `
            SELECT receipts.*, chefs.name AS chef_name
            FROM receipts
            LEFT JOIN chefs ON (receipts.chef_id = chefs.id)
            ${filterQuery}
            ORDER BY receipts.title LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function( err, results ) {
            if ( err ) throw `Database Error! ${ err }`

            callback(results.rows)
        })

    }
}