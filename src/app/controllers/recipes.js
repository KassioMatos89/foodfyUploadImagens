const data = require('../../../data.json')
const fs = require('fs')


//HOME
exports.home = function(req, res){
    const homeInf = {
        title: "As melhores receitas",
        description: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.",
        cardsTitle: "Mais acessadas"
    }
    return res.render("index", { recipes: data.recipes, homeInf })
}

exports.about = function (req, res) {
    return res.render ("about")
}

//INDEX
exports.index = function(req, res){
    //return res.send('Teste')
    return res.render("admin/recipes", { recipes: data.recipes })
}   

//CREATE
exports.create = function(req, res){
    return res.render("admin/create")
}

//SHOW
exports.show = function(req, res){
    
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe){
        return id == recipe.id
    })

        if(!foundRecipe) return res.send('Recipe not found')
        
        return res.render ("admin/show", { recipes: foundRecipe })

}

//POST
exports.post = function(req, res){
    const keys = Object.keys(req.body)
    
    for(key of keys){
        if(req.body[key] === "") return res.send ("Please, fill all fields")
    }

    let { recipe_image, recipe_ingredient, recipe_preparation, recipe_information } = req.body

    

    data.recipes.push({
        id: Number(data.recipes.length + 1),
        image: recipe_image,
        ingredients: recipe_ingredient, 
        preparation: recipe_preparation,
        information: recipe_information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) return res.send("Write file error")

        return res.redirect("admin/recipes")
    })
}

//EDIT
exports.edit = function(req, res){

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
}

//PUT
exports.put = function(req, res){
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

}

//DELETE
exports.delete = function(req, res){

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
