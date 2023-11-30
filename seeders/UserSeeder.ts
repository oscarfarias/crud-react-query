import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { Faker, Factory } from '@mikro-orm/seeder'
import { User, Role } from '../entities'
import bcrypt from 'bcrypt'
export class UserFactory extends Factory<User> {
  model = User
  definition(faker: Faker): Partial<User> {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync(`123456`, 10),
    }
  }
}

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const roles = await em.find<Role>(`Role`, {})

    const getRandomRole = (): Role => {
      const randomIndex = Math.floor(Math.random() * roles.length)
      return roles[randomIndex]
    }

    await new UserFactory(em)
      .each((user) => {
        user.firstName = `Admin`
        user.lastName = `Admin`
        user.email = `admin@example.com`
        user.role = em.getReference(`Role`, 1)
      })
      .makeOne()

    await new UserFactory(em)
      .each((user) => {
        user.role = getRandomRole()
      })
      .create(49)
  }
}
