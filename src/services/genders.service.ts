// Models
import genderModel, { IGenderDocument } from '@/models/gender.models'

const findAllService = async (): Promise<IGenderDocument[]> => {
  return genderModel.find()
}

const findByIdService = async (genderId: string): Promise<IGenderDocument | null> => {
  return genderModel.findById(genderId)
}

const createGender = async (body: IGenderDocument): Promise<IGenderDocument | null> => {
  const genderExist = await genderModel.findOne({ name: body.name })
  if (genderExist) throw new Error('response_messages.gender_already_exist')

  return genderModel.create(body)
}

const updateGender = async (
  genderId: string,
  body: Partial<IGenderDocument>,
): Promise<IGenderDocument | null> => {
  const genderExist = body.name && (await genderModel.findOne({ name: body.name }))
  if (genderExist) throw new Error('response_messages.gender_already_exist')

  return genderModel.findOneAndUpdate({ _id: genderId }, body, { new: true })
}

const deleteGender = async (genderId: string): Promise<IGenderDocument | null> => {
  return genderModel.findByIdAndDelete(genderId)
}

export default {
  findAllService,
  findByIdService,
  createGender,
  updateGender,
  deleteGender,
}
