const { date } = require('../../lib/utils')
const Chef = require('../models/Chef')

module.exports = {
    show ( req, res ) {
        Chef.all(function(chefs){
            return res.render("chefs", { chefs })
        })
    },
    showAdmin ( req, res ) {
        Chef.all(function(chefs){
            return res.render("admin/chefs", { chefs })
        })
    },
    showChefDetail ( req, res ) {
        return res.render("admin/chefdetail")
    },
    create ( req, res ) {
        return res.render('admin/createchefs')
    },
    post ( req, res ) {
        const keys = Object.keys(req.body)

        for ( key of keys ) {
            if ( req.body[key] == "")
                return res.send('Please, fill all fields')
        }

        Chef.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    }
}