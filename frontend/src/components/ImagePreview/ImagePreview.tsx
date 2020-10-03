import React, { MouseEvent, useState } from 'react';

import './ImagePreview.css';
import axios from 'axios';

type ImagePreviewProps = {
  public_id: string;
  url: string;
  filterImages: Function;
};
export const ImagePreview: React.FC<ImagePreviewProps> = ({
  public_id,
  url,
  filterImages,
}) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const deleteImageHandler = (event: MouseEvent) => {
    const id = event.currentTarget.id;
    filterImages(id);
    setIsDeleted(true);
  };

  return (
    <div className={`container ${isDeleted ? 'is-hidden' : ''}`}>
      <figure className="image back-element">
        <img src={url} />
      </figure>
      <a
        id={public_id}
        className="delete front-element"
        onClick={(event) => deleteImageHandler(event)}
      ></a>
    </div>
  );
};
