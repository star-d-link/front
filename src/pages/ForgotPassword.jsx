import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword, sendEmail, verifyEmail } from "../js/authApi"; // API 호출 함수

const ForgotPassword = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSendCode = async () => {
    setStatusMessage("메일 전송 중...");
    try {
      await sendEmail(email);
      setStatusMessage("인증 코드가 이메일로 전송되었습니다.");
      setStep(2); // 인증 코드 입력 단계로 이동
    } catch (error) {
      setStatusMessage("이메일 전송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleVerifyCode = async () => {
    setStatusMessage("인증 코드 확인 중...");
    try {
      await verifyEmail(email, verificationCode);
      setStatusMessage("인증이 완료되었습니다.");
      setStep(3); // 새 비밀번호 설정 단계로 이동
    } catch (error) {
      setStatusMessage("인증 코드가 유효하지 않습니다. 다시 확인해주세요.");
    }
  };

  const handleResetPassword = async () => {
    setStatusMessage("비밀번호 변경 중...");
    try {
      const response = await resetPassword(email, newPassword);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      setStatusMessage("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      setStatusMessage("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-500">비밀번호 찾기</h1>
          <p className="text-gray-500">
            등록된 이메일로 비밀번호 재설정을 진행합니다.
          </p>
        </div>

        {/* 단계별 UI */}
        {step === 1 && (
          <div>
            {/* 이메일 입력 */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* 비밀번호 재설정 버튼 */}
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleSendCode}
            >
              인증 코드 보내기
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            {/* 인증 코드 입력 */}
            <div className="mb-6">
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700"
              >
                인증 코드
              </label>
              <input
                type="text"
                id="verificationCode"
                placeholder="인증 코드를 입력하세요"
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>

            {/* 인증 확인 버튼 */}
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleVerifyCode}
            >
              인증 확인
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            {/* 새 비밀번호 입력 */}
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                새 비밀번호
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="새 비밀번호를 입력하세요"
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* 비밀번호 변경 버튼 */}
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleResetPassword}
            >
              비밀번호 변경
            </button>
          </div>
        )}

        {/* 상태 메시지 표시 */}
        {statusMessage && (
          <p className="mt-4 text-center text-sm text-gray-700">
            {statusMessage}
          </p>
        )}

        {/* 로그인 링크 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            비밀번호를 기억하셨나요?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
