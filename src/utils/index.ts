const generateUniqueSuffix = (fileExt: string) => {
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`
}

const generateFileExt = (file: any) => {
  return file.mimetype?.split('/')[1]
}

export { generateUniqueSuffix, generateFileExt }
