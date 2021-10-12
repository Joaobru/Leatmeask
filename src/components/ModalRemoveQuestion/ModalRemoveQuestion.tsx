import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import './styles.scss';
import TrashIcon from '../TrashIcon';
import Button from '../Button';

type Props = {
  open: boolean;
  questionId: string;
  onClose: () => void;
  handleDeleteQuestion: (questionId: string) => Promise<void>;
};

/**
 * @export
 * @component
 * @name ModalRemoveQuestion
 *
 * @description
 * Responsável por montar a Modal de remover uma questão
 */
export const ModalRemoveQuestion = ({
  open,
  questionId,
  onClose,
  handleDeleteQuestion,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={false} center>
      <div className="modal-content">
        <TrashIcon color="#E73F5D" height="48" width="48" />

        <h2>Excluir pergunta</h2>

        <p>Tem certeza que você deseja excluir esta pergunta?</p>

        <div className="group-button">
          <Button onClick={onClose} id="button-cancel">
            Cancelar
          </Button>

          <Button
            id="button-confirmation"
            onClick={() => handleDeleteQuestion(questionId)}
          >
            Sim, excluir
          </Button>
        </div>
      </div>
    </Modal>
  );
};
