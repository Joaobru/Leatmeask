import { useParams, useHistory, Link } from 'react-router-dom';

import { database } from '@src/services/firebase';
import useRoom from '@src/hooks/useRoom';
import RoomCode from '@components/RoomCode';
import Button from '@components/Button';
import Question from '@components/Question';
import ModalRemoveQuestion from '@components/ModalRemoveQuestion';
import Tooltip from '@components/Tooltip';
import logoImg from '@images/logo.svg';
import deleteImg from '@images/delete.svg';
import checkImg from '@images/check.svg';
import answerImg from '@images/answer.svg';

import './styles.scss';
import { useState } from 'react';
import NoQuestion from '@src/components/NoQuestion';

type RoomParams = {
  id: string;
};

/**
 * @export
 * @component
 * @name AdminRoom
 *
 * @description
 * Responsável por montar a página AdminRoom(Sala do Admin).
 */
export const AdminRoom = () => {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  const [open, setOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  /**
   * @function
   * @name handleShowModal
   *
   * @description
   * Responsável por abrir e fechar a modal de remover pergunta
   */
  const handleShowModal = (questionId?: string) => {
    if (questionId) setCurrentQuestion(questionId);

    setOpen(!open);
  };

  /**
   * @function
   * @name handleEndRoom
   *
   * @description
   * Responsável por encerrar a sala.
   */
  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  };

  /**
   * @function
   * @name handleDeleteQuestion
   *
   * @description
   * Responsável por deletar a pergunta.
   */
  const handleDeleteQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

    setOpen(false);
  };

  /**
   * @function
   * @name handleCheckQuestionAsAnswered
   *
   * @description
   * Responsável por marcar pergunta como respondida
   */
  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  };

  /**
   * @function
   * @name handleHighlighQuestion
   *
   * @description
   * Responsável por dar destaque á pergunta pergunta
   */
  const handleHighlighQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };

  return (
    <>
      <ModalRemoveQuestion
        open={open}
        questionId={currentQuestion}
        onClose={handleShowModal}
        handleDeleteQuestion={handleDeleteQuestion}
      />

      <div id="page-room">
        <header>
          <div className="content">
            <Link to="/">
              <img src={logoImg} alt="Letmeask Logo" />
            </Link>
            <div>
              <RoomCode code={roomId} />

              <Button isOutlined onClick={handleEndRoom}>
                Encerrar sala
              </Button>
            </div>
          </div>
        </header>

        <main>
          <div className="room-title">
            <h1>Sala {title}</h1>

            {questions?.length > 0 && (
              <span>{questions?.length} Pergunta(s)</span>
            )}
          </div>

          {questions.length > 0 && (
            <div className="question-list">
              {questions?.map((question) => (
                <Question
                  key={question?.id}
                  author={question?.author}
                  content={question?.content}
                  isAnswered={question?.isAnswered}
                  isHighlighted={question?.isHighlighted}
                >
                  {!question?.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question?.id)
                        }
                      >
                        <Tooltip text="Marcar como respondida">
                          <img
                            src={checkImg}
                            alt="Marcar pergunta como respondida"
                          />
                        </Tooltip>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleHighlighQuestion(question?.id)}
                      >
                        <Tooltip text="Destacar">
                          <img
                            src={answerImg}
                            alt="Dar destaque á pergunta pergunta"
                          />
                        </Tooltip>
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => handleShowModal(question?.id)}
                  >
                    <Tooltip text="Remover essa pergunta">
                      <img src={deleteImg} alt="Remover pergunta" />
                    </Tooltip>
                  </button>
                </Question>
              ))}
            </div>
          )}

          {questions.length === 0 && (
            <div className="questions-not-found">
              <NoQuestion />
            </div>
          )}
        </main>
      </div>
    </>
  );
};
