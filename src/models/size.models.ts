import { object, string } from 'joi'
import mongoose, { Document, Schema } from 'mongoose'

// Utiles
import { customValidate } from '@/utils/validate'

interface ISize extends Document {
  name: string
}

const sizeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
})

export default mongoose.model<ISize>('Size', sizeSchema)

/**
 *  Validation schema
 */
const validationSchema = object({
  name: string().required(),
})

const updateSchema = validationSchema.fork(
  ['name'], // fields to include
  (schema) => schema.optional(), // mark fields as optional
)

export function validateSchema(type: 'create' | 'update') {
  return function (size: ISize) {
    if (type === 'create') return customValidate(validationSchema, size)
    return customValidate(updateSchema, size)
  }
}
