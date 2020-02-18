const fs = require('fs')
const Recipe = require('../models/Recipe')

module.exports = {
    
    //Home Final Users - Just Render home page
    home( req, res ) {
        const homeInf = {
            title: "As melhores receitas",
            description: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.",
            cardsTitle: "Mais acessadas"
        }

        Recipe.all(function(recipes){
            return res.render("index", { recipes, homeInf })
        })
    },
    // Page About - Just Render about page
    about ( req, res ) {
        return res.render ("about")
    },
    // Index users - Render index user page
    indexUsers ( req, res ) {

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 2

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){

                const pagination = {
                    total: Math.ceil( recipes[0].total / limit ),
                    page
                }
                return res.render ("recipes", { recipes, pagination, filter })
            }
        }

        Recipe.paginate(params)

        // Recipe.all(function(recipes){
        //     return res.render ("recipes", { recipes })
        // })
    },
    // Find recipe for users and admin page
    recipeFind ( req, res ) {
        const { filter } = req.query

        Recipe.findBy(filter, function(recipesFind){
            return res.render("recipefind", { recipes: recipesFind, filter })
        })
    },
    // Admin Index - Render Admin index page
    index ( req, res ) {
        Recipe.all(function(recipes){
            return res.render ("admin/recipes", { recipes })
        })
    },
    // Admin Create - Render Admin create recipe page
    create ( req, res ) {
        
        Recipe.chefsSelectOptions(function(options) {
            return res.render("admin/create", { chefOptions: options })
        })
    },
    // SHOW - Show the recipes details in show page
    show ( req, res ) {
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send('Recipe not found!')
            return res.render ("admin/show", { recipes: recipe })
        })

    },
    // POST - Used to create a new recipe
    post ( req, res ) {
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] === "") return res.send ("Please, fill all fields")
        }

        Recipe.create (req.body, function(recipe){
            //return res.send('Cadastro OK')
            return res.redirect("/admin/recipes")
        })


    },
    //EDIT - Used to edit a recipe
    edit ( req, res ) {

        Recipe.find(req.params.id, function(recipe) {
            if(!recipe) return res.send('Recipe not found!')

            Recipe.chefsSelectOptions(function(options){
                return res.render("admin/edit", { recipes: recipe, chefOptions: options })
            })
        })
    },
    //PUT - Used to update a recipe
    put ( req, res ) {
        
        const keys = Object.keys(req.body)

        for ( key of keys ) {
            if (req.body[key] == "")
                return res.send('Please, fill all fields')
        }
        
        Recipe.update(req.body, function() {
            return res.redirect(`recipes/${req.body.id}`)
        })
    
    },
    //DELETE - Used to delete a recipe
    delete ( req, res ) {
        
        Recipe.delete(req.body.id, function(){
            return res.redirect("recipes")
        }) 
    }        
}