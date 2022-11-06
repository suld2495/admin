import styled from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styled.footer}>
      <div className={styled.copyright}>COPYRIGHTS(C)2022.ALL RIGHTS RESERVED.</div>
      <div>
        <div>
          <span>긴급지원</span>
          <div>
            <span>1234-5678</span>
            <span>02-1234-5678</span>
          </div>
        </div>
        <div>원격지원 </div>
      </div>
    </footer>
  )
}