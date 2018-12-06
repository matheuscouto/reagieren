import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { IQuestionCollection } from '../../declarations';
import { Selector } from '..';
import { assign, omit, pick } from 'lodash';
import MockQuestions from './mockQuestions';

// ACTIONS

const actionCreator = actionCreatorFactory('QUIZ::QUESTIONS');
export const answerQuestion = actionCreator<{ questionId: string, answer: string }>('ANSWER_QUESTION');

// SELECTORS

export const selectUnansweredQuestions: Selector<IQuestionCollection> = ({ quizQuestions }) => quizQuestions.unansweredQuestions;
export const selectAnsweredQuestions: Selector<IQuestionCollection> = ({ quizQuestions }) => quizQuestions.answeredQuestions;
export const selectPoints: Selector<number> = ({ quizQuestions }) => quizQuestions.points;

// STATE

export interface IState {
	unansweredQuestions: IQuestionCollection;
	answeredQuestions: IQuestionCollection;
	points: number;
}

const INITIAL_STATE: IState = {
	unansweredQuestions: MockQuestions,
	answeredQuestions: {},
	points: 0,
};

// REDUCER

export default reducerWithInitialState(INITIAL_STATE)
	.case(answerQuestion, (state:IState, {questionId, answer}) => ({
		...state,
		unansweredQuestions: omit(state.unansweredQuestions, [questionId]),
		answeredQuestions: assign(state.answeredQuestions, pick(state.unansweredQuestions, [questionId])),
		points: answer===state.unansweredQuestions[questionId].answer ? state.points+1 : state.points
	}))
	.build();

// EFFECTS

export const epics = combineEpics();
