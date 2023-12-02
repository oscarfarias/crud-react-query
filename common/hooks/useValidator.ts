import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { FieldValues, useForm } from 'react-hook-form'

const useValidator = <T extends FieldValues>(schema: Joi.ObjectSchema<T>) => {
  return useForm<T>({
    resolver: joiResolver(schema),
  })
}
export default useValidator
