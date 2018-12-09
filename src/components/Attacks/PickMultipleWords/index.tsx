import React, { ChangeEvent } from 'react';

interface IProps {answer: string[], handleSetAnswer: (e: ChangeEvent<HTMLInputElement>) => void, options: string[]}

const PickMultipleWords: React.FunctionComponent<IProps> = ({answer, handleSetAnswer, options}) => {
  return (
    <>
      {
        options.map((optionValue, index) => (
          <div key={index}>
            <input type="checkbox" value={optionValue} checked={answer.indexOf(optionValue) !== -1} onChange={handleSetAnswer}/> {optionValue}<br/>
          </div>
        ))
      }
    </>
  );
}

export default PickMultipleWords;
