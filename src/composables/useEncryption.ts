// useEncryption.ts
import CryptoJS from 'crypto-js'

const SECRET_KEY = 'layao-secret-key'

export function useEncryption() {
  // Encrypt an object to a string
  const encryptObject = (obj: Record<string, any>): string => {
    const json = JSON.stringify(obj)
    const ciphertext = CryptoJS.AES.encrypt(json, SECRET_KEY).toString()
    // Encode for URL
    return encodeURIComponent(ciphertext)
  }

  // Decrypt string back to object
  const decryptObject = (ciphertext: string): Record<string, any> | null => {
    try {
      const decoded = decodeURIComponent(ciphertext)
      const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY)
      const json = bytes.toString(CryptoJS.enc.Utf8)
      return JSON.parse(json)
    } catch (err) {
      console.error('Decryption failed:', err)
      return null
    }
  }

  return { encryptObject, decryptObject }
}
