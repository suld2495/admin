import React from "react";
import { composeClasses } from "utils/composeClasses";
import Menu, { MenuProps } from "../menu/Menu";
import styled from './navigation.module.scss';


type NavigationProps = MenuProps & {
  position?: 'left' | 'right';
  visible: boolean;
  toggle: (visible: boolean) => void;
};

export default function Navigation({ 
  list,
  className = '', 
  unStyled, 
  position = 'right', 
  visible = true,
  toggle
}: NavigationProps) {
  const navigationClasses = composeClasses(
    className,
    styled.navigation, 
    position === 'left' ? styled.left : styled.right,
    visible ? styled.open: '',
    unStyled ? '' : styled.menu
  );

  return (
    <div className={navigationClasses}>
      <div onClick={() => toggle(false)}>close</div>
      <Menu className={styled.menu} list={list} />
    </div>
  )
}