import { Request, Response } from "express";
import db from '../database/connection'
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const authConfig = require("./auth");
const ticketCode = require('ticket-code')
const codeLength = 5
const checksumSeed = 5
const checksumIdx = 3

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 7200,
    });
}


export default class authProcess {
    async singup(request: Request, response: Response) {
        try {
            const userBody = request.body;
            console.log(userBody)
            const checkUser = await db('clients').where({ email: userBody.email })
            if (checkUser === []) {
                console.log(await db('clients').where({ email: userBody.email }))
                return response.status(400).send({ User: "User alredy exists" });
            }
            const hash = await bcryptjs.hash(userBody.password, 10);
            userBody.password = hash
            console.log(userBody.password)
            var code = ticketCode.generate(checksumSeed, codeLength, checksumIdx)
            const user = await db('clients').insert({
                name: userBody.name,
                email: userBody.email,
                password: userBody.password,
                coupon_code: code
            })
            response.status(200).json({ user });
        } catch (err) {
            response.status(400).send(err);
        }
    }

    async login(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            console.log(email)
            const user = await db('clients').where({ email: email })
            if (!user)
                return response.status(400).send({ erro: "Usuario não encontrado" });
            if (!(await bcryptjs.compare(password, user[0].password)))
                return response.status(400).send({ erro: "Senha invalida" });
            response.send({ user, token: generateToken({ id: user[0].id }) });
        } catch (err) {
            console.log(err)
            response.json({
                erro: "Não foi possivel logar",
            });
        }
    }
}