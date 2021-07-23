"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = exports.icon = exports.description = exports.params = exports.options = exports.generator = exports.ReactComponentGenerator = void 0;
const cli_options_1 = require("../../../../packages/jmix-front-generator/lib/common/cli-options");
Object.defineProperty(exports, "options", { enumerable: true, get: function () { return cli_options_1.componentOptionsConfig; } });
const path_1 = __importDefault(require("path"));
const defaultPipeline_1 = require("../../../../packages/jmix-front-generator/lib/building-blocks/pipelines/defaultPipeline");
const answers_1 = require("./answers");
Object.defineProperty(exports, "params", { enumerable: true, get: function () { return answers_1.allQuestions; } });
const template_model_1 = require("./template-model");
const write_1 = require("./write");
const YeomanGenerator_1 = require("../../../../packages/jmix-front-generator/lib/building-blocks/YeomanGenerator");
class ReactComponentGenerator extends YeomanGenerator_1.YeomanGenerator {
    constructor(args, options) {
        super(args, options);
    }
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield defaultPipeline_1.defaultPipeline({
                templateDir: path_1.default.join(__dirname, 'template'),
                questions: answers_1.allQuestions,
                stages: {
                    getAnswersFromPrompt: answers_1.getAnswersFromPrompt,
                    deriveTemplateModel: template_model_1.deriveTemplateModel,
                    write: write_1.write
                }
            }, this);
        });
    }
}
exports.ReactComponentGenerator = ReactComponentGenerator;
exports.generator = ReactComponentGenerator;
const description = 'Empty screen template.';
exports.description = description;
const icon = "blank.svg";
exports.icon = icon;
const index = 0;
exports.index = index;
//# sourceMappingURL=index.js.map