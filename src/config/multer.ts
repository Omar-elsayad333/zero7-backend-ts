import multer from 'multer'
import { generateFileExt, generateUniqueSuffix } from '../utils/generate'

// Storing files on disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images')
  },
  filename: function (req, file, cb) {
    const fileExt = generateFileExt(file)
    const uniqueSuffix = generateUniqueSuffix(fileExt)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})
const upload = multer({ storage: storage })

// Storing files on memory
const memoryStorage = multer.memoryStorage()
const memoryUpload = multer({ storage: memoryStorage })

export { upload, memoryUpload }
