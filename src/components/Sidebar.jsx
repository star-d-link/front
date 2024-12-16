const Sidebar = ({ isMobile, toggleSidebar, setSidebarOpen }) => {
  return (
    <>
      {isMobile ? (
        <>
          {/* Sidebar */}
          <div
            className={`fixed inset-y-0 left-0 w-64 bg-white border-r shadow-lg transform ${
              toggleSidebar ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 z-50`}
          >
            <div className="p-4">
              <ul className="space-y-4">
                <li>
                  <a
                    href="/"
                    className="block text-sm font-bold text-orange-500"
                  >
                    홈
                  </a>
                </li>
                <li>
                  <a href="/" className="block text-sm hover:text-orange-500">
                    스터디 찾기/만들기
                  </a>
                </li>
                <li>
                  <a href="/" className="block text-sm hover:text-orange-500">
                    강의 리뷰 찾기/만들기
                  </a>
                </li>
                <li>
                  <a href="/" className="block text-sm hover:text-orange-500">
                    스터디 관리
                  </a>
                </li>
                <li>
                  <a href="/" className="block text-sm hover:text-orange-500">
                    마이페이지
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 오버레이 배경 */}
          {toggleSidebar && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)} // 오버레이를 클릭하면 사이드바 닫기
            />
          )}
        </>
      ) : (
        // 데스크톱용 Sidebar
        <nav className="w-64 bg-gray-50 border-r p-4">
          <ul className="space-y-4">
            <li className="text-lg font-bold text-blue-500">Star-D-Link</li>
            <li>
              <a href="/" className="block py-2 hover:text-orange-500">
                홈
              </a>
            </li>
            <li>
              <a href="/" className="block py-2 hover:text-orange-500">
                스터디 찾기/만들기
              </a>
            </li>
            <li>
              <a href="/" className="block py-2 hover:text-orange-500">
                강의 리뷰 찾기/만들기
              </a>
            </li>
            <li>
              <a href="/" className="block py-2 hover:text-orange-500">
                스터디 관리
              </a>
            </li>
            <li>
              <a href="/" className="block py-2 hover:text-orange-500">
                마이페이지
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
