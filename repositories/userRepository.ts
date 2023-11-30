import { FilterQuery, FindOptions, RequiredEntityData } from '@mikro-orm/core'
import { getEntityManager } from '../common/utils/orm'
import { User } from '../entities'

import Boom from '@hapi/boom'
const userRepository = {
  bulkCreate: async (users: RequiredEntityData<User>[]) => {
    const em = await getEntityManager()
    return await em.nativeInsert(`User`, users)
  },
  create: async (user: RequiredEntityData<User>) => {
    try {
      const em = await getEntityManager()
      const newUser = await em.create(User, user)
      await em.persistAndFlush(newUser)
      return newUser
    } catch (error: any) {
      throw Boom.badRequest(`Error creating user: ${error.message}`)
    }
  },
  findAll: async <Hint extends string = never>(
    options?: FindOptions<User, Hint>,
  ) => {
    const em = await getEntityManager()
    const users = await em.find(User, {}, options)
    return users
  },
  find: async (query: FilterQuery<User>, options = {}) => {
    const em = await getEntityManager()
    const users = await em.find(User, query, options)
    return users
  },
  findOne: async (query: FilterQuery<User>) => {
    const em = await getEntityManager()
    const user = await em.findOne(User, query)
    return user
  },
  findById: async (id: string) => {
    const em = await getEntityManager()
    const user = await em.findOne(User, id)
    return user
  },
  deleteById: async (id: string) => {
    const em = await getEntityManager()
    const user = await em.findOne(User, id)
    if (user) {
      await em.nativeUpdate(User, user, { deletedAt: new Date() })
      await em.flush()
    }
  },
  bulkDelete: async (ids: string[]) => {
    const em = await getEntityManager()
    await em.nativeUpdate(User, { id: { $in: ids } }, { deletedAt: new Date() })
    await em.flush()
  },
  upsert: async (user: RequiredEntityData<User>) => {
    const em = await getEntityManager()
    if (user.id) {
      const updatedUser = await em.findOne(User, user.id, {
        populate: [`password`],
      })
      if (updatedUser) {
        const upsertedUser = await em.assign(updatedUser, user)
        await em.persistAndFlush(upsertedUser)
        await em.populate(upsertedUser, [`role`])
        return upsertedUser
      }
    }
    const upsertedUser = await em.create(User, user)
    await em.persistAndFlush(upsertedUser)
    return upsertedUser
  },
}

export default userRepository
