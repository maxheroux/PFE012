import * as Constants from './constants';

export const toggleSelected = (listId, itemId) => ({
  type: Constants.toggleSelected,
  listId,
  itemId
});
export const selectAll = (listId) => ({
  type: Constants.selectAll,
  listId
});
export const selectNone = (listId) => ({
  type: Constants.selectNone,
  listId
});
export const enterSelectionMode = (listId, nbItems) => ({
  type: Constants.enterSelectionMode,
  listId,
  nbItems
});
export const exitSelectionMode = (listId) => ({
  type: Constants.exitSelectionMode,
  listId
});
