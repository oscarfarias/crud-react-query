import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import { getUsers, deleteUser, upsertUser } from './users'
import getHandler from 'common/utils/next-connect'

const handler = getHandler()
handler.get(getUsers)
handler.delete(deleteUser)
handler.post(upsertUser)
export default withORM(handler)
