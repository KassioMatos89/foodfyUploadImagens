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
        Chef.find(req.params.id, function(chef, chef_recipes) {
            
            const qtd_recipes = chef.total_recipes

            if( qtd_recipes > 0 ) {
                return res.render("admin/chefdetail", { chef, chef_recipes, qtd_recipes })
            }
            return res.render("admin/chefdetail", { chef, qtd_recipes })

        })
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
    },
    edit ( req, res ) {
        Chef.find(req.params.id, function(chef){
            return res.render('admin/chefedit', { chef })
        })
    },
    put ( req, res) {
        const keys = Object.keys( req.body )
        for ( key of keys ) {
            if ( req.body[key] == "" )
                return res.send ('Please, fill all fields')
        }

        Chef.update(req.body, function(){
            return res.redirect(`chefs/${req.body.id}`)
        })
    },
    delete ( req, res ) {

        Chef.find(req.body.id, function(chef, chef_recipes){

            const qtd_recipes = chef.total_recipes

            if ( qtd_recipes > 0 ) {
                return res.send('Chefs que possuem receitas não podem ser deletados')
            } else {
                Chef.delete(req.body.id, function() {
                    return res.redirect("chefs")
                })
            }

        })
        
    }
}