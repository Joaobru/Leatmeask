import React from 'react';

import emptyQuestions from '@images/empty-questions.svg';

/**
 * @export
 * @component
 * @name NoQuestion
 *
 * @description
 * Responsável por montar a mensagem de quando não
 * forem encontradas perguntas.
 */
export const NoQuestion = () => {
  return (
    <>
      <img src={emptyQuestions} alt="Nenhuma pergunta encontrada" />

      <h2>Nenhuma pergunta por aqui...</h2>

      <p>
        Envie o código desta sala para seus amigos e comece a responder
        perguntas!
      </p>
    </>
  );
};
