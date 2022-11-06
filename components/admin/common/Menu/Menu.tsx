import React from 'react';
import Link from "next/link";
import styled from './menu.module.scss';
import { composeClasses } from 'utils/composeClasses';

interface Menu {
  id: number;
  title: string;
  link?: string;
  children?: Menu[];
}

interface MenuProps {
  list: Menu[];
}

const MenuItem = ({ title, link, children }: Menu) => {
  const [active, setActive] = React.useState(false);
  const ref = React.createRef<HTMLUListElement>();
  const toggle = () => {
    if (!ref.current) return;
    

    const ul = ref.current;
    ul.style.height = active ? `${ul.childElementCount * 39}px` : '0';
    ul.style.display = 'block';
    ul.style.transition = 'height .3s ease';
    
    setTimeout(() => {
      ul.style.height = active ? '0' : `${ul.childElementCount * 39}px`;
      setActive(!active);
    });

    ul.addEventListener('transitionend', () => {
      ul.removeAttribute('style');
    }, { once: true });
  }

  return (
    <li className={composeClasses(styled.menu_item, active ?  styled.active : '')}>
      {children && (
        <>
          <span onClick={toggle}>{title}</span>
          <MenuList list={children} ref={ref} />
        </>
      )}

      {!children && (
        <Link href={link!}>{title}</Link>
      )}
    </li>
  )
};

const MenuList = React.forwardRef<HTMLUListElement, { list: Menu[] }>(({ list }, ref) => {
  return (
    <>
      <ul className={styled.menu} ref={ref}>
        {list.map((menuItem) => (
          <MenuItem key={menuItem.id} {...menuItem} />
        ))}
      </ul>
    </>
  )
});
MenuList.displayName = 'MenuList';

export default function Menu({ list }: MenuProps) {
  return (
    <>
      <MenuList list={list} />
    </>
  )
}