import { SET_LOADING, GET_HEROES } from '../actions/heroActions';

const initialState = {
  loading: false,
  heroes: [],
};

export const heroReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_HEROES:
      return {
        ...state,
        heroes: payload,
        loading: false,
      };
    default:
      return state;
  }
};
