const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes')

routes.get("/", recipes.home)

// USER ROUTES
/*
routes.get("/recipes", recipes.index)

// ADMIN ROUTES
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)
*/
module.exports = routes