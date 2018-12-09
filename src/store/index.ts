import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { ActionsObservable, combineEpics, createEpicMiddleware, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';

// REDUCERS AND EPICS EXPORTS

import appStateReducer, { epics as appStateEpics, init, IState as IAppStateState } from './app/state';
import heroReducer, { epics as heroEpics, IState as IHeroState } from './campaign/hero';
import combatReducer, { epics as combatEpics, IState as ICombatState } from './campaign/combat';

// STORE INTERFACE

export interface IRootState {
	appState: IAppStateState,
	hero: IHeroState,
	combat: ICombatState,
}

// COMBINED REDUCERS

const rootReducer = combineReducers<IRootState>({
	appState: appStateReducer,
	hero: heroReducer,
	combat: combatReducer,
});

// COMBINED EPICS

const rootEpic = combineEpics(
	appStateEpics,
	heroEpics,
	combatEpics,
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
