import React from 'react';
import { Question } from '../../components';
import { IQuestionCollection } from '../../declarations';
import { isEmpty } from 'lodash';

const QuizPage: React.FunctionComponent<IMapStateToProps> = ({
  unansweredQuestions,
  points
}) => {
  const unansweredQuestionsIdList = Object.keys(unansweredQuestions);
  const nextQuestionId = unansweredQuestionsIdList[Math.floor(Math.random() * unansweredQuestionsIdList.length)];
  return (
    <div>
      {
        !isEmpty(unansweredQuestions)
        ? <Question question={unansweredQuestions[nextQuestionId]} questionId={nextQuestionId} />
        : <p>Acabou! :)</p>
      }
      <p>Pontos: {points}</p>
    </div>
  );
}

import { connect } from 'react-redux';
import { IRootState } from '../../store';
import { selectUnansweredQuestions, selectPoints } from '../../store/quiz/questions';

/* *************************** */
//      MAP STATE TO PROPS     //
/* *************************** */

interface IMapStateToProps {
  unansweredQuestions: IQuestionCollection,
  points: number,
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  unansweredQuestions: selectUnansweredQuestions(state),
  points: selectPoints(state),
});

export default connect(mapStateToProps)(QuizPage);

/* TODO

  1) Receive UnansweredQuestionsList
  loop _____ (until UnansweredQuestionsList.lenght === 0)
  |       \/
  |        2) Pick random question and show
  |        3) Get answer from user and check validity
  |        4) Remove question from UnansweredQuestionsList and add it to AnsweredQuestionsList
  |        5) Respond user
  |        6) Pick next question
  |_______/\

*/