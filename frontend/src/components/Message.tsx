import React, { useState } from 'react';

type MessageProps = {
  type: string;
  message: string;
};

export const Message: React.FC<MessageProps> = ({ type, message }) => {
  const [closeIsClicked, setCloseIsClicked] = useState<boolean>(false);
  return (
    <div
      className={`notification ${type} ${closeIsClicked ? 'is-hidden' : ''}`}
    >
      <button
        className="delete"
        onClick={() => setCloseIsClicked((prevState) => !prevState)}
      ></button>
      {message}
    </div>
  );
};
