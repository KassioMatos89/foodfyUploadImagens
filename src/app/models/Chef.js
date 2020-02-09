const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
            SELECT *
            FROM chefs
            ORDER BY name ASC`, function ( err, results ){
                if ( err ) throw `Database Error! ${err}`
                callback(results.rows)
            })
    }
}