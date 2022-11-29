import Menu from '../../common/menu/Menu';
import styled from './navibar.module.scss';

export default function Navibar() {
  const menuList = [
    {
      id: 1,
      title: '메인 메뉴1',
      children: [
        {
          id: 2,
          title: '서브 메뉴1',
          children: [
            {
              id: 4,
              title: '서브 서브 메뉴1',
              link: '서브 링크1',
            }
          ]
        },
        {
          id: 3,
          title: '서브 메뉴2',
          link: '서브 링크2',
        }
      ]
    },
    {
      id: 5,
      title: '메인 메뉴2',
      link: 'test'
    }
  ];

  return (
    <nav className={styled.nav}>
      <div>
        <div className={styled.empty}></div>
        <Menu list={menuList} />
        <div className={styled.logout}>로그아웃</div>
      </div>
    </nav>
  )
}