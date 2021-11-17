import { runGoCommand } from '../../utils/go-utils';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(options: BuildExecutorSchema) {
  const mainFile = `${options.main}`
  const output = `-o ${options.outputPath}/main`

  return {
    success: runGoCommand('build', [output, mainFile]),
  };
}
