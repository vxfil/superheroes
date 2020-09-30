import React from 'react';

type MessageProps = {
  type: string;
  message: string;
};

export const Message: React.FC<MessageProps> = ({ type, message }) => {
  return (
    <div className={`notification ${type}`}>
      <button className="delete"></button>
      {message}
    </div>
  );
};
