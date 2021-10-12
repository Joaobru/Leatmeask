import { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { database } from '@src/services/firebase';
import { useCreate } from '@providers/AuthProvider/useAuth';
import Button from '@components/Button';
import illustrationImg from '@images/illustration.svg';
import logoImg from '@images/logo.svg';
import googleIconImg from '@images/google-icon.svg';

import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

/**
 * @export
 * @component
 * @name Home
 *
 * @description
 * Responsável por montar a página Home.
 */

export const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useCreate();
  const [roomCode, setRoomCode] = useState('');

  /**
   * @function
   * @name handleCreateRoom
   *
   * @description
   * Responsável por autenticar o usuário e enviar para página de
   * criação de uma sala.
   */
  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  };

  /**
   * @function
   * @name handleJoinRoom
   *
   * @description
   * Responsável redirecionar o usuário para sala.
   */
  const handleJoinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if ([roomCode.trim()].includes('')) {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.dark('Essa sala não existe.');
      return;
    }

    if (roomRef.val().endedAt) {
      toast.dark('Essa sala já foi fechada.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  };

  /**
   * @function
   * @name handleChangeCode
   *
   * @description
   * Responsável por mudar o valor do código da sala.
   */
  const handleChangeCode = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomCode(event.target.value);
  };

  return (
    <>
      <ToastContainer />

      <div id="page-auth">
        <aside>
          <img
            src={illustrationImg}
            alt="Ilustração simbolizando perguntas e respostas"
          />
          <h1>Crie salas de Q&amp;A ao-vivo</h1>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </aside>

        <main>
          <div className="main-content">
            <img src={logoImg} alt="Letmeask" />
            <button onClick={handleCreateRoom} className="create-room">
              <img src={googleIconImg} alt="Logo do Google" />
              Crie sua sala com o Google
            </button>
            <div className="separator">ou entre em uma sala</div>
            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Digite o código da sala"
                onChange={handleChangeCode}
                value={roomCode}
              />
              <Button type="submit">Entrar na sala</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};
