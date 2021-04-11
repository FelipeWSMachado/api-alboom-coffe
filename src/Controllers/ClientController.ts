import { Request, Response } from "express";
import db from "../database/connection";

export default class RecipeController {
    async ShowClients(request: Request, response: Response) {
        try {
            const result = await db('clients')
            return response.send(result)
        } catch (err) {
            return response.status(400).send(err)
        }
    }
}