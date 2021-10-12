import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

/**
 * @export
 * @component
 * @name Button
 *
 * @description
 * Responsável por montar o componente de botão.
 */

export const Button = ({ isOutlined = false, ...props }: Props) => {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
  );
};
