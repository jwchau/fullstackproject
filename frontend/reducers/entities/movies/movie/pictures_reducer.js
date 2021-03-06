import {
  RECEIVE_PICTURES
} from '../../../../actions/movies_action';
// import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PICTURES:
      return action.pictures;
    default:
      return state;
  }
};