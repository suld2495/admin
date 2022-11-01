import React from 'react';
import { composeClasses } from '../../../utils/composeClasses';
import { CommonProps } from '../type';
import styled from './select.module.scss';
import Option from './Option';

interface ContextValue {
  value: string;
  open: boolean;
  setValue: (value: ContextValue['value']) => void;
  toggle: (open: ContextValue['open']) => void;
}

const initialValue: ContextValue = {
  value: '',
  open: false,
  setValue() {},
  toggle() {},
};

export const SelectContext = React.createContext(initialValue);

type SelectProps = CommonProps & {
  children?: React.ReactElement<typeof Option>[];
  name: string;
  defaultValue?: string;
}

export default function Select({ 
  children, 
  unStyled = false, 
  className = '', 
  defaultValue = '',
  name 
}: SelectProps) {
  const [value, setValue] = React.useState(defaultValue);
  const [open, toggle] = React.useState(false);
  const selectClasses = composeClasses(className, unStyled ? '' : styled.select, open ? styled.open: '');

  const handleClick = React.useCallback(() => {
    toggle(!open);
  }, [open]);

  return (
    <>
      <SelectContext.Provider value={{ value, setValue, open, toggle }}>
        <div className={selectClasses}>
          <span onClick={handleClick}>{value}</span>
          <div className={styled.options}>
            {children}
          </div>
          <input name={name} defaultValue={value} />
        </div>
      </SelectContext.Provider>
    </>
  )
}

Select.Option = Option;