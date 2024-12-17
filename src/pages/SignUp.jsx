import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmail, verifyEmail, registerUser } from "../js/authApi";

const SignUp = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(null); // 이메일 전송 상태 메시지
  const [verificationCode, setVerificationCode] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleSendEmail = async () => {
    setEmailStatus("loading"); // 로딩 상태 표시
    try {
      const response = await sendEmail(email);
      console.log(response.status);
      if (response.status === 200) {
        setEmailStatus("success"); // 성공 상태
        setStep(2);
      } else {
        setEmailStatus("error");
      }
    } catch (error) {
      setEmailStatus(error);
    }
  };

  // 다시 보내기 버튼 핸들러
  const handleResendEmail = () => {
    alert("인증코드를 다시 보냈습니다.");
    handleSendEmail(); // 메일 전송 재시도
  };

  // 단계 변경
  const goToNextStep = () => {
    handleSendEmail();
    setEmailStatus(null); // 상태 초기화
    setStep(step + 1); // 다음 단계로 이동
  };

  const handleVerifyEmail = async () => {
    if (verificationCode.length !== 6) {
      alert("인증코드를 제대로 입력해주세요.");
      return;
    }

    try {
      const response = await verifyEmail(email, verificationCode);
      if (response.status === 200) {
        alert("이메일 인증이 완료되었습니다.");
        setStep(3);
      } else {
        alert(response.message || "인증 코드가 유효하지 않습니다.");
      }
    } catch (error) {
      alert("인증 코드가 유효하지 않습니다.");
    }
  };

  const handleRegisterUser = async () => {
    if (userData.password !== userData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await registerUser({
        email,
        username: userData.name,
        password: userData.password,
      });
      if (response.status === 200) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        alert(response.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-500">회원가입</h1>
          <p className="text-gray-500">
            계정을 생성하고 Star-D-Link를 시작하세요!
          </p>
        </div>

        {/* Step 1: 이메일 입력 */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* 이메일 전송 상태 메시지 */}
              {emailStatus === "loading" && (
                <p className="mt-2 text-sm text-gray-500">이메일 전송 중...</p>
              )}
              {emailStatus === "success" && (
                <p className="mt-2 text-sm text-green-500">
                  이메일이 성공적으로 전송되었습니다!
                </p>
              )}
              {emailStatus === "error" && (
                <p className="mt-2 text-sm text-red-500">
                  이메일 전송에 실패했습니다. 다시 시도해주세요.
                </p>
              )}
            </div>
            {/* 다음 단계 버튼 */}
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={goToNextStep}
            >
              다음
            </button>
          </div>
        )}

        {/* Step 2: 인증 코드 입력 */}
        {step === 2 && (
          <div>
            <div className="mb-4">
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700"
              >
                인증 코드
              </label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => {
                  console.log(e.target.value);
                  setVerificationCode(e.target.value);
                }}
                placeholder="인증 코드를 입력하세요"
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between items-center">
              {/* 인증 확인 버튼 */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleVerifyEmail}
              >
                인증 확인
              </button>
              {/* 다시 보내기 버튼 */}
              <button
                className="bg-gray-300 text-black py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handleResendEmail}
              >
                다시 보내기
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            {/* 이름 입력 */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                ID
              </label>
              <input
                type="text"
                id="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                placeholder="이름을 입력하세요"
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                placeholder="비밀번호를 입력하세요"
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 비밀번호 확인 */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={userData.confirmPassword}
                onChange={(e) =>
                  setUserData({ ...userData, confirmPassword: e.target.value })
                }
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 회원가입 버튼 */}
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleRegisterUser}
            >
              회원가입
            </button>
          </div>
        )}

        {/* 로그인 링크 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            이미 계정이 있으신가요?{" "}
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

export default SignUp;
