import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-500">회원가입</h1>
          <p className="text-gray-500">
            계정을 생성하고 Star-D-Link를 시작하세요!
          </p>
        </div>

        {/* 이름 입력 */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            이름
          </label>
          <input
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 이메일 입력 */}
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
            placeholder="이메일을 입력하세요"
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
            placeholder="비밀번호를 입력하세요"
            className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="mb-6">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 회원가입 버튼 */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => alert("회원가입 완료!")}
        >
          회원가입
        </button>

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
