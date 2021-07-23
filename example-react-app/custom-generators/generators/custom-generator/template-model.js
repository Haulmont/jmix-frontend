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
exports.deriveTemplateModel = void 0;
const common_1 = require("../../../../packages/jmix-front-generator/lib/building-blocks/stages/template-model/pieces/common");
function deriveTemplateModel(answers, projectModel, gen, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return Object.assign({}, common_1.deriveEntityCommon(options, answers));
    });
}
exports.deriveTemplateModel = deriveTemplateModel;
//# sourceMappingURL=template-model.js.map