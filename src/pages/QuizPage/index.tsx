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
