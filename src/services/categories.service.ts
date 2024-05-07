// Models
import categoryModel, { ICategoryDocument } from '@/models/category.model'

const findAllService = async (): Promise<ICategoryDocument[]> => {
  return categoryModel.find()
}

const findByIdService = async (categoryId: string): Promise<ICategoryDocument | null> => {
  return categoryModel.findById(categoryId)
}

const createCategory = async (body: ICategoryDocument): Promise<ICategoryDocument | null> => {
  const CategoryExist = await categoryModel.findOne({ name: body.name })
  if (CategoryExist) throw new Error('response_messages.category_already_exist')

  return categoryModel.create(body)
}

const updateCategory = async (
  categoryId: string,
  body: Partial<ICategoryDocument>,
): Promise<ICategoryDocument | null> => {
  const CategoryExist = body.name && (await categoryModel.findOne({ name: body.name }))
  if (CategoryExist) throw new Error('response_messages.category_already_exist')

  return categoryModel.findOneAndUpdate({ _id: categoryId }, body, { new: true })
}

const deleteCategory = async (categoryId: string): Promise<ICategoryDocument | null> => {
  return categoryModel.findByIdAndDelete(categoryId)
}

export default {
  findAllService,
  findByIdService,
  createCategory,
  updateCategory,
  deleteCategory,
}
