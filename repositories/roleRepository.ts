import { FilterQuery, FindOptions, RequiredEntityData } from '@mikro-orm/core'
import { getEntityManager } from '../common/utils/orm'
import { Role } from '../entities'

import Boom from '@hapi/boom'
const roleRepository = {
  bulkCreate: async (roles: RequiredEntityData<Role>[]) => {
    const em = await getEntityManager()
    return await em.nativeInsert(`Role`, roles)
  },
  create: async (role: RequiredEntityData<Role>) => {
    try {
      const em = await getEntityManager()
      const newRole = await em.create(Role, role)
      await em.persistAndFlush(newRole)
      return newRole
    } catch (error: any) {
      throw Boom.badRequest(`Error creating role: ${error.message}`)
    }
  },
  findAll: async <Hint extends string = never>(
    options?: FindOptions<Role, Hint>,
  ) => {
    const em = await getEntityManager()
    const roles = await em.find(Role, {}, options)
    return roles
  },
  find: async (query: FilterQuery<Role>, options = {}) => {
    const em = await getEntityManager()
    const roles = await em.find(Role, query, options)
    return roles
  },
  findOne: async (query: FilterQuery<Role>) => {
    const em = await getEntityManager()
    const role = await em.findOne(Role, query)
    return role
  },
  findById: async (id: number) => {
    const em = await getEntityManager()
    const role = await em.findOne(Role, id)
    return role
  },
  deleteById: async (id: number) => {
    const em = await getEntityManager()
    const role = await em.findOne(Role, id)
    if (role) {
      await em.nativeUpdate(Role, role, { deletedAt: new Date() })
      await em.flush()
    }
  },
}

export default roleRepository
