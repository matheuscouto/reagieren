import React, { useState, ChangeEvent } from 'react';

const MultipleChoice: React.FunctionComponent = () => {

  const [answer, setAnswer] = useState('');
  const handleSetAnswer = (e: ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)
  
  return (
    <>
      <input type="radio" name="gender" value="a" checked={answer === 'a'} onChange={handleSetAnswer}/> Male<br/>
      <input type="radio" name="gender" value="b" checked={answer === 'b'} onChange={handleSetAnswer}/> Female<br/>
      <input type="radio" name="gender" value="c" checked={answer === 'c'} onChange={handleSetAnswer}/> Other
    </>
  );
}

export default MultipleChoice;
