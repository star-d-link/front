import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-screen-lg mx-auto flex items-center justify-between h-16 px-4">
        {/* 로고 */}
        <h1
          className="text-xl font-bold text-blue-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Star-D-Link
        </h1>

        {/* 네비게이션 메뉴 */}
        <nav className="hidden md:flex space-x-4">
          <button
            className="text-gray-700 hover:text-blue-500"
            onClick={() => navigate("/")}
          >
            홈
          </button>
          <button
            className="text-gray-700 hover:text-blue-500"
            onClick={() => navigate("/list")}
          >
            스터디 생성/찾기
          </button>
          <button
            className="text-gray-700 hover:text-blue-500"
            onClick={() => navigate("/course-review-form")}
          >
            리뷰 작성/찾기
          </button>
          <button
            className="text-gray-700 hover:text-blue-500"
            onClick={() => navigate("/study-create")}
          >
            스터디 관리
          </button>
          <button
            className="text-gray-700 hover:text-blue-500"
            onClick={() => navigate("/mypage")}
          >
            마이페이지
          </button>
        </nav>

        {/* 로그인/로그아웃 버튼 */}
        {isAuthenticated ? (
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-600"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        ) : (
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600"
            onClick={() => navigate("/login")}
          >
            로그인
          </button>
        )}
      </div>

      {/* 모바일 네비게이션 */}
      <div className="flex md:hidden justify-around py-2 border-t">
        <button
          className="text-gray-700 hover:text-blue-500"
          onClick={() => navigate("/")}
        >
          홈
        </button>
        <button
          className="text-gray-700 hover:text-blue-500"
          onClick={() => navigate("/list")}
        >
          스터디
        </button>
        <button
          className="text-gray-700 hover:text-blue-500"
          onClick={() => navigate("/projects")}
        >
          리뷰
        </button>
        <button
          className="text-gray-700 hover:text-blue-500"
          onClick={() => navigate("/lounge")}
        >
          스터디 관리
        </button>
        <button
          className="text-gray-700 hover:text-blue-500"
          onClick={() => navigate("/mypage")}
        >
          마이 페이지
        </button>
      </div>
    </header>
  );
};

export default Header;
