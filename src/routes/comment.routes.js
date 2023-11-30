import { Router } from "express";
import controller from "../controllers/comment.controller.js";
import { handleErrorValidations, validateCreateComment } from "../middleware/validateAuth.js";


const router = Router()

const { getAllComments, getCommentById, createComment, updateCommnent, deleteComment } = controller


router.get("/all", getAllComments)
router.get("/:id", getCommentById)
router.post("/", validateCreateComment, handleErrorValidations, createComment)
router.put("/:id", updateCommnent)
router.delete("/:id", deleteComment)

export default router