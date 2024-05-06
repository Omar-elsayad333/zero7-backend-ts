import { object, string } from 'joi'
import mongoose, { Document, Schema } from 'mongoose'

// Utils
import { customValidate } from '@/utils/validate'

interface IGender extends Document {
  name: string
}

const genderSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
})

export default mongoose.model<IGender>('Gender', genderSchema)

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
  return function (gender: IGender) {
    if (type === 'create') return customValidate(validationSchema, gender)
    return customValidate(updateSchema, gender)
  }
}
