import { Schema } from 'joi'

export const customValidate = (schema: Schema, data: any) => {
  return schema.validate(data, { abortEarly: false })
}
