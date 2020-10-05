import defaultAxios from 'axios';

const axios = defaultAxios.create({
  baseURL: 'http://localhost:4000/',
  headers: { 'Content-Type': 'application/json' },
});

export const getAllHeroes = async () => {
  try {
    const response = await axios.get('hero/get_heroes?p=1&l=5');
    return response.data.heroes;
  } catch (err) {
    console.error(err);
  }
};
