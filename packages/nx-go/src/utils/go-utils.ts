import { execSync } from 'child_process'

export function runGoCommand(
  command: 'build' | 'fmt' | 'run' | 'test',
  params: string[],
  options: { cwd?: string; cmd?: string; afterHook?: string } = {},
): { success: boolean } {
  // Take the parameters or set defaults
  const cmd = options.cmd || 'go ' + command
  const cwd = options.cwd || process.cwd()
  const afterHookCmd = options.afterHook ? ` && ${options.afterHook}` : ''

  // Create the command to execute

  const execute = `${cmd} ${params.join(' ')}${afterHookCmd}`
  console.log('Running: ', execute, ' in cwd:', cwd)

  try {
    execSync(execute, { cwd, stdio: [0, 1, 2] })
    return { success: true }
  } catch (e) {
    console.error(e)
    return { success: false }
  }
}
