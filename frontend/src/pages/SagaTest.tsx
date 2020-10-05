import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_HEROES_REQUESTED } from '../redux/actions/heroActions';
import { IHero } from '../../../backend/src/interfaces/hero.interface';
import { HeroPreview } from '../components/HeroPreview';

interface HeroState {
  heroReducer: {
    loading: boolean;
    heroes: Array<IHero>;
  };
}

export const SagaTest = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: HeroState) => state.heroReducer.loading
  );
  const heroes = useSelector((state: HeroState) => state.heroReducer.heroes);

  return (
    <div className="hero has-background-info is-fullheight-with-navbar">
      <div className="columns is-centered is-vcentered is-desktop mt-2">
        <div className="column is-2">
          <h1 className="title">Saga Test</h1>
          <button
            className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
            onClick={() => dispatch({ type: GET_HEROES_REQUESTED })}
          >
            Fetch heroes
          </button>
          {heroes.map((hero) => {
            return (
              <HeroPreview
                nickname={hero.nickname}
                image={hero.images[0].url}
                heroId={hero._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
