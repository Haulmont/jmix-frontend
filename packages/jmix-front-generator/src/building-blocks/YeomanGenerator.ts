import { CommonGenerationOptions } from "../common/cli-options";
import Base from "yeoman-generator";

// Do not put anything in this class. It only exists to simplify the IDE-assisted imports and fix the typings.
export abstract class YeomanGenerator extends Base {
  protected constructor(args: string | string[], options: CommonGenerationOptions) {
    super(args, options, {customInstallTask: true});
  }
}