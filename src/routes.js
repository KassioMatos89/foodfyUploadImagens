const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')

const ChefController = require('./app/controllers/ChefController')
const RecipeController = require('./app/controllers/RecipeController')

routes.get("/", function(req, res){
    return res.render('admin/layout')
})

// CHEF ROUTES
routes.get("/chefs/create", ChefController.create)
routes.get("/chefs/:id/edit", ChefController.edit)
routes.post("/chefs", multer.array('profile_photo', 1), ChefController.post)
routes.put("/chefs", multer.array('profile_photo', 1), ChefController.put)
routes.delete("/chefs", ChefController.delete)

//RECIPE ROUTES
routes.get("/recipes/create", RecipeController.create)
routes.get("/recipes/:id", RecipeController.show)
routes.get("/recipes/:id/edit", RecipeController.edit)
routes.post("/recipes", multer.array('photos_recipes', 5), RecipeController.post)
routes.put("/recipes", multer.array('photos_recipes', 5), RecipeController.put)
routes.delete("/recipes", RecipeController.delete)

module.exports = routes