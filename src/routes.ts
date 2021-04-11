import { Request, Response } from "express";
const express = require("express");

import recipe from './Controllers/RecipeController'
import clients from './Controllers/ClientController'
import auth from './auth/authController'

const Recipe = new recipe()
const Clients = new clients()
const Auth = new auth()

const routes = express.Router();
routes.use(express.json());

routes.get("/recipe", Recipe.ShowRecipes)
routes.get("/ingredients", Recipe.ShowIngredients)
routes.get("/clients", Clients.ShowClients)
routes.post("/singup", Auth.singup)
routes.post("/login", Auth.login)


export default routes;
