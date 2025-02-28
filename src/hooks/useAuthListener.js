import { useEffect } from 'react';
import supabase from '../supabase/client';
import useAuthStore from '../zustand/authStore';
import { getUserByUUID } from '../api/supabaseUsersAPI';

const useAuthListener = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const setLogout = useAuthStore((state) => state.setLogout);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        getUserByUUID(session.user.id).then((res) => {
          setLogin(res.data);
        });
      } else if (event === 'SIGNED_OUT') {
        setLogout();
      }
    });
    return () => {
      authListener.subscription.unsubscribe(); // 클린업
    };
  }, [setLogin, setLogout]);
};

export default useAuthListener;
