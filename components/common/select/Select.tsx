import React from 'react';
import { composeClasses } from '../../../utils/composeClasses';
import { CommonProps } from '../type';
import styled from './select.module.scss';
import Option from './Option';

interface ContextValue {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<ContextValue['value']>>;
}

const initialValue: ContextValue = {
  value: '',
  setValue() {}
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
  const selectClasses = composeClasses(className, unStyled ? '' : styled.select);

  return (
    <>
      <SelectContext.Provider value={{ value, setValue }}>
        <div className={selectClasses}>
          <span>{value}</span>
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