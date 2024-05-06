import joi from 'joi'
import mongoose, { Document, Schema } from 'mongoose'

// Utils
import { customValidate } from '@/utils/validate'

export interface ICategoryDocument extends Document {
  name: string
}

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
})

export default mongoose.model<ICategoryDocument>('Category', categorySchema)

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

export function validateSchema(type: 'create' | 'update') {
  return function (category: ICategoryDocument) {
    if (type === 'create') return customValidate(validationSchema, category)
    return customValidate(updateSchema, category)
  }
}
