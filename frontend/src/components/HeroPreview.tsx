import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

type HeroPreviewProps = {
  nickname: string;
  image: string;
  heroId: string;
};

export const HeroPreview: React.FC<HeroPreviewProps> = ({
  nickname,
  image,
  heroId,
}) => {
  return (
    <div className="card mb-2">
      <div className="card-image">
        <figure className="image is-5by4">
          <img src={image} alt="image" />
        </figure>
      </div>
      <div className="card-content">
        <div
          className="content is-flex"
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <strong>{nickname}</strong>
          <Link to={`/hero/${heroId}`} className="button is-small is-danger">
            About hero ...
          </Link>
        </div>
      </div>
    </div>
  );
};
