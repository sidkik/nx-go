export interface TestExecutorSchema {
  skipCover?: boolean
  skipRace?: boolean
  junit?: string
  afterHook?: string
  all?: boolean
  tags?: string
  srcs?: string
  nocache?: boolean
}
