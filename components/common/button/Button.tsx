import Link from 'next/link';
import React from 'react';
import { composeClasses } from '../../../utils/composeClasses';
import { CommonProps } from '../type';
import styled from './button.module.scss';

type ButtonProps = CommonProps & {
  children?: React.ReactNode;
  href?: string;
  width?: string;
  height?: string;
}

export default function Button({ 
  children, 
  href, 
  unStyled = false, 
  className = '', 
  width = '200px', 
  height = '30px'
}: ButtonProps) {
  const selectClasses = composeClasses(className, unStyled ? '' : styled.button);
  const style = React.useMemo(() => ({ width, height }), [width, height]);
  
  return (
    <>
      {href ? (
        <Link href={href}>
          <a className={selectClasses} style={style}>{children}</a>
        </Link>
      ) : (
        <button className={selectClasses} style={style}>{children}</button>
      )}
    </>
  )
}   