import React, { useState, ChangeEvent } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { ImagePreview } from '../components/ImagePreview/ImagePreview';
import { IImages } from '../../../backend/src/interfaces/images.interface';
import { Message } from '../components/Message';

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
        .min(2, 'Must be 2 characters or more')
        .max(50, 'Must be 50 characters or less')
        .required('Please fill the field'),
      real_name: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .max(50, 'Must be 50 characters or less')
        .required('Please fill the field'),
      origin_description: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(100, 'Must be 100 characters or less')
        .required('Please fill the field'),
      superpowers: Yup.string()
        .min(2, 'Must be 2 characters or more')
        .max(100, 'Must be 100 characters or less')
        .required('Please fill the field'),
      catch_phrase: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .max(50, 'Must be 50 characters or less')
        .required('Please fill the field'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (images.length === 0) {
        setMessage({
          type: 'is-danger is-light',
          message: 'You need to upload at least one image',
        });
        return;
      } else {
        return axios
          .post('http://localhost:4000/hero/create_hero', {
            nickname: values.nickname,
            real_name: values.real_name,
            origin_description: values.origin_description,
            superpowers: values.superpowers,
            catch_phrase: values.catch_phrase,
            images: images,
          })
          .then((res) => {
            resetForm({});
            setFiles(null);
            setImages([]);
            setMessage({
              type: 'is-primary is-light',
              message: res.data,
            });
          })
          .catch((err) =>
            setMessage({
              type: 'is-danger is-light',
              message: err.response.data,
            })
          );
      }
    },
  });

  const [error, setError] = useState<string>('');
  const [files, setFiles] = useState<null | FileList>(null);
  const [onLoad, setOnload] = useState<boolean>(false);
  const [images, setImages] = useState<IImages[]>([]);
  const [message, setMessage] = useState<{ type: string; message: string }>();

  console.log('files: ', files);

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

  const filterImages = (value: string) => {
    return setImages((prevState) =>
      prevState.filter((img) => img.public_id !== value)
    );
  };

  return (
    <div
      className="hero has-background-info is-fullheight-with-navbar"
      style={{ justifyContent: 'center' }}
    >
      <div className="columns is-centered is-vcentered is-desktop">
        <div className="column is-one-quarter">
          {message ? (
            <Message type={message.type} message={message.message} />
          ) : null}
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
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      onChange={chooseFileHandler}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="far fa-folder-open"></i>
                      </span>
                      <span className="file-label">Choose files ...</span>
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
                  <span className="icon is-small">
                    <i className="fas fa-cloud-upload-alt"></i>
                  </span>
                  <span>Upload</span>
                </button>
              </div>
              <div className="field is-grouped">
                {images.map((img) => {
                  return (
                    <ImagePreview
                      public_id={img.public_id}
                      url={img.url}
                      key={img.public_id}
                      filterImages={filterImages}
                    />
                  );
                })}
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-danger" type="submit">
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
