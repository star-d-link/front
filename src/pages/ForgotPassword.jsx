import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-500">비밀번호 찾기</h1>
          <p className="text-gray-500">
            등록된 이메일로 비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

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
          />
        </div>

        {/* 비밀번호 재설정 버튼 */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => alert("비밀번호 재설정 이메일이 발송되었습니다.")}
        >
          비밀번호 재설정 링크 보내기
        </button>

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
