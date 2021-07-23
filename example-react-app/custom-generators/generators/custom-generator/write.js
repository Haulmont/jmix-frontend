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
exports.write = void 0;
const i18n_1 = require("../../../../packages/jmix-front-generator/lib/building-blocks/stages/writing/pieces/i18n");
const menu_1 = require("../../../../packages/jmix-front-generator/lib/building-blocks/stages/writing/pieces/menu");
const previews_registration_1 = require("../../../../packages/jmix-front-generator/lib/building-blocks/stages/writing/pieces/previews-registration");
const write = (projectModel, templateModel, gen, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { dirShift } = options;
    const { className, nameLiteral, menuItem } = templateModel;
    const extension = '.tsx';
    writeBlankComponent(gen, extension, templateModel);
    i18n_1.writeComponentI18nMessages(gen.fs, className, dirShift, (_a = projectModel.project) === null || _a === void 0 ? void 0 : _a.locales);
    menu_1.addAppMenu(gen, dirShift, className, menuItem);
    menu_1.addMenuItem(gen, dirShift, className, nameLiteral);
    previews_registration_1.addComponentPreviews(gen, dirShift, className, nameLiteral);
});
exports.write = write;
function writeBlankComponent(gen, extension, model) {
    gen.fs.copyTpl(gen.templatePath('Component' + extension), gen.destinationPath(model.className + extension), model);
}
//# sourceMappingURL=write.js.map