import 'reflect-metadata'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { ExtendedRequest } from 'common/utils/next-connect'

import { serializeCollection } from 'common/utils'
import roleRepository from 'repositories/roleRepository'
export const getRoles = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const roles = await roleRepository.findAll()
  const [rolesIds, rolesById] = serializeCollection({ entity: roles })

  successResponse(res, {
    rolesIds,
    rolesById,
  })
}
