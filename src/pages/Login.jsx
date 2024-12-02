import naverLogo from "../assets/naver-logo-white.png";
import gitHubLogo from "../assets/github-mark-white.png";
import googleLogo from "../assets/web_neutral_rd_na@1x.png";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    const redirectTo = location.state?.from || "/";
    navigate(redirectTo); // 로그인 후 이전 페이지로 이동
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* 로그인 박스 */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* 로고와 제목 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-500">Star-D-Link</h1>
          <p className="text-gray-500">
            로그인하여 스터디와 강의리뷰를 탐색하세요!
          </p>
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
            className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-6">
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
            className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* 로그인 버튼 */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
          로그인
        </button>

        {/* 소셜 로그인 */}
        <div className="flex flex-col space-y-2">
          <button className="w-full flex items-center justify-center bg-gray-100 border rounded-lg py-2 hover:bg-gray-200">
            <img src={googleLogo} alt="Google" className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              구글로 로그인
            </span>
          </button>

          <button className="w-full flex items-center justify-center bg-yellow-400 border rounded-lg py-2 hover:bg-yellow-500">
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
              alt="Kakao"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              카카오로 로그인
            </span>
          </button>

          <button className="w-full flex items-center justify-center bg-green-500 text-white border rounded-lg py-2 hover:bg-green-600">
            <img src={naverLogo} alt="Naver" className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">네이버로 로그인</span>
          </button>

          <button className="w-full flex items-center justify-center bg-gray-800 text-white border rounded-lg py-2 hover:bg-gray-900">
            <img src={gitHubLogo} alt="GitHub" className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">깃허브로 로그인</span>
          </button>
        </div>

        {/* 회원가입 및 비밀번호 찾기 링크 */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            계정이 없으신가요?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              회원가입
            </a>
          </p>
          <p className="mt-1">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
