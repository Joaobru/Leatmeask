import { ReactNode } from 'react';

import './styles.scss';

type Props = {
  children?: ReactNode;
  text: string;
};

export const Tooltip = ({ children, text }: Props) => {
  return (
    <div className="tooltip">
      {children}
      <h4 className="tooltip-text">{text}</h4>
    </div>
  );
};
