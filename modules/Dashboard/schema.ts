import { UpsertUser } from 'common/types/user'
import Joi from 'joi'
const schema = Joi.object<UpsertUser>({
  id: Joi.string().optional(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  role: Joi.number().required(),
  password: Joi.alternatives().conditional(`id`, {
    is: Joi.exist(),
    then: Joi.string().optional(),
    otherwise: Joi.string().required(),
  }),
})

export default schema
