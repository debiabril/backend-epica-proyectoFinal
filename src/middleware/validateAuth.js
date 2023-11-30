import { body, validationResult } from "express-validator";

//VALIDACIÓN REGISTER

export const validateRegister = [
    body("username")
    .notEmpty()
    .withMessage("Username no debe estar vacío")
    .isLength({ min: 6 })
    .withMessage("El Username debe tener al menos 6 caractéres"),

    body("email").isEmail().withMessage("Por favor ingrese un mail válido"),

    body("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("Longitud mínima del password es de 6 caractéres"),
];

//VALIDACION DEL LOGIN
export const validateLogin = [
    body("email").isEmail().withMessage("Por favor ingrese un mail válido"),

    body("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .isLength({ min: 6 })
    .withMessage("Longitud mínima del password es de 6 caractéres"),
];

//VALIDACION DEL ERROR

export const handleErrorValidations = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json([error.errors[0].msg]);
        // return res.status(400).json({ message: "Error en la validación", error });
    }
    next();
};

export const validateCreateComment = [
    body("description")
        .isLength({ min: 6 })
        .withMessage("El comentario debe tener al menos 6 caracteres"),
    body("autor")
        .isLength(24)
        .withMessage("La id del autor debe ser de 24 caracteres")
]

export const validateCreatePost = [
    body("title")
        .isLength({ min: 6 })
        .withMessage("El título debe tener al menos 6 caracteres")
    ,
    body("description")
        .isLength({ min: 25 })
        .withMessage("El contenido del post debe tener al menos 25 caracteres.")
    ,
    body("imageUrl")
        .isURL()
        .withMessage("La url de la imagen debe tener formato de URL")
    ,
    body("autor")
        //si se cambia la configuracion de los bytes del object id hay que modificar esta validación de acuerdo a ello.
        .isLength(24)
        .withMessage("La id del autor debe ser de 24 caracteres")
]