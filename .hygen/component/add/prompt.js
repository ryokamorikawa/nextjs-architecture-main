module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'select',
        name: 'layer',
        message: 'レイヤーを選択して下さい。',
        choices: [
          'Container and Presentational Components (View)', // Container: ロジックを受け取りPropsを渡すコンポーネント、Presentational：描画を行うコンポーネント
          'Component (View)', // app/[lng]/(features)/配下に作成する再利用しないコンポーネント
          'Common Component', // src/components/配下に作成する再利用可能なコンポーネント
          'Presenter',
          'UseCases',
          'Repositories',
        ],
      },
      {
        // type: select/input/confirm を指定可能
        type: 'input',
        name: 'feature',
        message:
          '機能名（feature）をcamelCaseで入力して下さい。 ※ Common Component の場合は記入不要',
      },
      {
        type: 'input',
        name: 'name',
        message:
          '拡張子を除いたファイル名を入力して下さい。※「useXXX」「XXXRepository」「XXXUsecase」は自動で付与されます。',
      },
    ];
    return inquirer.prompt(questions).then((answers) => {
      const { layer, feature, name } = answers;
      let tsxFilePath = ``;
      let containerFilePath = ``;
      let storyFilePath = ``;
      let storyBookTitlePath = ``;
      let presenterFilePath = ``;
      let useCaseFilePath = ``;
      let repositoryFilePath = ``;
      let testFilePath = ``;

      let componentName = ``;

      switch (layer) {
        case 'Container and Presentational Components (View)':
          // Container Component用のファイル生成
          if (name === 'page') {
            containerFilePath = `src/app/[lng]/(features)/${feature}/page.tsx`;
            componentName = toUpperFirstLetter(`pagePresentational`);
          } else {
            containerFilePath = `src/app/[lng]/(features)/${feature}/${toUpperFirstLetter(
              name
            )}Container.tsx`;
            componentName = toUpperFirstLetter(`${name}Presentational`);
          }
          // Presentational Component用のファイル生成
          tsxFilePath = `src/app/[lng]/(features)/${feature}/${componentName}`;
          storyFilePath = `src/app/[lng]/(features)/${feature}/${componentName}.stories.ts`;
          storyBookTitlePath = `${feature}/${componentName}`;
          break;
        case 'Component (View)':
          componentName = toUpperFirstLetter(`${name}`);
          tsxFilePath = `src/app/[lng]/(features)/${feature}/${componentName}`;
          storyFilePath = `src/app/[lng]/(features)/${feature}/${componentName}.stories.ts`;
          storyBookTitlePath = `${feature}/${componentName}`;
          break;
        case 'Common Component':
          componentName = toUpperFirstLetter(`${name}`);
          tsxFilePath = `src/components/${componentName}/${componentName}`;
          storyFilePath = `src/components/${componentName}/${componentName}.stories.ts`;
          storyBookTitlePath = `components/${componentName}`;
          break;
        case 'Presenter':
          presenterFilePath = `src/app/[lng]/(features)/${feature}/use${toUpperFirstLetter(
            name
          )}.ts`;
          testFilePath = `src/app/[lng]/(features)/${feature}/__tests__/use${toUpperFirstLetter(
            name
          )}.test.ts`;
          break;
        case 'UseCases':
          useCaseFilePath = `src/useCases/${feature}/${name}UseCase.ts`;
          testFilePath = `src/useCases/${feature}/__tests__/${name}UseCase.test.ts`;
          break;
        case 'Repositories':
          repositoryFilePath = `src/repositories/${feature}/${name}Repository.ts`;
          testFilePath = `src/repositories/${feature}/__tests__/${name}Repository.test.ts`;
          break;
      }

      return {
        ...answers,
        containerFilePath,
        tsxFilePath,
        storyBookTitlePath,
        storyFilePath,
        testFilePath,
        presenterFilePath,
        useCaseFilePath,
        repositoryFilePath,
        componentName,
      };
    });
  },
};

/**
 * 文字列の先頭を大文字に変換
 * @param {string} str 対象の文字列
 * @return {string} 変換された文字列を返す
 */
const toUpperFirstLetter = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
