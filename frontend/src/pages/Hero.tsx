import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { IImages } from '../../../backend/src/interfaces/images.interface';
import { ImagePreview } from '../components/ImagePreview/ImagePreview';

export const Hero = () => {
  const { hero_id }: { hero_id: string } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/hero/get_hero/${hero_id}`)
      .then((res) => {
        setImages(res.data.images);
        setHeroInfo({
          nickname: res.data.nickname,
          origin_description: res.data.origin_description,
          real_name: res.data.real_name,
          superpowers: res.data.superpowers,
          catch_phrase: res.data.catch_phrase,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const [heroInfo, setHeroInfo] = useState<{
    nickname: string;
    origin_description: string;
    real_name: string;
    superpowers: string;
    catch_phrase: string;
  }>();
  const [images, setImages] = useState<IImages[]>([]);

  const filterImages = (value: string) => {
    return setImages((prevState) =>
      prevState.filter((img) => img.public_id !== value)
    );
  };

  return (
    <div className="hero has-background-info is-fullheight-with-navbar">
      <div className="columns m-2">
        <div className="column is-one-fifth">
          <div className="box">
            <h2 className="subtitle">Pictures</h2>
            <div className="is-flex" style={{ flexDirection: 'column' }}>
              {images.map((img) => {
                return (
                  <ImagePreview
                    public_id={img.public_id}
                    url={img.url}
                    filterImages={filterImages}
                    key={img.public_id}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <h2 className="subtitle">Hero profile</h2>
            <div className="block">
              <strong>Nickname: </strong>
              {heroInfo?.nickname}
            </div>
            <div className="block">
              <strong>Real Name: </strong>
              {heroInfo?.real_name}
            </div>
            <div className="block">
              <strong>Origin descruption: </strong>
              {heroInfo?.origin_description}
            </div>
            <div className="block">
              <strong>Superpowers: </strong>
              {heroInfo?.superpowers}
            </div>
            <div className="block">
              <strong>Catch phrase: </strong>
              {heroInfo?.catch_phrase}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
