import React from 'react';

import './ImagePreview.css';
import { IImages } from '../../../../backend/src/interfaces/images.interface';

export const ImagePreview: React.FC<IImages> = ({ public_id, url }) => {
  return (
    <div className="container">
      <figure className="image is-128x128 back-element">
        <img src={url} alt={public_id} />
      </figure>
      <a className="delete front-element"></a>
    </div>
  );
};
