import {
  RECEIVE_VIDEOS
} from '../../../../actions/movies_action';
// import merge from 'lodash/merge';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEOS:
      if (!action.videos.results[0])
        return ['empty'];
      return action.videos.results;
    default:
      return state;
  }
};