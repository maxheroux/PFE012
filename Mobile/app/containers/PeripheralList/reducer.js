// @flow
import {find, map } from 'lodash';
import * as Constants from './constants';
import { filter } from 'lodash';

export type Item = {
  itemId: number,
  isSelected: boolean
}

type List = {
  listId: string,
  items: Array<Item>,
  isInSelectionMode: bool
}

type State = {
  lists: Array<List>
}

const initialState: State = {
  lists: []
};

export default function peripheralListReducer(state: State = initialState, action: any) {
  let otherLists: Array<List> = [];
  let selectedList: List = {};
  if(Object.values(Constants).includes(action.type)){
    otherLists = filter(state.lists, list => list.listId != action.listId);
    selectedList = find(state.lists, list => list.listId == action.listId);
  }

  switch (action.type) {
    case Constants.toggleSelected:
      const otherItems = filter(selectedList.items, item => item.itemId != action.itemId);
      const selectedItem = find(selectedList.items, item => item.itemId == action.itemId);
      return {
        ...state,
        lists: [
          ...otherLists,
          {
            ...selectedList,
            items: [
              ...otherItems,
              {
                itemId: selectedItem.itemId,
                isSelected: !selectedItem.isSelected
              }
            ]
          }
        ]
      };
    case Constants.selectAll:
      return {
        ...state,
        lists: [
          ...otherLists,
          {
            ...selectedList,
            items: map(selectedList.items, (item) => ({
              itemId: item.itemId,
              isSelected: true
            }))
          }
        ]
      };
    case Constants.selectNone:
      return {
        ...state,
        lists: [
          ...otherLists,
          {
            ...selectedList,
            items: map(selectedList.items, (item) => ({
              itemId: item.itemId,
              isSelected: false
            }))
          }
        ]
      };
    case Constants.enterSelectionMode:
      let items = [];
      for(let i = 0; i < action.nbItems; i++){
        items.push({
          itemId: i,
          isSelected: false
        })
      }

      return {
        ...state,
        lists: [
          ...otherLists,
          {
            listId: action.listId,
            isInSelectionMode: true,
            items
          }
        ]
      };
    case Constants.exitSelectionMode:
      return {
        ...state,
        lists: [
          ...otherLists,
          {
            listId: action.listId,
            isInSelectionMode: false,
            items: []
          }
        ]
      };
    default:
      return state;
  }
}
