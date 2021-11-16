export function runGoCommand(
  command: 'build' | 'fmt' | 'run' | 'test',
  params: string[],
  options: { cwd?: string; cmd?: string } = {},
): { success: boolean } {
  // Take the parameters or set defaults
  const cmd = options.cmd || 'go'
  const cwd = options.cwd || process.cwd()

  // Create the command to execute
  const execute = `${cmd} ${command} ${params.join(' ')}`

  try {
    console.log('EXECUTE', execute)
    return { success: true }
  } catch (e) {
    return { success: false }
  }
}
