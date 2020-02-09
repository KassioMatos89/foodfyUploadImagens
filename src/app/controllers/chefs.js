const Chef = require('../models/Chef')

module.exports = {
    show ( req, res ) {
        Chef.all(function(chefs){
            console.log(chefs)
            return res.render("admin/chefs", { chefs })
        })
    },
    create ( req, res ) {
        return res.render('admin/createchefs')
    }
}