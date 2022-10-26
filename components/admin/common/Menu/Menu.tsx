import Link from "next/link";
import styled from './menu.module.scss';

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
  return (
    <li className={styled.menu_item}>
      {children && (
        <>
          <span>{title}</span>
          <MenuList list={children} />
        </>
      )}

      {children && (
        <Link href={link!}>{title}</Link>
      )}
    </li>
  )
};

const MenuList = ({ list }: { list: Menu[] }) => {
  return (
    <>
      <ul className={styled.menu}>
        {list.map((menuItem) => (
          <MenuItem key={menuItem.id} {...menuItem} />
        ))}
      </ul>
      
    </>
  )
}

export default function Menu({ list }: MenuProps) {
  return (
    <>
      <MenuList list={list} />
    </>
  )
}