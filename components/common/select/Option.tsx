import React from 'react';
import { useCallback } from 'react';
import { composeClasses } from 'utils/composeClasses';
import { SelectContext } from './Select';
import styled from './select.module.scss';

interface OptionProps {
  value: string;  
}

export default function Option(props: OptionProps) {
  const { value, setValue } = React.useContext(SelectContext);
  const handleClick = useCallback(() => {
    setValue(props.value);
  }, [setValue, props.value]);
  const classes = composeClasses(styled[props.value === value ? 'active' : ''], styled.option);

  return (
    <div className={classes} onClick={handleClick}>
      { props.value }
    </div>
  );  
}