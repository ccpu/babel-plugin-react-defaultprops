import path from 'path';
import glob from 'fast-glob';
import { transform } from './utils';

const manualTestFixturesPath = path.resolve('__tests__/fixtures/manual');

describe('should pass fixtures', () => {
  const files = glob.sync('./fixtures/**/*.{ts,tsx,js,jsx}', {
    cwd: __dirname,
    dot: false,
  });

  files.forEach((basePath) => {
    const filePath = String(basePath);

    if (filePath.includes('/manual/')) {
      return;
    }

    const parsedFile = path.parse(filePath);

    const pathToSnap = path.resolve(
      process.cwd(),
      '__tests__',
      '__snapshots__',
      parsedFile.dir,
      parsedFile.name + parsedFile.ext + '.shot',
    );

    it(`transforms ${parsedFile.dir}/${parsedFile.base}`, () => {
      const result = transform(
        path.join(__dirname, filePath),
        {
          comments: false,
          value: 'foo',
        },
        {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
      );
      expect(result).toMatchSpecificSnapshot(pathToSnap);
    });
  });

  it('should pass empty file', () => {
    const result = transform(
      path.join(manualTestFixturesPath, 'empty-file.ts'),
      {},
      {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      },
    );

    expect(result).toBe('"use strict";');
  });
});
