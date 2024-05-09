// Models
import productModel, { IColor, IProductDocument } from '@/models/product.model'
import { setValuesInBody } from '@/utils/helpers'

// Utils
import { uploadMultipleFilesToFirebase } from '@/utils/storage'

const findAllService = async (): Promise<IProductDocument[]> => {
  return productModel.find()
}

const findByIdService = async (productId: string): Promise<IProductDocument | null> => {
  return productModel.findById(productId)
}

const createProduct = async (
  body: IProductDocument,
  files?: any,
): Promise<IProductDocument | null> => {
  const uploadedFiles = files && (await uploadMultipleFilesToFirebase(files, 'products'))

  setValuesInBody(body, files, uploadedFiles)

  const productExist = await productModel.findOne({ name: body.name })
  if (productExist) throw new Error('response_messages.product_already_exist')

  return productModel.create(body)
}

const updateProduct = async (
  productId: string,
  body: Partial<IProductDocument>,
): Promise<IProductDocument | null> => {
  const productExist = body.name && (await productModel.findOne({ name: body.name }))
  if (productExist) throw new Error('response_messages.product_already_exist')

  return productModel.findOneAndUpdate({ _id: productId }, body, { new: true })
}

const deleteProduct = async (productId: string): Promise<IProductDocument | null> => {
  return productModel.findByIdAndDelete(productId)
}

export default {
  findAllService,
  findByIdService,
  createProduct,
  updateProduct,
  deleteProduct,
}
