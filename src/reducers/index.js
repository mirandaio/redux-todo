import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

// We rename the idsByFilter reducer to listByFilter,
// because now that the list implementation is in a
// separate file, we consider its state structure to be
// opaque and to get the list of ids, we use the getIds
// selector that it exports.
// Since we also moved the byId reducer into a separate
// file, we also don't want to make the assumption that
// it's just a look up table, so we use the fromById.getTodo
// selector that it exports and pass its state and the
// corresponding id. This lets us change the state shape
// of any reducer in the future without rippling changes
// across the codebase.

// const idsByFilter = combineReducers({
const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
});

const todos = combineReducers({
  byId,
  // idsByFilter
  listByFilter
});

export const getVisibleTodos = (state, filter) => {
  //const ids = state.idsByFilter[filter];
  const ids = fromList.getIds(state.listByFilter[filter]);
  // return ids.map(id => state.byId[id];
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);

export default todos;
