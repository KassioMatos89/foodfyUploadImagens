const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')

routes.get("/", recipes.home)

// USER ROUTES
//RECIPES
routes.get("/about", recipes.about)
routes.get("/recipes", recipes.indexUsers)
//CHEFS
routes.get("/chefs", chefs.show)

// *********************************************** //
// ADMIN ROUTES
//RECIPES
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
//routes.delete("/admin/recipes", recipes.delete)

//CHEFS
routes.get("/admin/chefs", chefs.showAdmin)
routes.get("/admin/chefs/createchefs", chefs.create)
routes.get("/admin/chefs/:id", chefs.showChefDetail)

routes.post("/admin/chefs", chefs.post)

module.exports = routes