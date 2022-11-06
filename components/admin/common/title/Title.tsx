import styled from './title.module.scss';

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return (
    <h1 className={styled.title}>{title}</h1>
  )
}