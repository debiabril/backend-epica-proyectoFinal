import PostModel from '../models/Post.model.js'

const controller = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await PostModel.find()

            return posts.length > 0 ?
                res.status(200).json({
                    message: "Posts traídos correctamente",
                    posts
                })
                :
                res.status(200).json({
                    message: "No hay posts",
                })

        } catch (error) {
            return res.status(500).json({
                message: "Error traer los posts ",
                error
            })
        }
    },
    getPostById: async (req, res) => {
        try {
            const post = await PostModel.findOne({ _id: req.params.id })
            return res.status(200).json({
                message: "Post encontrado con éxito",
                post
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Error buscando el post",
                error: error.message
            })
        }
    },
    createPost: async (req, res) => {
        try {
            const newPost = await PostModel.create(req.body)
            return res.status(200).json({
                message: "Post creado con éxito.",
                newPost
            })

        } catch (error) {
            return res.status(500).json({
                message: "Hubo un error creando el post.",
                error
            })
        }
    },
    updatePost: async (req, res) => {
        try {
            const updatedPost = await PostModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            return res.status(200).json({
                message: "Post actualizado.",
                updatedPost
            })
        } catch (error) {
            return res.status(500).json({
                message: "Hubo un error actualizando el post",
                erro: error.message
            })
        }
    },
    deletePost: async (req, res) => {
        try {
            const removedPost = await PostModel.findOneAndDelete(req.params.id)
            return res.status(200).json({
                message: "Post eliminado con éxito",
                removedPost
            })
        } catch (error) {
            return res.status(500).json({
                message: "Hubo un error eliminando el post"
            })
        }
    },
}

export default controller