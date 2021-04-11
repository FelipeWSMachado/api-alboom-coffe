import { Request, Response } from "express";
import db from "../database/connection";

export default class RecipeController {
    async ShowRecipes(request: Request, response: Response) {
        try {
            const result = await db('recipes')
            return response.send(result)
        } catch (err) {
            return response.status(400).send(err)
        }
    }
    async ShowIngredients(request: Request, response: Response) {
        try {
            const result = await db('ingredients')
            return response.send(result)
        } catch (err) {
            return response.status(400).send(err)
        }
    }
}