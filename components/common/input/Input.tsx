import React from 'react';
import { composeClasses } from 'utils/composeClasses';
import { CommonProps } from '../type';
import styled from './input.module.scss';

type InputProps = CommonProps & {
  width?: string;
  height?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  type?: 'text' | 'password';
  onChange?: React.ChangeEventHandler;
}

export default function Input({
  width,
  height,
  name,
  placeholder,
  value,
  className = '',
  unStyled,
  onChange,
  type = 'text'
}: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const inputClasses = composeClasses(className, unStyled ? '' : styled.input, focus ? styled.focus : '');
  const style = React.useMemo(() => ({ width, height }), [width, height]);

  return (
    <div className={inputClasses} style={style}>
      {value ? '' : <div className={styled.placeholder}>{placeholder}</div>}
      <input 
        value={value} 
        name={name} 
        type={type} 
        onChange={onChange} 
        onFocus={() => setFocus(true)} 
        onBlur={() => setFocus(false)}
      />
    </div>
  )
}