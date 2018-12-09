import React, { useState, ChangeEvent, FormEvent } from 'react';
import { IQuestion } from '../../declarations';
import { MultipleChoiceAnswer, OpenAnswer, PickMultipleWordsAnswer } from '../';

interface IProps {
  question: IQuestion;
  questionId: string;
}

const Question:React.FunctionComponent<IProps & IMapDispatchToProps> = ({question, questionId, answerQuestion}) => {
  
  const [answer, setAnswer] = useState<string[]>(['']);
  const handleSetAnswer = (openQuestion: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
    if(!openQuestion) {
      if (answer.indexOf(e.target.value) === -1)
      setAnswer(answer.concat(e.target.value));
      else setAnswer(answer.filter(ans => ans !== e.target.value));
    } else {
      let newAnswer = answer;
      newAnswer[0] = e.target.value;
      setAnswer(newAnswer)
    }
  }
  const handleAnswerQuestion = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    answerQuestion(questionId, answer[0]);
    setAnswer([''])
  }

  const renderAnswer = () => {
    switch(question.type) {
      case 'multiple-choice':
        return <MultipleChoiceAnswer answer={answer[0]} options={question.options} handleSetAnswer={handleSetAnswer(true)} />
      case 'open':
        return <OpenAnswer answer={answer[0]} handleSetAnswer={handleSetAnswer(true)} />
      case 'pick-multiple-words':
        return <PickMultipleWordsAnswer answer={answer} options={question.options} handleSetAnswer={handleSetAnswer(false)} />
      case 'complete':
        return null
    }
  }
  
  return (
    <form action="" onSubmit={handleAnswerQuestion}>
      <p>{question.wording}</p>
      {
        renderAnswer()
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
	answerQuestion: (questionId, answer) => dispatch(answerQuestion({questionId, answer: [answer]})),
})

export default connect(null, mapDispatchToProps)(Question);