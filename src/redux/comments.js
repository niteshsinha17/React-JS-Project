import * as ActionTypes from "./ActionTypes";

export const Comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      return { ...state, comments: state.comments.concat(comment) };

    case ActionTypes.ADD_NEW_COMMENT:
      var new_comment = action.payload;
      new_comment.id = state.comments.length;
      return { ...state, comments: state.comments.concat(new_comment) };

    default:
      return state;
  }
};
