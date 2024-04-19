import mongoose from 'mongoose'

export interface TestDocument extends Document {
  name: string
  age: number
}

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
})

export default mongoose.model<TestDocument>('Test', testSchema)
