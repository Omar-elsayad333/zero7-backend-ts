import bcrypt from 'bcrypt'

const hashPassword = async (password: string, saltLength: number = 10): Promise<string> => {
  const salt = await bcrypt.genSalt(saltLength)
  return await bcrypt.hash(password, salt)
}

export { hashPassword }
