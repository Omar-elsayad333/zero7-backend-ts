import { object, string } from 'joi'
import mongoose, { Document, Schema } from 'mongoose'

// Utils
import { customValidate } from '@/utils/validate'

interface IColor extends Document {
  name: string
  hexColor: string
}

const colorSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  hexColor: {
    type: String,
    unique: true,
    required: true,
  },
})

export default mongoose.model<IColor>('Color', colorSchema)

/**
 *  Validation schema
 */
const validationSchema = object({
  name: string().required(),
})

const updateSchema = validationSchema.fork(
  ['name', 'hexColor'], // fields to include
  (schema) => schema.optional(), // mark fields as optional
)

export function validateSchema(type: 'create' | 'update') {
  return function (color: IColor) {
    if (type === 'create') return customValidate(validationSchema, color)
    return customValidate(updateSchema, color)
  }
}
