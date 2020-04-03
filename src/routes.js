const express = require('express')
const routes = express.Router()

const RecipeController = require('../src/app/controllers/RecipeController')

routes.get("/", function(req, res){
    return res.render('admin/layout')
})

routes.get("/recipes/create", RecipeController.create)

module.exports = routes