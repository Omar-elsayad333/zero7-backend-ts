// Models
import sizeModel, { ISizeDocument } from '../models/size.models'

const findAllService = async (): Promise<ISizeDocument[]> => {
  return sizeModel.find()
}

const findByIdService = async (sizeId: string): Promise<ISizeDocument | null> => {
  return sizeModel.findById(sizeId)
}

const createSize = async (body: ISizeDocument): Promise<ISizeDocument | null> => {
  const sizeExist = await sizeModel.findOne({ name: body.name })
  if (sizeExist) throw new Error('response_messages.size_already_exist')

  return sizeModel.create(body)
}

const updateSize = async (
  sizeId: string,
  body: Partial<ISizeDocument>,
): Promise<ISizeDocument | null> => {
  const sizeExist = body.name && (await sizeModel.findOne({ name: body.name }))
  if (sizeExist) throw new Error('response_messages.size_already_exist')

  return sizeModel.findOneAndUpdate({ _id: sizeId }, body, { new: true })
}

const deleteSize = async (sizeId: string): Promise<ISizeDocument | null> => {
  return sizeModel.findByIdAndDelete(sizeId)
}

export default {
  findAllService,
  findByIdService,
  createSize,
  updateSize,
  deleteSize,
}
