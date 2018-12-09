interface IOpenQuestion {
  type: 'open';
  wording: string;
  answer: string[];
}

interface IMultipleChoiceQuestion {
  type: 'multiple-choice';
  wording: string;
  answer: string[];
  options: string[];
}

interface ICompleteQuestion {
  type: 'complete';
  wording: string;
  answer: string[];
}

interface IPickMultipleWordsQuestion {
  type: 'pick-multiple-words';
  wording: string;
  answer: string[];
  options: string[];
}

export type IQuestion = IOpenQuestion | IMultipleChoiceQuestion | ICompleteQuestion | IPickMultipleWordsQuestion;

export interface IQuestionCollection { [id:string]: IQuestion }