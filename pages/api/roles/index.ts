import 'reflect-metadata'
import { withORM } from 'common/utils/orm'
import { getRoles } from './roles'
import getHandler from 'common/utils/next-connect'

const handler = getHandler()
handler.get(getRoles)
export default withORM(handler)
