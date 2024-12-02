import { useNavigate } from "react-router-dom";

const Header = ({ isMobile, toggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center bg-white px-4 py-2 shadow">
      {isMobile && (
        <button
          className="text-blue-500 border border-gray-300 rounded-md w-8 h-8 mr-2 flex items-center justify-center md:hidden"
          onClick={() => toggleSidebar((prev) => !prev)} // 상태 토글
        >
          ☰
        </button>
      )}
      <div className="flex-1">
        <input
          type="text"
          placeholder="스터디, 강의리뷰 찾아보기"
          className="w-full border rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none"
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm ml-2"
        onClick={
          () =>
            navigate("/login", { state: { from: window.location.pathname } }) // 로그인 후 다시 이전페이지로 돌아오도록
        }
      >
        로그인
      </button>
    </header>
  );
};

export default Header;
