import CommentModel from "../models/Comment.model.js";

const controller = {

    getAllComments: async (req, res) => {
        try {
            const comments = await CommentModel.find()

            return comments.length > 0 ?
                res.status(200).json({
                    message: "Comentarios traídos correctamente",
                    comments
                })
                :
                res.status(200).json({
                    message: "No hay comentarios",
                })

        } catch (error) {
            return res.status(500).json({
                message: "Error traer los comentarios ",
                error
            })
        }

    },
    getCommentById: async (req, res) => {
        try {
            const comment = await CommentModel.findOne({ _id: req.params.id })
            return res.status(200).json({
                message: "Comentario encontrado con éxito",
                comment
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Error buscando el comentario",
                error: error.message
            })
        }
    },
    createComment: async (req, res) => {
        try {
            const newComment = await CommentModel.create(req.body)
            return res.status(200).json({
                message: "Comentario creado con éxito.",
                newComment
            })

        } catch (error) {
            return res.status(500).json({
                message: "Hubo un error creando el comentario.",
                error
            })
        }
    },
    updateCommnent: async (req, res) => {
        try {
            const updatedComment = await CommentModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            return res.status(200).json({
                message: "Comentario actualizado.",
                updatedComment
            })
        } catch (error) {
            return res.status(500).json({
                message: "Hubo un error actualizando el comentario",
                erro: error.message
            })
        }
    },
    deleteComment: async (req, res) => {
        try {
            const removedComment = await CommentModel.findOneAndDelete(req.params.id)
            return res.status(200).json({
                message: "Comentario eliminado con éxito",
                removedComment
            })
        } catch (error) {
            return res.status(500).json({
                message: "Hubo un error eliminando el comentario"
            })
        }
    }
}


export default controller
