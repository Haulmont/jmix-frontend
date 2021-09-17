import * as inquirer from 'inquirer';
import {AutocompleteQuestionOptions} from 'inquirer-autocomplete-prompt';

declare module 'inquirer' {
  interface QuestionMap<T extends inquirer.Answers = inquirer.Answers> {
    autocomplete: AutocompleteQuestionOptions<T>;
  }
}