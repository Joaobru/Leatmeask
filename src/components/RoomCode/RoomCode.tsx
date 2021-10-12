import copyImg from '@images/copy.svg';

import './styles.scss';

type Props = {
  code: string;
};

/**
 * @export
 * @component
 * @name RoomCode
 *
 * @description
 * Responsável por montar o componente de código da sala.
 */
export const RoomCode = ({ code }: Props) => {
  /**
   * @function
   * @name copyRoomCodeToClipboard
   *
   * @description
   * Responsável por copiar o código da sala.
   */
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar o código da sala" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
};
