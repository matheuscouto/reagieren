import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { IHeroMoveSet } from '../../declarations';
import { Selector } from '..';
import { attack, startBattle } from './combat';
import { mockDictionary } from '../../components/Question/mockQuestions';
import { has } from 'lodash';

// ACTIONS

const actionCreator = actionCreatorFactory('HERO');

// SELECTORS

export const selectPlayerHP: Selector<number> = ({ hero }) => hero.hp;
export const selectMoveSet: Selector<IHeroMoveSet> = ({ hero }) => hero.moveSet;
export const selectSelectedMoves: Selector<{[moveCategory: string]: string[]}> = ({ hero }) => hero.selectedMoves;

// STATE

export interface IState {
	hp: number;
	moveSet: IHeroMoveSet;
	selectedMoves: {
		[moveCategory: string]: string[]
	}
}

const INITIAL_STATE: IState = {
	hp: 10,
	moveSet: {
		artikel: 2,
		konjugieren: 0,
	},
	selectedMoves: {
		artikel: [],
	}
};

// REDUCER

export default reducerWithInitialState(INITIAL_STATE)
	.case(startBattle, (state:IState) => ({
		...state,
		selectedMoves: {
			...state.selectedMoves,
			artikel: randomNWords(mockDictionary, state.moveSet.artikel)
		}
	}))
	.case(attack, (state:IState, {move, attackSuccess, moveCategory, moveId}) => ({
		...state,
		hp: !attackSuccess ? state.hp-1 : state.hp,
		moveSet: {
			...state.moveSet,
			[move]: state.moveSet[move]-1
		},
		selectedMoves: {
			...state.selectedMoves,
			[moveCategory]: state.selectedMoves[moveCategory].filter((id) => id !== moveId)
		}
		// points: difference(answer,state.unansweredQuestions[questionId].answer).length === 0 ? state.points+1 : state.points
	}))
	.build();

// EFFECTS

export const epics = combineEpics();

const randomNWords = function (obj:any, n:number):string[] {
	let words:string[] = []
	var keys = Object.keys(obj)
	for (let i = 0; i < n; i++) { 
		let nextRandomWord;
		while(true) {
			nextRandomWord = keys[ keys.length * Math.random() << 0];
			if(words.indexOf(nextRandomWord) === -1) {
				words.push(nextRandomWord);
				break;
			}
		}
	}
	return words
};
