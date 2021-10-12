import { FormEvent, useState, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { database } from '@src/services/firebase';
import { useCreate } from '@providers/AuthProvider/useAuth';
import Button from '@components/Button';
import illustrationImg from '@images/illustration.svg';
import logoImg from '@images/logo.svg';

import './styles.scss';

/**
 * @export
 * @component
 * @name NewRoom
 *
 * @description
 * Responsável por montar a página NewRoom(Nova Sala).
 */

export const NewRoom = () => {
  const { user } = useCreate();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  /**
   * @async
   * @function
   * @name handleCreateRoom
   *
   * @description
   * Responsável por criar a sala.
   */
  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();

    if ([newRoom.trim()].includes('')) {
      return;
    }

    const roomRef = await database.ref('rooms');

    const firebaseRoom = roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  };

  /**
   * @function
   * @name handleChangeName
   *
   * @description
   * Responsável por mudar o estado do nome da sala".
   */
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setNewRoom(event.target.value);
  };

  return (
    <div id="page-new-room">
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={handleChangeName}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
