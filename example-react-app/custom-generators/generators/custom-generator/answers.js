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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnswersFromPrompt = exports.allQuestions = void 0;
const defaultGetAnswersFromPrompt_1 = require("../../../../packages/jmix-front-generator/lib/building-blocks/stages/answers/defaultGetAnswersFromPrompt");
const blankComponentQuestions = [
    {
        caption: "Component class name",
        code: "componentName",
        propertyType: "POLYMER_COMPONENT_NAME" /* POLYMER_COMPONENT_NAME */,
        required: true
    },
    {
        caption: "Menu item",
        code: "menuItem",
        propertyType: "MENU_ITEM" /* MENU_ITEM */,
        required: false
    }
];
const questionsToBeAskedInCLI = [
    ...blankComponentQuestions
];
exports.allQuestions = [
    ...questionsToBeAskedInCLI
];
const getAnswersFromPrompt = (projectModel, gen, options) => __awaiter(void 0, void 0, void 0, function* () {
    const answers = yield defaultGetAnswersFromPrompt_1.askQuestions(questionsToBeAskedInCLI, projectModel, gen);
    return answers;
});
exports.getAnswersFromPrompt = getAnswersFromPrompt;
//# sourceMappingURL=answers.js.map