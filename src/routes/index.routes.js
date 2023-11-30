import { Router } from 'express'
import authRouter from './auth.routes.js'
import postRouter from './post.routes.js'
import commentsRouter from './comment.routes.js'


const router = Router()

router.use("/auth", authRouter)

router.use("/post", postRouter)

router.use("/comment", commentsRouter)


export default router 