import React from 'react';
import { TableContext } from '../Table';

export interface Action {
  type: 'removeAll' | 'checkAll' | 'toggleCheck';
  payload?: string[] | string;
}

const reducer = (state: string[], action: Action) => {
  switch (action.type) {
    case 'removeAll':
      return [];
    case 'checkAll': 
      
      if (!Array.isArray(action.payload)) throw Error();
      return [...action.payload];
    case 'toggleCheck':
      const id = action.payload;

      if (typeof id !== 'number') throw Error();

      return state.includes(id)
        ? state.filter((check) => check !== id)
        : [...state, id];
    default:
      throw Error();
  }
}


const useCheckbox = (): [string[], () => void, () => void, (id: string) => void] => {
  const [checkedList, dispatch] = React.useReducer(reducer, []);    
  const { data } = React.useContext(TableContext);

  const onRemoveAllCheck = () => {
    dispatch({ type: 'removeAll' });
  }

  const onCheckAll = React.useCallback(() => {
    dispatch({ type: 'checkAll', payload: data.map(({ id }) => id as string) });
  }, [data]);

  const onToggleCheck = (id: string) => {
    dispatch({ type: 'toggleCheck', payload: id });
  };

  return [checkedList, onCheckAll, onRemoveAllCheck, onToggleCheck];
};

export default useCheckbox;