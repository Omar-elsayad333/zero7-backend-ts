// Models
import colorModel, { IColorDocument } from '@/models/color.models'

const findAllService = async (): Promise<IColorDocument[]> => {
  return colorModel.find()
}

const findByIdService = async (colorId: string): Promise<IColorDocument | null> => {
  return colorModel.findById(colorId)
}

const createColor = async (body: IColorDocument): Promise<IColorDocument | null> => {
  const colorExist = await colorModel.findOne({ name: body.name })
  if (colorExist) throw new Error('response_messages.color_already_exist')

  return colorModel.create(body)
}

const updateColor = async (
  colorId: string,
  body: Partial<IColorDocument>,
): Promise<IColorDocument | null> => {
  const colorExist = body.name && (await colorModel.findOne({ name: body.name }))
  if (colorExist) throw new Error('response_messages.color_already_exist')

  return colorModel.findOneAndUpdate({ _id: colorId }, body, { new: true })
}

const deleteColor = async (colorId: string): Promise<IColorDocument | null> => {
  return colorModel.findByIdAndDelete(colorId)
}

export default {
  findAllService,
  findByIdService,
  createColor,
  updateColor,
  deleteColor,
}
