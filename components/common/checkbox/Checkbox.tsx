import React from 'react';
import { composeClasses } from 'utils/composeClasses';
import styled from './checkbox.module.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ checked = false, onChange }: CheckboxProps) {
  const [check, setCheck] = React.useState(checked);

  const handleChange = () => {
    setCheck(!check);
    onChange(!check);
  };

  return (
    <label
      className={composeClasses(styled.checkbox, check ? styled.check : '')}
      onChange={handleChange}
    >
      <input type="checkbox" checked={check} />
    </label>
  )
};