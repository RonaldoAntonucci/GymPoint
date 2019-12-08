import produce from 'immer';

const INITIAL_STATE = {
  page: 1,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@students/UPDATE_PAGE': {
        draft.page = action.payload;
        break;
      }
      default:
    }
  });
}
