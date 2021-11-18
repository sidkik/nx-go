import { ServeExecutorSchema } from './schema';
import executor from './executor';
import { ExecutorContext } from '@nrwl/devkit';
import { ensureNxProject, runNxCommandAsync } from '@nrwl/nx-plugin/testing';

describe('Serve Executor', () => {
  let context: ExecutorContext;
  let options: ServeExecutorSchema;

  const projectName = 'test-app';

  beforeAll(async () => {
    ensureNxProject('@nx-go/nx-go', 'dist/packages/nx-go');
    await runNxCommandAsync(
      `generate @nx-go/nx-go:app ${projectName}`
    );

    await runNxCommandAsync(`build ${projectName}`); 
  });

  beforeEach(async () => {
    context = {
      projectName,
      root: `${process.cwd()}/tmp/nx-e2e/proj`,
      targetName: 'test-nx',
      cwd: `${process.cwd()}/tmp/nx-e2e/proj`,
      isVerbose: true,
      workspace: {
        version: 2,
        npmScope: 'test-nx',
        projects: {},
      }
    } as ExecutorContext;

    context.workspace.projects[projectName] = {
      root: `apps/${projectName}`,
      projectType: "application",
      sourceRoot: `apps/${projectName}/src`,
    }
    
    options = {
      main: 'apps/test-app/src/main.go'
    };
  });

  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
