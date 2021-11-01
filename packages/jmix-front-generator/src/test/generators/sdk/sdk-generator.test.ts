import assert from "assert";
import {generate} from "../../../init";
import fs from "fs";
import {promisify} from "util";
import path from "path";
import {SdkAllGenerator} from "../../../generators/sdk/all"
import YeomanEnvironment from "yeoman-environment";
import {expect} from "chai";
import {ERR_STUDIO_NOT_CONNECTED} from "../../../common/studio/studio-integration";
import { ComponentOptions } from "../../../building-blocks/stages/options/pieces/component";

const modelPath = require.resolve('../../fixtures/mpg-projectModel.json');
const rimraf = promisify(require('rimraf'));

const SDK_DIR = `src/test/generated/sdk`;
const SDK_ALL_DIR = path.join(process.cwd(), `${SDK_DIR}/all`);
const SDK_MODEL_DIR = path.join(process.cwd(), `${SDK_DIR}/model`);
const GENERATORS_DIR = path.join(__dirname, '../../../generators');

describe('sdk generator test', () => {

  before(() => {
    console.log('cleanup', SDK_DIR);
    rimraf(`${SDK_DIR}/*`)
  });

  it('should generate sdk:all', () => rimraf(`${SDK_ALL_DIR}/*`)
    .then(() => generate('sdk', 'all', {
        model: modelPath,
        dest: SDK_ALL_DIR,
        debug: true
      })
    )
    .then(() => {
      assert.ok(fs.existsSync(path.join(SDK_ALL_DIR, `enums/enums.ts`)));
      assert.ok(!fs.existsSync(path.join(SDK_ALL_DIR, `entities/base`)));
    }));

  it('should generate sdk:model', () => rimraf(`${SDK_MODEL_DIR}/*`)
    .then(() => generate('sdk', 'model', {
        model: modelPath,
        dest: SDK_MODEL_DIR,
        debug: true
      })
    )
    .then(() => {
      assert.ok(fs.existsSync(path.join(SDK_MODEL_DIR, `enums/enums.ts`)));
      assert.ok(!fs.existsSync(path.join(SDK_MODEL_DIR, `entities/base`)));
      //services and queries should NOT be generated for sdk:model mode
    }));

  it('should generates sdk for empty model', () => {
    //TODO
  });

  it('should fail generate if model file does not exist', (done) => {
    const notExistingModelPath = 'not/existing/model/path.json';
    const absoluteModelPath = path.join(process.cwd(), notExistingModelPath)
    const gerOptions = {
      model: notExistingModelPath,
      dest: SDK_ALL_DIR,
      debug: true,
      dirShift: '../../'
    }

    const Gen = class extends SdkAllGenerator {
      constructor(args: string | string[], options: ComponentOptions){
        super(['--model', notExistingModelPath, ...args], {...options, ...gerOptions});
      }
      // noinspection JSUnusedGlobalSymbols
      async testing() {
        try {
          await this.generate();
        } catch (e: any) {
          expect(e.message).eq('Specified model file does not exist ' + absoluteModelPath);
          done();
        }

      }
    };

    runGenerator(Gen);
  });

  it('should fail if CUBA not connected', (done) => {

    const Gen = class extends SdkAllGenerator {
      constructor(args: string | string[], options: ComponentOptions){
        super(args, options);
      }
      // noinspection JSUnusedGlobalSymbols
      async testing() {
        try {
          await this.generate();
        } catch (e: any) {
          expect(e).eq(ERR_STUDIO_NOT_CONNECTED);
          done();
        }
      }
    };

    runGenerator(Gen);
  });
});

function runGenerator(genClass: any, onError?: (e: Error) => void) {
  const env = new YeomanEnvironment();
  env.registerStub(genClass, 'Gen');
    // @ts-ignore
  env.on('error', e => {
    if (onError != null) {
      onError(e);
    }
  });
  // callback in env.run method is deprecated. @types/yeoman-environment isn't updated to 3.0.0 yet
  (env as any).run('Gen');
}


