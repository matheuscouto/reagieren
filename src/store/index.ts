import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { ActionsObservable, combineEpics, createEpicMiddleware, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';

// REDUCERS AND EPICS EXPORTS

import appStateReducer, { epics as appStateEpics, init, IState as IAppStateState } from './app/state';
import quizQuestionsReducer, { epics as quizQuestionsEpics, IState as IQuizQuestionsState } from './quiz/questions';

// STORE INTERFACE

export interface IRootState {
	appState: IAppStateState,
	quizQuestions: IQuizQuestionsState,
}

// COMBINED REDUCERS

const rootReducer = combineReducers<IRootState>({
	appState: appStateReducer,
	quizQuestions: quizQuestionsReducer,
});

// COMBINED EPICS

const rootEpic = combineEpics(
	appStateEpics,
	quizQuestionsEpics,
);

export type Epic = (action$: ActionsObservable<Action<any>>, state$: StateObservable<IRootState>) => Observable<Action<any>>;
export type Selector<Value, Props = any> = (state: IRootState, props?: Props) => Value;

const epicMiddleware = createEpicMiddleware<any>();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(epicMiddleware)),
)

export default store;

epicMiddleware.run(rootEpic);

store.dispatch(init());
