import jwt from 'jsonwebtoken'
import { settingDotEnvSecret } from '../config/dotenv.js'

const { secret } = settingDotEnvSecret()

export const authRequired = (req, res, next) => {
    console.log('middleware')

    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: "Autorizacion denegada, no hay token" })

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Token inválido" })
        req.user = user

    })

    next()
}