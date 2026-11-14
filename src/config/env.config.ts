import 'dotenv/config'

const ENV_CONFIG={
    NODE_ENV:process.env.NODE_ENV ??'development',
    PORT: process.env.PORT ?? 8080,
    DB_URI:process.env.DB_URI!!,// exclamation ko matlab db_uri ko value sure aauxa vaneko

    //*jwt
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN ?? '7d',


    //*cookie
    COOKIE_EXPIRES_IN:Number(process.env.COOKIE_EXPIRES_IN)
   
    //*nodemailer

    //*cloudinary

}

export default ENV_CONFIG;