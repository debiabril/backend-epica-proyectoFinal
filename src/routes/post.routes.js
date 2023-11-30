import { Router } from "express";
import controller from "../controllers/post.controller.js";
import { handleErrorValidations, validateCreatePost } from "../middleware/validateAuth.js";
import { authRequired } from "../middleware/validateToken.js";


const router = Router()

const { getAllPosts, getPostById, createPost, updatePost, deletePost } = controller


router.get("/all", getAllPosts)
router.get("/:id", getPostById)
router.post("/", validateCreatePost , handleErrorValidations, authRequired , createPost)
router.put("/:id", authRequired, updatePost)
router.delete("/:id", authRequired, deletePost)

export default router