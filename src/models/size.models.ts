import joi from 'joi'
import mongoose, { Document, Schema } from 'mongoose'

// Utiles
import { customValidate } from '@/utils/validate'

export interface ISizeDocument extends Document {
  name: string
}

const sizeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
})

export default mongoose.model<ISizeDocument>('Size', sizeSchema)

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
  return function (size: ISizeDocument) {
    if (type === 'create') return customValidate(validationSchema, size)
    return customValidate(updateSchema, size)
  }
}
