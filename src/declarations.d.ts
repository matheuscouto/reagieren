interface IOpenQuestion {
  type: 'open';
  wording: string;
  answer: string;
}

interface IMultipleChoiceQuestion {
  type: 'multiple-choice';
  wording: string;
  answer: string;
  options: string[];
}

export type IQuestion = IOpenQuestion | IMultipleChoiceQuestion;

export interface IQuestionCollection { [id:string]: IQuestion }