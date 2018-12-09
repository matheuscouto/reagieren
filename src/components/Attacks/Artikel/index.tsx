import React, { ChangeEvent, useState, useEffect } from 'react';
import { IWord } from '../../../declarations';

interface IProps {
  setAttackEffectiveness: (effectiveness: boolean) => void,
  word: IWord
}

const ArtikleList = ['der', 'die', 'das']

const MultipleChoice: React.FunctionComponent<IProps> = ({word, setAttackEffectiveness}) => {
  
  const [answer, setAnswer] = useState<string>('');
  const handleSetAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    calculateAttackEffectiveness(e.target.value);
  }

  useEffect(() => {
    setAnswer('')
  },[word])

  const calculateAttackEffectiveness = (attack: string) => {
    setAttackEffectiveness(word.article === attack);
  }

  return (
    <>
      <p>___ {word.word}</p>
      {
        ArtikleList.map((artikle, index) => (
          <div key={index}>
            <input type="radio" value={artikle} checked={answer === artikle} onChange={handleSetAnswer}/> {artikle}<br/>
          </div>
        ))
      }
    </>
  );
}

export default MultipleChoice;
