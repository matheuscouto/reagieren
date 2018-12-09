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

interface IWord {
  word: string,
  article: string,
  meaning: string,
}

interface IDictionary {
  [word: string]: IWord
}

export type IMoveSet = 'artikel' | 'konjugieren'

export interface IHeroMoveSet {
  artikel: number,
  konjugieren: number,
}

export type IQuestion = IOpenQuestion | IMultipleChoiceQuestion | ICompleteQuestion | IPickMultipleWordsQuestion;

export interface IQuestionCollection { [id:string]: IQuestion }