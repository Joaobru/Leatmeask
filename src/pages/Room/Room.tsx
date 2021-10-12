import { ChangeEvent, useState, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';

import { database } from '@src/services/firebase';
import useRoom from '@src/hooks/useRoom';
import { useCreate } from '@providers/AuthProvider/useAuth';
import Tooltip from '@components/Tooltip';
import Button from '@components/Button';
import RoomCode from '@components/RoomCode';
import Question from '@components/Question';
import NoQuestion from '@components/NoQuestion';
import LikeIcon from '@components/LikeIcon';
import logoImg from '@images/logo.svg';

import './styles.scss';

type RoomParams = {
  id: string;
};

/**
 * @export
 * @component
 * @name Room
 *
 * @description
 * Responsável por montar a página Room(Sala).
 */

export const Room = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user, signInWithGoogle } = useCreate();
  const { questions, title } = useRoom(roomId);
  const [newQuestion, setNewQuestion] = useState('');

  /**
   * @function
   * @name handleChangeNewQuestion
   *
   * @description
   * Responsável por mudar o valor do input de pergunta.
   */
  const handleChangeNewQuestion = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewQuestion(event.target.value);
  };

  /**
   * @function
   * @name handleSendQuestion
   *
   * @description
   * Responsável por enviar a pergunta para o banco.
   */
  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  };

  /**
   * @function
   * @name handleLikeQuestion
   *
   * @description
   * Responsável por dar like ou remover o like da pergunta.
   */
  const handleLikeQuestion = async (
    questionId: string,
    likeId: string | undefined
  ) => {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  };

  /**
   * @function
   * @name handleLikeQuestion
   *
   * @description
   * Responsável por logar com Google.
   */
  const loginWithGoogle = async () => {
    await signInWithGoogle();
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Link to="/">
            <img src={logoImg} alt="Letmeask Logo" />
          </Link>
          <RoomCode code={roomId} />
        </div>
      </header>

      <main id="container-content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={handleChangeNewQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={`Foto do${user.name}`} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{' '}
                <button onClick={loginWithGoogle}>
                  faça seu login com Google.
                </button>
              </span>
            )}
            <Button type="submit" disabled={!user} id="submit-question">
              Enviar Pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              author={question.author}
              content={question.content}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <button
                  className={`like-button ${question.likeId ? 'liked' : ''}`}
                  type="button"
                  aria-label="Marcar como gostei"
                  onClick={() =>
                    handleLikeQuestion(question.id, question.likeId)
                  }
                >
                  <Tooltip text="Gostei">
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <LikeIcon />
                  </Tooltip>
                </button>
              )}
            </Question>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="no-questions">
            <NoQuestion />
          </div>
        )}
      </main>
    </div>
  );
};
