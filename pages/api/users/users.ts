import 'reflect-metadata'
import { NextApiResponse } from 'next'
import { successResponse } from 'common/utils/api'
import { ExtendedRequest } from 'common/utils/next-connect'
import userRepository from 'repositories/userRepository'
import { serializeCollection } from 'common/utils'
export const getUsers = async (
  req: ExtendedRequest,
  res: NextApiResponse,
): Promise<void> => {
  const users = await userRepository.findAll({
    populate: [`role`],
  })
  const [usersIds, usersById] = serializeCollection({ entity: users })

  successResponse(res, {
    usersIds,
    usersById,
  })
}
