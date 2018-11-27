export const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY';

export const setActiveCategory = (category) => {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload: category
  }
};
