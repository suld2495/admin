import styled from './button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  href?: string;
}

export default function Button({ children, href }: ButtonProps) {
  const ButtonType: React.ElementType = href ? 'a' : 'button';

  return (
    <>
      <ButtonType className={styled.button}>{children}</ButtonType>
    </>
  )
}