const fs = require('fs');
const dirPath = './src/app/[lng]/(features)';

const searchFiles = (dirPath) => {
  const allDirents = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];
  for (const dirent of allDirents) {
    if (dirent.isDirectory()) {
      const fp = `${dirPath}/${dirent.name}`;
      files.push(searchFiles(fp));
    } else if (dirent.isFile()) {
      files.push({
        dir: `${dirPath}/${dirent.name}`,
        name: dirent.name,
      });
    }
  }
  return files.flat();
};
const files = searchFiles(dirPath);
const viewAndPresenterZone = {
  // from: [`./src/repositories/**/*`],
  from: [],
  target: [],
};
files.map((file) =>
  file.name.includes('use')
    ? viewAndPresenterZone.target.push(file.dir)
    : viewAndPresenterZone.from.push(file.dir)
);
// console.log({ viewAndPresenterZone: viewAndPresenterZone });

module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['**/entities/**/*.ts'],
  rules: {
    eqeqeq: 'warn',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // presenterからviewへの参照を禁止
          viewAndPresenterZone,
          // presenterからrepositoryへの参照を禁止
          {
            from: './src/repositories/**/*',
            target: viewAndPresenterZone.target,
          },
          // usecaseからview・presenter・repositoryへの参照を禁止
          {
            from: [
              `./src/app/[lng]/(features)/**/*`,
              `./src/components/**/*`,
              `./src/repositories/**/*`,
            ],
            target: `./src/useCases/**/*`,
          },
          // repositoryからviewへの参照を禁止
          {
            from: [`./src/app/[lng]/(features)/**/*`],
            target: `./src/repositories/**/*`,
          },
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(^useDeep*)',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      // var,letはstrictCamelCaseを使用
      {
        selector: 'variable',
        format: ['strictCamelCase'],
      },
      // constはstrictCamelCase,StrictPascalCase,UPPER_CASEを使用
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
      },
      // 関数はstrictCamelCaseを使用、先頭のアンダースコア許容
      {
        selector: 'function',
        format: ['strictCamelCase'],
        leadingUnderscore: 'allow',
      },
      // get,setはstrictCamelCaseを使用
      {
        selector: 'accessor',
        format: ['strictCamelCase'],
      },
      // 関数パラメーターはstrictCamelCaseを使用、先頭のアンダースコア許容
      {
        selector: 'parameter',
        format: ['strictCamelCase'],
        leadingUnderscore: 'allow',
      },
      // typeはStrictPascalCase,UPPER_CASEを使用
      {
        selector: 'typeAlias',
        format: ['StrictPascalCase', 'UPPER_CASE'],
      },
      // classはStrictPascalCaseを使用
      {
        selector: 'class',
        format: ['StrictPascalCase'],
      },
      // interfaceはStrictPascalCaseを使用
      {
        selector: 'interface',
        format: ['StrictPascalCase'],
      },
    ],
  },
};
