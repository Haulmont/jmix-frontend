import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {EmptyTemplateModel} from "../../../building-blocks/stages/template-model/pieces/EmptyTemplateModel";
import {defaultWrite} from "../../../building-blocks/stages/writing/defaultWrite";
import {MemFsEditor} from "yeoman-generator";

export const writeGeneratorCustomization: WriteStage<CommonGenerationOptions, EmptyTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  defaultWrite(projectModel, templateModel, gen, options);
  modifyPackageJson(gen.fs);
  modifyGitignore(gen.fs);
}

function modifyPackageJson(fs: MemFsEditor,) {
  const filePath = './package.json';
  const packageJson = fs.readJSON(filePath);
  packageJson.jmix.customGeneratorPaths = [
    "generator-customization/generators/build"
  ];
  packageJson.jmix.customTemplatePaths = [
    "generator-customization/templates"
  ];
  packageJson.scripts['gen:build'] = 'rimraf generator-customization/generators/build && tsc --project generator-customization/generators/tsconfig.json && node generator-customization/generators/copy-assets.js';
  packageJson.devDependencies['@types/yeoman-generator'] = '^5.2.1';
  packageJson.devDependencies['rimraf'] = '^3.0.2';
  packageJson.devDependencies['vinyl-fs'] = '^3.0.3';

  fs.writeJSON(filePath, packageJson);
}

const gitignoreBuiltGens = `

# built generators
/generator-customization/generators/build
`;

function modifyGitignore(fs: MemFsEditor) {
  const filePath = './.gitignore';
  let gitignore = fs.read(filePath);
  gitignore += gitignoreBuiltGens;
  fs.write(filePath, gitignore);
}
