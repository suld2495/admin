import styled from './title.module.scss';

interface TitleProps {
  children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
  return (
    <h1 className={styled.title}>{children}</h1>
  )
}