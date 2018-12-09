import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { IMoveSet } from '../../declarations';
import { Selector } from '..';

// ACTIONS

const actionCreator = actionCreatorFactory('COMBAT');
export const attack = actionCreator<{ move: IMoveSet, attackSuccess: boolean, moveId: string, moveCategory: string }>('ANSWER_QUESTION');
export const startBattle = actionCreator('START_BATTLE');

// SELECTORS

export const selectEnemyHP: Selector<number> = ({ combat }) => combat.enemyHP;
export const selectStartedBattle: Selector<boolean> = ({ combat }) => combat.startedBattle;

// STATE

export interface IState {
	enemyHP: number;
	startedBattle: boolean;
}

const INITIAL_STATE: IState = {
	enemyHP: 5,
	startedBattle: false,
};

// REDUCER

export default reducerWithInitialState(INITIAL_STATE)
	.case(startBattle, (state:IState) => ({
		...state,
		startedBattle: true,
	}))
	.case(attack, (state:IState, {attackSuccess}) => ({
		...state,
		enemyHP: attackSuccess ? state.enemyHP-1 : state.enemyHP,
	}))
	.build();

// EFFECTS

export const epics = combineEpics();
