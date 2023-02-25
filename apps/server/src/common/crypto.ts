import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

export const hashValue = async (value: string): Promise<string> => {
  return await bcrypt.hash(value, 10)
}

export const hashCompare = async (data: string, encrypted: string) => {
  return await bcrypt.compare(data, encrypted)
}

export const generateRandomToken = (): string => {
  return crypto.randomBytes(64).toString('hex')
}
