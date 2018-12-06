import React, { useState, ChangeEvent, FormEvent } from 'react';
import { IQuestion } from '../../declarations';
import { MultipleChoiceAnswer, OpenAnswer } from '../';

interface IProps {
  question: IQuestion;
  questionId: string;
}

const Question:React.FunctionComponent<IProps & IMapDispatchToProps> = ({question, questionId, answerQuestion}) => {
  
  const [answer, setAnswer] = useState('');
  const handleSetAnswer = (e: ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value);
  const handleAnswerQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    answerQuestion(questionId, answer);
    setAnswer('');
  }
  
  return (
    <form action="" onSubmit={handleAnswerQuestion}>
      <p>{question.wording}</p>
      {
        question.type==='multiple-choice'
        ? <MultipleChoiceAnswer answer={answer} options={question.options} handleSetAnswer={handleSetAnswer} />
        : <OpenAnswer answer={answer} handleSetAnswer={handleSetAnswer} />
      }
      <button type="submit">Responder</button>
    </form>
  )
}

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { answerQuestion } from '../../store/quiz/questions';

/* *************************** */
//    MAP DISPATCH TO PROPS    //
/* *************************** */

interface IMapDispatchToProps {
	answerQuestion: (questionId: string, answer: string) => void;
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	answerQuestion: (questionId, answer) => dispatch(answerQuestion({questionId, answer})),
})

export default connect(null, mapDispatchToProps)(Question);