import { ReactNode } from 'react';
import cx from 'classnames';

import './styles.scss';

type Props = {
  children?: ReactNode;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

/**
 * @export
 * @component
 * @name Question
 *
 * @description
 * Responsável por montar o componente de Questões.
 */
export const Question = ({
  children,
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
}: Props) => {
  return (
    <div
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>

      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={`Foto do(a) ${author.name}`} />
          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  );
};
