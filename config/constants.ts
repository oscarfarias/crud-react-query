import dotenv from 'dotenv'
dotenv.config()
const getIsLocal = (environtment: string): boolean => environtment === `local`
const {
  DB_NAME,
  DB_HOST,
  DB_PORT = `5432`,
  DB_USERNAME,
  DB_PASSWORD,
  NODE_ENV,
  IS_LOCAL = getIsLocal(NODE_ENV),
  IS_PROD = NODE_ENV === `production`,
  APP_API_URL,
} = process.env
export {
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  NODE_ENV,
  IS_PROD,
  IS_LOCAL,
  APP_API_URL,
}
