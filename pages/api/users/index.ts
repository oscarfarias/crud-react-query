import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import { getUsers } from './users'
import getHandler from 'common/utils/next-connect'

const handler = getHandler()
handler.get(getUsers)
export default withORM(handler)
