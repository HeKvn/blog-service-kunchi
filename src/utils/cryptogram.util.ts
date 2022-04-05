import * as crypto from 'crypto'

// 随机盐
export function makeSalt (): string {
  return crypto.randomBytes(3).toString('base64')
}

/**
 * 使用盐加密明文密码
 * @param password 密码
 * @param salt 盐
 * @returns 加密后的密码
 */
export function encryptPassword (password: string, salt: string): string {
  if (!password || !salt) return ''
  const tempSalt = Buffer.from(salt, 'base64')
  return (
    // 1000代表迭代次数，16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 1000, 16, 'sha1').toString('base64')
  )
}

export function encryptFileMD5 (buffer: Buffer) {
  const md5 = crypto.createHash('md5')
  return md5.update(buffer).digest('hex')
}