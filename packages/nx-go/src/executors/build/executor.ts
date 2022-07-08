import { runGoCommand } from '../../utils/go-utils'
import { BuildExecutorSchema } from './schema'
import { execSync } from 'child_process'
import { logger } from '@nrwl/devkit'

export default async function runExecutor(options: BuildExecutorSchema) {
  const mainFile = `${options.main}`
  const output = `-o ${options.outputPath}/main`
  const flags = `-ldflags "-X '${options.versionPackage}/version.BuildVersion=${grabVersionFromGit(options.app)}' -X '${
    options.versionPackage
  }/version.BuildTime=${new Date()}'"`

  logger.info('build flags ' + flags)
  return runGoCommand('build', [output, flags, mainFile])
}

export function grabVersionFromGit(app: string): string {
  const cmd = `git describe  --match ${app}* --abbrev=0`
  try {
    const version = execSync(cmd)
    logger.info('found version ' + version.toString())
    return version.toString().replace('\n', '')
  } catch (e) {
    logger.error('error getting version from git ' + e)
    return `${app}-0.0.0`
  }
}
