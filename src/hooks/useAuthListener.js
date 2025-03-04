import { useEffect } from 'react';
import supabase from '../supabase/client';
import useAuthStore from '../zustand/authStore';
import { getUserByUUID } from '../api/supabaseUsersAPI';

const AUTH_EVENTS = {
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
  TOKEN_REFRESHED: 'TOKEN_REFRESHED',
  USER_UPDATED: 'USER_UPDATED',
};

const useAuthListener = () => {
  const setLogin = useAuthStore((state) => state.setLogin);
  const setLogout = useAuthStore((state) => state.setLogout);
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === AUTH_EVENTS.SIGNED_IN && session?.user) {
        getUserByUUID(session.user.id).then((res) => {
          setLogin(res.data, session.access_token);
        });
      } else if (event === AUTH_EVENTS.SIGNED_OUT) {
        setLogout();
      }
      if (event === AUTH_EVENTS.TOKEN_REFRESHED) {
        // 토큰이 갱신되었을 때
        const newAccessToken = session?.access_token;
        setToken(newAccessToken);
      }
      if (event === AUTH_EVENTS.USER_UPDATED) {
        // 유저 정보가 업데이트 되었을 때
      }
    });
    return () => {
      authListener.subscription.unsubscribe(); // 클린업
    };
  }, [setLogin, setLogout, setToken]);
};

export default useAuthListener;
