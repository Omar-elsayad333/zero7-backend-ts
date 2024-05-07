import joi from 'joi'
import mongoose, { Document, Schema } from 'mongoose'

// Utils
import { customValidate } from '@/utils/validate'

export interface IGenderDocument extends Document {
  name: string
}

const genderSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
})

export default mongoose.model<IGenderDocument>('Gender', genderSchema)

/**
 *  Validation schema
 */
const validationSchema = joi.object({
  name: joi.string().required(),
})

const updateSchema = validationSchema.fork(
  ['name'], // fields to include
  (schema) => schema.optional(), // mark fields as optional
)

export function validate(type: 'create' | 'update') {
  return function (gender: IGenderDocument) {
    if (type === 'create') return customValidate(validationSchema, gender)
    return customValidate(updateSchema, gender)
  }
}
