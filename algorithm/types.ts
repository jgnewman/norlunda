export type Context = {
  isFalseVerb?: boolean
}

export type PhaseFn = (word: string, context: Context) => string

export type PhaseFnArray = PhaseFn[]