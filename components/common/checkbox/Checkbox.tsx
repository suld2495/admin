import React, { useEffect } from 'react';
import { composeClasses } from 'utils/composeClasses';
import styled from './checkbox.module.scss';

interface CheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ checked = false, onChange }: CheckboxProps) {
  const [check, setCheck] = React.useState(checked);

  useEffect(() => {
    setCheck(checked);
  }, [checked]);

  const handleChange = () => {
    setCheck(!check);
    onChange(!check);
  };

  return (
    <label
      className={composeClasses(styled.checkbox, check ? styled.check : '')}
    >
      <input type="checkbox" checked={check} onChange={handleChange} />
    </label>
  )
};