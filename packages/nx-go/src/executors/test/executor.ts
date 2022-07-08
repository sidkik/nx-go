import { ExecutorContext } from '@nrwl/devkit'
import { join } from 'path'
import { runGoCommand } from '../../utils/go-utils'
import { TestExecutorSchema } from './schema'

export default async function runExecutor(options: TestExecutorSchema, context: ExecutorContext) {
  if (!context.projectName) {
    throw new Error('No projectName')
  }
  const appRoot = context.workspace.projects[context.projectName].root
  let cwd = options.all ? context.cwd : join(context.cwd, appRoot)

  const sources = options.srcs ? `-v ${options.srcs}` : `-v ./...`
  if (options.srcs) {
    cwd = context.cwd
  }
  const cover = options.skipCover ? '' : '-cover'
  const nocache = options.nocache ? '-count=1' : ''
  const race = options.skipRace ? '' : '-race'
  const tags = options.tags ? '-tags=' + options.tags : ''
  const junit = options.junit && options.junit !== '' ? '--junitfile ' + join(context.cwd, options.junit) : ''

  if (junit !== '') {
    const cmd = `gotestsum ${junit} --`
    return runGoCommand(`test`, [sources, race, tags, nocache], { cwd, cmd, afterHook: options.afterHook })
  }
  return runGoCommand('test', [sources, cover, race, tags, nocache], { cwd, afterHook: options.afterHook })
}
