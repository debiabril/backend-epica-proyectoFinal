import dotenv from "dotenv"

dotenv.config()

export const settingDotEnvPort = () => {
    return { port: process.env.PORT || 5000 }
}

export const settingDotEnvDB = () => {
    return {
        db: {
            //localhost: process.env.MONGO,
            host: process.env.MONGO
        }
    }
}

export const settingDotEnvSecret = () => {
    return { secret: process.env.SECRET_KEY }
}