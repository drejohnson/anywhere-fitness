const handleSetupError = (promise: Promise<unknown>, explanation: string) => {
  return promise
    .then(data => {
      console.log(`   [ Executed ] '${explanation}'`)
      return data
    })
    .catch(error => {
      if (error && error.message === 'instance already exists') {
        console.warn(`   [ Skipped ] '${explanation}', it already exists`)
      } else {
        console.error(`   [ Failed  ] '${explanation}', with error:`, error)
      }
    })
}

const safeVerifyError: (error: any, keys: any[]) => any = (error, keys) => {
  if (keys.length > 0) {
    if (error && error[keys[0]]) {
      const newError = error[keys[0]]
      keys.shift()
      return safeVerifyError(newError, keys)
    } else {
      return false
    }
  }
  return error
}

const refreshTokenUsed = 'Refresh token invalid'
const userLocked = 'User is locked'

export { handleSetupError, safeVerifyError, refreshTokenUsed, userLocked }
