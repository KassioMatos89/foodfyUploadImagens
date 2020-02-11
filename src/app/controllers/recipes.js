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
        Recipe.all(function(recipes){
            return res.render ("recipes", { recipes })
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
        return res.render("admin/create")
    },
    // SHOW - Show the recipes details in show page
    show ( req, res ) {
        const { id } = req.params

        const foundRecipe = data.recipes.find(function(recipe){
            return id == recipe.id
        })

            if(!foundRecipe) return res.send('Recipe not found')
            
            return res.render ("admin/show", { recipes: foundRecipe })
    },
    // POST - Used to create a new recipe
    post ( req, res ) {
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] === "") return res.send ("Please, fill all fields")
        }

        Recipe.create (req.body, function(recipe){
            
            return res.redirect("admin/recipes")
        })


    },
    //EDIT - Used to edit a recipe
    edit ( req, res ) {
        const { id } = req.params

        const foundRecipe = data.recipes.find(function(recipe){
            return id == recipe.id
        })
    
        if(!foundRecipe) return res.send('Recipe not found')
    
        const recipes = {
            id: Number(id),
            ...foundRecipe
        }
        return res.render("admin/edit", { recipes })
    },
    //PUT - Used to update a recipe
    put ( req, res ) {
        const { id, recipe_image, recipe_ingredient, recipe_preparation, recipe_information } = req.body
    
        const foundRecipe = data.recipes.find(function(recipe){
            return id == recipe.id
        })
    
        if (!foundRecipe) return res.send ("Recipe not found!")
    
        const recipe = {
            ...foundRecipe,
            ...req.body,
            image: recipe_image,
            ingredients: recipe_ingredient, 
            preparation: recipe_preparation,
            information: recipe_information
        }
    
        data.recipes[id - 1] = recipe
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("write error")
            return res.redirect(`/admin/recipes/${id}`)
        })
    },
    //DELETE - Used to delete a recipe
    delete ( req, res ) {
        const { id } = req.body

        const filteredRecipes = data.recipes.filter(function(recipe){
            return recipe.id != id
        })
    
        data.recipes = filteredRecipes
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("Write file error")
    
            return res.redirect("recipes")
        })
    }
}