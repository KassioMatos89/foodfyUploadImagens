const db = require('../../config/db')

module.exports = {

    find(id) {        
        return db.query (`SELECT * FROM RECIPES WHERE ID = $1`, [id])
    },
    create(data) {
        const query = `
            INSERT INTO RECIPES (
                title,
                chef_id,
                ingredients,
                preparation,
                information
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING id
        `

        const values = [
            data.recipe_title,
            data.chef_id,
            data.ingredient,
            data.preparation,
            data.info
        ]

        return db.query(query, values)
    },
    update(data) {
        const query = `
            UPDATE recipes SET
                chef_id = $1,
                title = $2,
                ingredients = $3,
                preparation = $4,
                information = $5
            WHERE id = $6
        `

        const values = [
            data.chef_id,
            data.recipe_title,
            data.ingredient,
            data.preparation,
            data.info,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query (`DELETE FROM recipes WHERE id = $1`, [id])
    }
}