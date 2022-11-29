import Link from "next/link";
import React from "react";
import { composeClasses } from "utils/composeClasses";
import { Menu } from "../menu/Menu";
import { CommonProps } from "../type";
import styled from './dropdownNavigation.module.scss';

const MENU_WIDTH = 1200;

interface MenuProps {
  list: Menu[];
  width?: number;
}

const Menu = ({ list, width }: MenuProps) => {
  return (
    <ul className={styled.menu} style={{ maxWidth: width }}>
      {list.map(({ id, title, link }) => (
        <li key={id}>
          <Link href={link || ''}>{title}</Link>
        </li>
      ))}
    </ul>
  )
}

const Dropdown = React.forwardRef<HTMLDivElement, MenuProps>(({ list, width }, ref) => {
  return (
    <div className={styled.dropdown} ref={ref}>
      <div className={styled.dropdown_container} style={{ maxWidth: width }}>
        {list.map((menu) => (
          <div key={menu.id}>
            <Menu list={menu.children || []} />
          </div>  
        ))}
      </div>
    </div>
  )
});
Dropdown.displayName = 'Dropdown';

type DropdownNavigationProps = CommonProps & {
  list: Menu[];
  width?: number;
};

export default function DropdownNavigation({ className = '', unStyled = false, list, width = MENU_WIDTH }: DropdownNavigationProps) {
  const dropdownClasses = composeClasses(className, unStyled ? '' : styled.dropdownNavigation);
  const ref = React.createRef<HTMLDivElement>();

  const handleMouseEnter = () => {
    ref.current!.style.transform = 'translateY(0)';
  };

  const handleMouseLeave = () => {
    ref.current!.style.transform = 'translateY(-100%)';
  };

  return (
    <div className={dropdownClasses} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={styled.menu_container}>
        <Menu list={list} width={width} />
      </div>
      <Dropdown list={list} width={width} ref={ref} />
    </div>
  )
}