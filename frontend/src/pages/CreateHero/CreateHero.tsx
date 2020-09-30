import React, { useState, ChangeEvent } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './CreateHero.css';
import { ImagePreview } from '../../components/Image/ImagePreview';
import { IImages } from '../../../../backend/src/interfaces/images.interface';

export const CreateHero = () => {
  const formik = useFormik({
    initialValues: {
      nickname: '',
      real_name: '',
      origin_description: '',
      superpowers: '',
      catch_phrase: '',
    },
    validationSchema: Yup.object({
      nickname: Yup.string()
        .min(2, 'Must be 8 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Please fill the field'),
      real_name: Yup.string()
        .min(2, 'Must be 8 characters or more')
        .max(20, 'Must be 20 characters or less')
        .required('Please fill the field'),
      origin_description: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(100, 'Must be 20 characters or less')
        .required('Please fill the field'),
      superpowers: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .max(100, 'Must be 15 characters or less')
        .required('Please fill the field'),
      catch_phrase: Yup.string()
        .min(8, 'Must be 2 characters or more')
        .max(50, 'Must be 15 characters or less')
        .required('Please fill the field'),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const [error, setError] = useState('');
  const [files, setFiles] = useState<null | FileList>(null);
  const [onLoad, setOnload] = useState<boolean>(false);
  const [images, setImages] = useState<IImages[]>([]);

  const chooseFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFiles(event.currentTarget.files);
  };

  const upload = () => {
    if (!files) {
      return;
    } else {
      setOnload(true);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        formData.append(`images`, files[i], files[i].name);
      }
      axios
        .post('http://localhost:4000/hero/upload_images', formData)
        .then((res) => {
          console.log(res);
          setImages(res.data.result);
          setOnload(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className="hero has-background-info-light is-fullheight-with-navbar"
      style={{ justifyContent: 'center' }}
    >
      <div className="columns is-centered is-vcentered is-desktop">
        <div className="column is-one-quarter">
          {error ? (
            <div className="notification is-danger is-light">
              <button className="delete" onClick={() => setError('')}></button>
              {`${error}`}
            </div>
          ) : null}
          <div className="box">
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <h4 className="title is-4">Create your hero</h4>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    placeholder="Nickname"
                    className="input"
                    id="nickname"
                    name="nickname"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nickname}
                  />
                  {formik.touched.nickname && formik.errors.nickname ? (
                    <p className="help is-danger">{formik.errors.nickname}</p>
                  ) : null}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    placeholder="Real name"
                    className="input"
                    id="real_name"
                    name="real_name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.real_name}
                  />
                  {formik.touched.real_name && formik.errors.real_name ? (
                    <p className="help is-danger">{formik.errors.real_name}</p>
                  ) : null}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <textarea
                    placeholder="Origin description"
                    className="textarea has-fixed-size"
                    id="origin_description"
                    name="origin_description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.origin_description}
                  />
                  {formik.touched.origin_description &&
                  formik.errors.origin_description ? (
                    <p className="help is-danger">
                      {formik.errors.origin_description}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <textarea
                    placeholder="Superpowers"
                    className="textarea has-fixed-size"
                    id="superpowers"
                    name="superpowers"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.superpowers}
                  />
                  {formik.touched.superpowers && formik.errors.superpowers ? (
                    <p className="help is-danger">
                      {formik.errors.superpowers}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    placeholder="Catch phrase"
                    className="input"
                    id="catch_phrase"
                    name="catch_phrase"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.catch_phrase}
                  />
                  {formik.touched.catch_phrase && formik.errors.catch_phrase ? (
                    <p className="help is-danger">
                      {formik.errors.catch_phrase}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="field is-grouped">
                <div className="file is-small">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="images"
                      multiple
                      onChange={chooseFileHandler}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Choose files</span>
                    </span>
                  </label>
                </div>
                <button
                  className={
                    onLoad ? 'button is-small is-loading' : 'button is-small'
                  }
                  onClick={() => upload()}
                  type="button"
                >
                  Upload
                </button>
              </div>

              <div className="field is-grouped">
                {images.map((img, index) => {
                  return (
                    <ImagePreview
                      public_id={img.public_id}
                      url={img.url}
                      key={index}
                    />
                  );
                })}
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Create hero
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
