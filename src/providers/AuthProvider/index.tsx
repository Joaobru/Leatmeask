import { ReactNode, useState, useEffect } from 'react';
import { createContext } from 'use-context-selector';

import { auth, firebase } from '@src/services/firebase';

import { AuthContextType, User } from './types';

export const AuthContext = createContext({} as AuthContextType);

type Prop = {
  children: ReactNode;
};

/**
 * @export
 * @component
 * @name AuthProvider
 *
 * @description
 * Responsável por criar o contexto de autenticação.
 */
export const AuthProvider = ({ children }: Prop) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * @function
   * @name handleCreateRoom
   *
   * @description
   * Responsável por autenticar o usuário com Google e enviar para
   * página de criação de uma sala.
   */
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);

    if (response.user) {
      const { displayName, photoURL, uid } = response.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          signInWithGoogle,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
