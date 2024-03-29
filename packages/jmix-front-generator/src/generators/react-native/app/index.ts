import {BaseGenerator} from '../../../common/base-generator';
import {ProjectInfo} from '../../../common/model/cuba-model';
import {writeSdkAll} from "../../../building-blocks/stages/writing/pieces/sdk/sdk"
import {CommonGenerationOptions, commonGenerationOptionsConfig} from '../../../common/cli-options';
import path from "path";
import {normalizeSecret} from "../../../common/studio/studio-integration";

interface ReactNativeAnswers {
}

interface ReactNativeTemplateModel {
  project: ProjectInfo
}

class ReactNativeAppGenerator extends BaseGenerator<ReactNativeAnswers, ReactNativeTemplateModel, CommonGenerationOptions> {

  constructor(args: string | string[], options: CommonGenerationOptions) {
    super(args, options);
    this.sourceRoot(path.join(__dirname, 'template'));
  }

  // noinspection JSUnusedGlobalSymbols - yeoman runs all methods from class
  async prompting() {
    if (this.options.model) {
      this.log('Skipping prompts since model provided');
      this.cubaProjectModel = this._readProjectModel();
      return;
    }

    await this._obtainCubaProjectModel();
  }

  // noinspection JSUnusedGlobalSymbols - yeoman runs all methods from class
  async prepareModel() {
    if (!this.cubaProjectModel || !this.cubaProjectModel.project) {
      throw new Error('Model is not provided');
    }

    const {project} = this.cubaProjectModel;

    this.model = {project};
    this.model.project.restClientId = project.restClientId ?? 'client';
    this.model.project.restClientSecret = project.restClientSecret ? normalizeSecret(project.restClientSecret) : 'secret';
  }

  // noinspection JSUnusedGlobalSymbols - yeoman runs all methods from class
  writing() {
    this.log(`Generating to ${this.destinationPath()}`);

    if (!this.model) {
      throw new Error('Model is not provided');
    }

    this.fs.copyTpl(
      this.templatePath() + '/**',
      this.destinationPath(),
      this.model,
      undefined,
      { globOptions: { dot: true } } // copy all files including hidden (will not copy hidden directories)
    );

    const sdkDest = 'cuba';
    this.log(`Generating SDK model and services in ${sdkDest}`);

    writeSdkAll(this, this.cubaProjectModel!, sdkDest);
  }

  end() {
    this.log(`CUBA React Native client has been successfully generated into ${this.destinationRoot()}`);
  }
}

export const generator = ReactNativeAppGenerator;
export const options = commonGenerationOptionsConfig;
export const params = [];
