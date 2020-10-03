import React, { useState } from 'react';

import { Pagination } from '../components/Pagination';
import { IHero } from '../../../backend/src/interfaces/hero.interface';
import { HeroPreview } from '../components/HeroPreview';

export const Heroes = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);

  const getHeroes = (value: IHero[]) => {
    return setHeroes(value);
  };

  return (
    <div className="hero has-background-info is-fullheight-with-navbar">
      <div className="columns is-centered is-vcentered is-desktop mt-2">
        <div className="column is-2">
          {heroes.map((hero) => {
            return (
              <HeroPreview
                nickname={hero.nickname}
                image={hero.images[0].url}
                heroId={hero._id}
                key={hero._id}
              />
            );
          })}
        </div>
      </div>
      <Pagination
        apiEndPoint={'http://localhost:4000/hero/get_heroes'}
        page={1}
        limit={5}
        getHeroes={getHeroes}
      />
    </div>
  );
};
