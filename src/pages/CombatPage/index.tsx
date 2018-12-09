import React from 'react';
import { Question } from '../../components';
import { IHeroMoveSet, IMoveSet } from '../../declarations';
import { omitBy } from 'lodash';
import { Dispatch } from 'redux';
import { startBattle } from '../../store/campaign/combat';

const CombatPage: React.FunctionComponent<IMapStateToProps & IMapDispatchToProps> = ({
  enemyHp,
  heroHp,
  heroMoveSet,
  startBattle,
  startedBattle
}) => {
  
  const shouldEndbattle = ():boolean => {
    if(sumMovesLeft(heroMoveSet) <= 0 || enemyHp <= 0 )
      return true
    return false
  }

  const nextMove = ():IMoveSet => {
    const movesLeft = omitBy(heroMoveSet, moveCount => moveCount <= 0)
    return randomMove(movesLeft);
  }

  const handleStartBattle = () => startBattle();

  return (
    <div>
      {
        startedBattle
        ? !shouldEndbattle()
          ? <><Question nextMoveCategory={nextMove()} />
            <p>ENEMY HP: {enemyHp}</p>
            <p>HERO HP: {heroHp}</p></>
          : <p>Acabou! :)</p>
        : <button onClick={handleStartBattle}>Start battle</button>
      }
    </div>
  );
}

const sumMovesLeft = function sum( obj:any ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}

const randomMove = function (obj:any):any {
  var keys = Object.keys(obj)
  return keys[ keys.length * Math.random() << 0];
};

import { connect } from 'react-redux';
import { IRootState } from '../../store';
import { selectEnemyHP, selectStartedBattle } from '../../store/campaign/combat';
import { selectMoveSet, selectPlayerHP } from '../../store/campaign/hero';

/* *************************** */
//      MAP STATE TO PROPS     //
/* *************************** */

interface IMapStateToProps {
  heroMoveSet: IHeroMoveSet,
  enemyHp: number,
  heroHp: number,
  startedBattle: boolean,
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  heroMoveSet: selectMoveSet(state),
  enemyHp: selectEnemyHP(state),
  heroHp: selectPlayerHP(state),
  startedBattle: selectStartedBattle(state),
});

/* *************************** */
//    MAP DISPATCH TO PROPS    //
/* *************************** */

interface IMapDispatchToProps {
  startBattle: () => void;
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	startBattle: () => dispatch(startBattle()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CombatPage);
