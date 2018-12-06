import React, { ChangeEvent } from 'react';

interface IProps {answer: string, handleSetAnswer: (e: ChangeEvent<HTMLInputElement>) => void, options: string[]}

const MultipleChoice: React.FunctionComponent<IProps> = ({answer, handleSetAnswer, options}) => {
  return (
    <>
      {
        options.map((optionValue, index) => (
          <>
            <input type="radio" value={optionValue} key={index} checked={answer === optionValue} onChange={handleSetAnswer}/> {optionValue}<br/>
          </>
        ))
      }
    </>
  );
}

export default MultipleChoice;
