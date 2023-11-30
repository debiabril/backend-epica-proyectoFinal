import User from "../models/User.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createAccessToken } from "../middleware/jwt.validator.js";


const controller = {

    register: async (req, res) => {
        const { username, email, password, avatarUrl } = req.body

        try {
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new User({
                username,
                email,
                password: passwordHash,
                avatarUrl
            })
            const userSaved = await newUser.save()

            const token = await createAccessToken({ id: userSaved._id })
            res.cookie("token", token)
            return res.json({
                message: "Usuario registrado con éxito",
                id: userSaved.id,
                username: userSaved.username,
                email: userSaved.email,
                avatarUrl: userSaved.avatarUrl
            })

        } catch (error) {
            return res.status(500).json({
                message: "Error al registrar al Usuario ",
                error
            })
        }

    },
    login: async (req, res) => {
        const { email, password } = req.body;
        console.log(email, password)
        try {
            const userFound = await User.findOne({ email });
            if (!userFound)
                return res.status(400).json({ message: "Usuario no encontrado" });

            const match = await bcrypt.compare(password, userFound.password);
            if (!match)
                return res.status(400).json({ message: "Contraseña incorrecta" });

            //Debemos generar el token nuevamente

            const token = await createAccessToken({ id: userFound._id });
            res.cookie("token", token);
            return res.json({
                message: "Bienvenido!",
                username: userFound.username,
                email: userFound.email,
            });
        } catch (error) {
            return res.status(500).json({ message: "Error al loguearse", error });
        }
    },
    logout: async (req, res) => {
        res.cookie("token", "", { expires: new Date(0) })
        return res.status(200).json({ message: "Vuelvas prontos!" })
    },
    profile: async (req, res) => {
        try {
            const userFound = await User.findById(req.user.id);
            if (!userFound)
                return res.status(400).json({ message: "Usuario no encontrado" });

            return res.json({
                message: "Perfil",
                userFound

            });
        } catch (error) {
            return res.status(500).json({ message: "Error en el perfil", error });
        }
    },
    updateUser: async (req, res) => {
        try {
            const updateUser = await User.findOneAndUpdate(req.params.id, req.body, { new: true })
            return res.status(200).json({
                success: true,
                message: 'User updated',
                updateUser
            })
        } catch (error) {
            returnnext(error)
        }
    }
}


export default controller

