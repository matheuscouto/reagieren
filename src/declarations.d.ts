export interface IQuestion {
  type: 'open' | 'multiple-choice';
  wording: string;
  answer: string | string[];
}

export interface IQuestionCollection { [id:string]: IQuestion }