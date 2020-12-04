import Iron from '@hapi/iron'

export async function encrypt(data: any) {
  return data && Iron.seal(data, process.env.ENCRYPTION_SECRET as string, Iron.defaults)
}

export async function decrypt(data: string) {
  return data && Iron.unseal(data, process.env.ENCRYPTION_SECRET as string, Iron.defaults)
}