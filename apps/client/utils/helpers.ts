export const assertUnreachable = (_?: never): never => {
  throw new Error('Unhandled case')
}
