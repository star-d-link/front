import apiClient from "./apiClient";

// 이메일 전송
export const sendEmail = async (email) => {
  const response = await apiClient.post("/users/send-email", { email });
  return response;
};

// 이메일 인증
export const verifyEmail = async (email, verificationCode) => {
  const response = await apiClient.post("/users/verify-email", {
    email,
    verificationCode,
  });
  return response;
};

// 회원가입
export const registerUser = async (userData) => {
  const response = await apiClient.post("/users/register", userData);
  return response;
};

// 비밀번호 찾기
export const resetPassword = async (email, newPassword) => {
  const response = await apiClient.put("/users/reset-password", {
    email,
    newPassword,
  });
  return response;
};
