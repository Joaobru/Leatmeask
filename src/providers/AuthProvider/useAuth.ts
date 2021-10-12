import { useContextSelector } from 'use-context-selector';

import { AuthContext } from './';
import { AuthContextType } from './types';
/**
 * @export
 * @hook
 * @name useCreate
 *
 * @description
 * Responsável por conter todos os estado e eventos.
 */
export const useCreate = (): AuthContextType => {
  const signInWithGoogle = useContextSelector(
    AuthContext,
    (create) => create.signInWithGoogle
  );

  const user = useContextSelector(AuthContext, (create) => create.user);

  return {
    signInWithGoogle,
    user,
  };
};
