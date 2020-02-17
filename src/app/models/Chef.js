const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {
        db.query(`
            SELECT chefs.*,
            (SELECT count (*) FROM receipts WHERE receipts.chef_id = chefs.id) AS total_recipes
            FROM chefs
            LEFT JOIN receipts ON (chefs.id = receipts.chef_id)
            GROUP BY chefs.id
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
        const query = `
        SELECT chefs.*, 
            (SELECT count (*) FROM receipts WHERE receipts.chef_id = chefs.id) AS total_recipes, 
            receipts.id AS recipe_id, receipts.title AS recipe_title, receipts.image AS recipe_image
        FROM chefs
        LEFT JOIN receipts ON (chefs.id = receipts.chef_id)
        WHERE chefs.id = $1
        `

        db.query(query, [id], function ( err, results ) {
            if ( err ) throw `Database Error! ${ err }`
            callback(results.rows[0], results.rows)
        })
    },
    update(data, callback) {

        const query = `
            UPDATE chefs SET
                name = ($1),
                avatar_url = ($2)
            WHERE id = ($3)
            `

        const values = [
            data.chef_name,
            data.chef_avatar_url,
            data.id
        ]
        
        db.query(query, values, function ( err, results ) {
            if ( err ) throw `Database Error! ${ err }`

            callback()
        })

    },
    delete (id, callback) {
        const query = `
            DELETE FROM chefs WHERE id = $1
        `

        db.query(query, [id], function( err, results ) {
            if ( err ) throw `Database Error! ${ err }`
            
            callback()
        })
    }
}