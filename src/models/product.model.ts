import joi from 'joi'
import mongoose, { Document, Schema } from 'mongoose'

// Utils
import { customValidate } from '../utils/validate'

interface IImage {
  url: string
  name: 'main' | 'sub'
}

interface ISize {
  sizeId: string
  quantity: number
}

export interface IColor {
  colorId: string
  sizes: ISize[]
  images: IImage[]
}

interface IRating {
  userId: string
  value: number
  date: Date
}

export interface IProductDocument extends Document {
  name: string
  description: string
  price: number
  categoryId: string
  genderId: string
  colors: IColor[]
  ratings: IRating[]
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    genderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gender',
      required: true,
    },
    colors: [
      {
        colorId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Color',
        },
        sizes: [
          {
            sizeId: {
              ref: 'Size',
              type: mongoose.Schema.Types.ObjectId,
              required: true,
            },
            quantity: {
              type: Number,
              requierd: true,
            },
          },
        ],
        images: [
          {
            url: {
              type: String,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    ratings: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        value: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.model<IProductDocument>('Product', productSchema)

/**
 *  Validation schema
 */
const validationSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
  categoryId: joi.string().required(),
  genderId: joi.string().required(),
  colors: joi
    .array()
    .items(
      joi.object({
        colorId: joi.string().required(),
        sizes: joi
          .array()
          .items(
            joi.object({
              sizeId: joi.string().required(),
              quantity: joi.number().required(),
            }),
          )
          .required(),
        images: joi
          .array()
          .items(
            joi.object({
              url: joi.string().required(),
              name: joi.string().required(),
            }),
          )
          .required(),
      }),
    )
    .required(),
})

const updateSchema = validationSchema.fork(
  [], // fields to include (if empty it inclouds all)
  (schema) => schema.optional(), // mark fields as optional
)

export function validate(type: 'create' | 'update') {
  return function (category: IProductDocument) {
    if (type === 'create') return customValidate(validationSchema, category)
    return customValidate(updateSchema, category)
  }
}
