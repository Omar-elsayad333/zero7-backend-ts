import joi from 'joi'
import mongoose, { Document, Schema } from 'mongoose'

// Utils
import { customValidate } from '../utils/validate'

export interface IColorDocument extends Document {
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

export default mongoose.model<IColorDocument>('Color', colorSchema)

/**
 *  Validation schema
 */
const validationSchema = joi.object({
  name: joi.string().required(),
  hexColor: joi.string().required(),
})

const updateSchema = validationSchema.fork(
  ['name', 'hexColor'], // fields to include
  (schema) => schema.optional(), // mark fields as optional
)

export function validate(type: 'create' | 'update') {
  return function (color: IColorDocument) {
    if (type === 'create') return customValidate(validationSchema, color)
    return customValidate(updateSchema, color)
  }
}
