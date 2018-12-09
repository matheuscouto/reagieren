import React, { useState, FormEvent, useEffect } from 'react';
import { IMoveSet, IWord } from '../../declarations';
import { ArtikelAttack } from '../';
import {mockDictionary, mockWordings} from './mockQuestions';

interface IProps {
  nextMoveCategory: IMoveSet;
}

const Question:React.FunctionComponent<IProps & IMapDispatchToProps & IMapStateToProps> = ({attack, nextMoveCategory, selectedMoves}) => {
  const currentMoveId = selectedMoves[nextMoveCategory][0];
  const [attackEffectiveness, setAttackEffectiveness] = useState<boolean>(false);
  useEffect(() => {
    setNextMove(mockDictionary[currentMoveId])
  },[selectedMoves])
  const [currentMove, setNextMove] = useState<IWord | undefined>(undefined);

  const handleAttack = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(currentMove) {
      attack('artikel', attackEffectiveness, currentMoveId, nextMoveCategory);
    }
  }

  const renderAnswer = () => {
    if(currentMove) 
      switch(nextMoveCategory) {
        case 'artikel':
          return <ArtikelAttack word={currentMove} setAttackEffectiveness={setAttackEffectiveness} />
        default:
          return null;
        // case 'open':
        // //   return <OpenAnswer answer={answer[0]} handleSetAnswer={handleSetAnswer(true)} />
        // // case 'pick-multiple-words':
        // //   return <PickMultipleWordsAnswer answer={answer} options={question.options} handleSetAnswer={handleSetAnswer(false)} />
        // case 'complete':
      }
    return null
  }

  return (
    <form onSubmit={handleAttack}>
      <p>{mockWordings[nextMoveCategory]}</p>
      {
        renderAnswer()
      }
      <button type="submit">Responder</button>
    </form>
  )
}

const randomWord = function (obj:any) {
  var keys = Object.keys(obj)
  return obj[keys[ keys.length * Math.random() << 0]];
};

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { attack } from '../../store/campaign/combat';
import { selectSelectedMoves } from '../../store/campaign/hero';
import { IRootState } from '../../store';

/* *************************** */
//      MAP STATE TO PROPS     //
/* *************************** */

interface IMapStateToProps {
  selectedMoves: {[moveCategory: string]: string[]},
};

const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  selectedMoves: selectSelectedMoves(state),
});

/* *************************** */
//    MAP DISPATCH TO PROPS    //
/* *************************** */

interface IMapDispatchToProps {
  attack: (move: IMoveSet, attackSuccess: boolean, moveId: string, moveCategory: string) => void;
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => ({
	attack: (move, attackSuccess, moveId, moveCategory) => dispatch(attack({move, attackSuccess, moveId, moveCategory})),
})

export default connect(mapStateToProps, mapDispatchToProps)(Question);