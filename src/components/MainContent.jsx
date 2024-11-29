const MainContent = () => {
  return (
    <main className="flex-1 p-4 bg-gray-100">
      {/* 안내사항 배너 */}
      <div className="relative bg-blue-100 rounded-lg p-4 mb-6 shadow">
        <div className="flex items-center justify-between">
          <p className="text-blue-800 font-semibold">
            여러분의 스터디를 홍보해보세요 📢
          </p>
          <span className="bg-blue-800 text-white text-xs px-2 py-1 rounded-full">
            안내사항
          </span>
        </div>
      </div>

      {/* Hot 스터디 / 리뷰강의 */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Hot 스터디/리뷰강의 🔥</h2>
          <span className="text-sm text-orange-500 cursor-pointer">더보기</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 카드 1 */}
          <div className="bg-white rounded-lg shadow p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="스터디 이미지"
              className="w-full h-40 rounded-md object-cover mb-4"
            />
            <h3 className="font-bold text-sm">
              포트폴리오용 스터디 FE, Design 모집합니다
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              2년 경력 디자이너와 함께...
            </p>
          </div>

          {/* 카드 2 */}
          <div className="bg-white rounded-lg shadow p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="스터디 이미지"
              className="w-full h-40 rounded-md object-cover mb-4"
            />
            <h3 className="font-bold text-sm">
              [백엔드/신규그룹] 취업준비 모각코 모집
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              백엔드 스터디 팀원 모집!
            </p>
          </div>
        </div>
      </section>

      {/* New 스터디/리뷰강의 */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">New 스터디/리뷰강의 ✨</h2>
          <span className="text-sm text-orange-500 cursor-pointer">더보기</span>
        </div>
        <ul className="space-y-4">
          {/* 리스트 1 */}
          <li className="bg-white rounded-lg shadow p-4 flex items-center">
            <span className="bg-blue-500 text-white rounded-full px-3 py-2 text-sm mr-4">
              C
            </span>
            <div>
              <h3 className="font-bold text-sm">Spring Security 스터디</h3>
              <p className="text-xs text-gray-500">아무나 오세요</p>
            </div>
          </li>

          {/* 리스트 2 */}
          <li className="bg-white rounded-lg shadow p-4 flex items-center">
            <span className="bg-blue-500 text-white rounded-full px-3 py-2 text-sm mr-4">
              C
            </span>
            <div>
              <h3 className="font-bold text-sm">React 스터디</h3>
              <p className="text-xs text-gray-500">Js 기초 이상</p>
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default MainContent;
