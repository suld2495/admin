import React from 'react';
import { composeClasses } from 'utils/composeClasses';
import { CommonProps } from '../type';
import styled from './input.module.scss';

type InputProps = CommonProps & {
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler;
}

export default function Input({
  name,
  placeholder,
  value,
  className = '',
  unStyled,
  onChange
}: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const inputClasses = composeClasses(className, unStyled ? '' : styled.input, focus ? styled.focus : '');
  const handleFocus = React.useCallback(() => {
    setFocus(true);
  }, []);
  const handleBlur = React.useCallback(() => {
    setFocus(false);
  }, []);
  return (
    <div className={inputClasses}>
      {value ? '' : <div className={styled.placeholder}>{placeholder}</div>}
      <input value={value} name={name} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} />
    </div>
  )
}