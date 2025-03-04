import supabase from '../supabase/client';

export const getUsers = async () => {};

export const login = async ({ id, password }) => {
  // 로그인
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: id,
    password,
  });

  if (loginError) {
    return { user: null, error: loginError };
  }
  const { error: loginUserError } = await getUserByUUID(loginData.user.id);
  return { error: null, loginUserError };
};

export const getUserByUUID = async (uuid) => {
  const res = await supabase.from('users').select('*').eq('id', uuid).maybeSingle();

  return res;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};

export const registerUser = async ({ email, id, password, nickname, profile_img }) => {
  // 회원 가입
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return { user: null, error: signUpError };
  }
  // 프로필 이미지 저장
  let profile_img_path = null;
  if (profile_img) {
    const { data } = await uploadProfileImage(profile_img);
    profile_img_path = `${import.meta.env.VITE_APP_SUPABASE_URL}/storage/v1/object/public/profile-img/${data.path}`;
  }
  // 추가 정보 저장
  const { data: insertData, error: insertError } = await supabase
    .from('users')
    .insert([{ id: signUpData.user.id, user_id: id, nickname, profile_img_path }]);

  if (insertError) {
    return { user: null, error: insertError };
  }

  return { user: insertData, error: null };
};

export const uploadProfileImage = async (img) => {
  const data = await supabase.storage.from('profile-img').upload(`${Date.now()}${img.name}`, img);
  return data;
};

export const getUserById = async (id) => {
  const { data, error } = await supabase.from('users').select('*').eq('user_id', id).maybeSingle();

  return { data, error };
};

export const getUserByNickName = async (nickname) => {
  const { data, error } = await supabase.from('users').select('*').eq('nickname', nickname).maybeSingle();

  return { data, error };
};

export const updateUser = async (userId, updatedData) => {
  const { data: currentData, error: fetchError } = await supabase
    .from('users')
    .select('nickname, profile_img_path')
    .eq('id', userId)
    .single();

  // 변경된 데이터만 업데이트
  const updatePayload = {};
  if (updatedData.nickname && updatedData.nickname !== currentData.nickname) {
    updatePayload.nickname = updatedData.nickname;
  }
  if (updatedData.profile_img_path && updatedData.profile_img_path !== currentData.profile_img_path) {
    updatePayload.profile_img_path = updatedData.profile_img_path;
  }

  if (Object.keys(updatePayload).length === 0) {
    return { error: null };
  }

  // 변경 사항이 있는 경우에만 업데이트 실행
  const { data, error } = await supabase
    .from('users')
    .update(updatePayload)
    .eq('id', userId)
    .select('*');

  if (error) {
    return { error };
  }
  return { data };
};

export const deleteUser = async () => {};
