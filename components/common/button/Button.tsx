import Link from 'next/link';
import React from 'react';
import { composeClasses } from '../../../utils/composeClasses';
import { CommonProps } from '../type';
import styled from './button.module.scss';

type ButtonProps = CommonProps & {
  children?: React.ReactNode;
  href?: string;
}

export default function Button({ children, href, unStyled = false, className = '' }: ButtonProps) {
  const selectClasses = composeClasses(className, unStyled ? '' : styled.button);
  
  return (
    <>
      {href ? (
        <Link href={href}>
          <a className={selectClasses}>{children}</a>
        </Link>
      ) : (
        <button className={selectClasses}>{children}</button>
      )}
    </>
  )
}   