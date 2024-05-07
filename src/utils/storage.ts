import { bucket } from '@/config/firebase'
import { getDownloadURL } from 'firebase-admin/storage'
import { generateFileExt, generateUniqueSuffix } from '@/utils/generate'

const uploadeFileToFirebase = async (file: any, folderPath: string) => {
  const fileExt = generateFileExt(file)
  const uniqueFilename = `${folderPath}/${generateUniqueSuffix(fileExt)}`
  const bucketFile = bucket.file(uniqueFilename)
  await bucketFile.save(file.buffer, { contentType: file.mimetype })

  const fileRef = bucket.file(uniqueFilename)
  const url = await getDownloadURL(fileRef)

  return url
}

const uploadMultipleFilesToFirebase = async (files: any[], folderPath: string) => {
  const urls = []

  for (const file of files) {
    const fileExt = generateFileExt(file)
    const uniqueFilename = `${folderPath}/${generateUniqueSuffix(fileExt)}`
    const bucketFile = bucket.file(uniqueFilename)
    await bucketFile.save(file.buffer, { contentType: file.mimetype })

    const fileRef = bucket.file(uniqueFilename)
    const url = await getDownloadURL(fileRef)
    urls.push(url)
  }

  return urls
}

export { uploadeFileToFirebase, uploadMultipleFilesToFirebase }
