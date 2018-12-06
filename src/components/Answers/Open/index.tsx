import React, { ChangeEvent } from 'react';

interface IProps {answer: string, handleSetAnswer: (e: ChangeEvent<HTMLInputElement>) => void}

const Open: React.FunctionComponent<IProps> = ({answer, handleSetAnswer}) => {
  return (
    <input value={answer} onChange={handleSetAnswer} />
  );
}

export default Open;
