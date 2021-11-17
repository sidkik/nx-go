import { ExecutorContext } from '@nrwl/devkit';
import { join } from 'path';
import { runGoCommand } from '../../utils/go-utils';
import { ServeExecutorSchema } from './schema';

export default async function runExecutor(options: ServeExecutorSchema, context: ExecutorContext) {
  if (!context.projectName) {
    throw new Error('No projectName')
  }
  const project = context.workspace.projects[context.projectName];
  const cwd = join(context.cwd, project.sourceRoot)

  // We strip the project root from the main file
  const mainFile = options.main?.replace(`${project.root}/`, '')

  return {
    success: runGoCommand('run', [mainFile], { cwd })
  };
}
