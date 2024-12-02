import { useState } from "react";
import KakaoMapCreate from "../components/KakaoMapCreate.jsx"

const StudyCreate = () => {  // StudyCreate라는 이름의 함수형 컴포넌트를 정의합니다. 이 컴포넌트는 스터디를 만드는 페이지를 렌더링합니다.
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleCoordinateSelect = (coordinates) => {
    setLatitude(coordinates.latitude);
    setLongitude(coordinates.longitude);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!latitude || !longitude) {
      alert("위치를 선택해주세요.");
      return;
    }

    // 모집글 작성 API 호출
    const studyData = {
      latitude,
      longitude,
    };

    console.log("Study Data:", studyData);

    // TODO: 서버로 데이터 전송
    // axios.post("http://localhost:8080/api/study", studyData)
    //   .then((response) => console.log(response.data))
    //   .catch((error) => console.error(error));
  };



  return (
    <div className="min-h-screen bg-gray-100">  {/* 페이지의 최상위 div로 화면을 꽉 채우는 최소 높이를 설정하고 배경색을 밝은 회색으로 설정 */}
      {/* 헤더 영역 */}
      <header className="bg-white shadow">  {/* 헤더 영역: 배경을 흰색으로 설정하고 그림자를 추가하여 눈에 띄게 만듦 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">  {/* 최대 너비를 설정하고, 화면 크기에 맞춰 여백을 설정 */}
          {/* 로고 */}
          <div className="text-2xl font-bold text-blue-500 text-left">  {/* 로고 텍스트: 큰 크기(2xl), 볼드체, 파란색 텍스트, 왼쪽 정렬 */}
            STAR D LINK
          </div>
        </div>
        {/* 브라우저 전체 너비 경계선 */}
        <div className="w-full border-t border-gray-200"></div>  {/* 상단에 회색 경계선 추가 */}
        {/* 가로 메뉴 */}
        <nav className="bg-white">  {/* 메뉴 영역: 배경을 흰색으로 설정 */}
          <ul className="flex justify-center space-x-12 px-4 sm:px-6 lg:px-8 py-4">  {/* 메뉴 항목들을 가로로 정렬하고, 항목 간에 일정한 공간을 두고 여백을 설정 */}
            <li>  {/* 메뉴 항목 */}
              <a
                href="/"
                className="text-gray-600 hover:text-blue-500 text-lg font-semibold"
              >
                홈  {/* 링크 텍스트 "홈" */}
              </a>
            </li>
            <li>  {/* 메뉴 항목 */}
              <a
                href="/study-create"
                className="text-gray-600 hover:text-blue-500 text-lg font-semibold"
              >
                스터디 만들기  {/* 링크 텍스트 "스터디 만들기" */}
              </a>
            </li>
            <li>  {/* 메뉴 항목 */}
              <a
                href="/study-search"
                className="text-gray-600 hover:text-blue-500 text-lg font-semibold"
              >
                강의/스터디 찾기  {/* 링크 텍스트 "강의/스터디 찾기" */}
              </a>
            </li>
            <li>  {/* 메뉴 항목 */}
              <a
                href="/lecture-review"
                className="text-gray-600 hover:text-blue-500 text-lg font-semibold"
              >
                강의 리뷰  {/* 링크 텍스트 "강의 리뷰" */}
              </a>
            </li>
            <li>  {/* 메뉴 항목 */}
              <a
                href="/mypage"
                className="text-gray-600 hover:text-blue-500 text-lg font-semibold"
              >
                마이페이지  {/* 링크 텍스트 "마이페이지" */}
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* 본문 영역 */}
      <main
          className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">  {/* 본문 영역: 최대 너비 설정, 여백과 패딩 추가, 배경색 흰색, 둥근 모서리와 그림자 적용 */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">스터디
          만들기</h1>  {/* 제목 텍스트: 큰 글자 크기, 볼드체, 아래쪽 여백 추가, 텍스트 색상은 어두운 회색 */}
        {/* 제목 입력 */}
        <div className="mb-4">  {/* 제목 입력란을 감싸는 div. 아래쪽에 여백을 추가 */}
          <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="제목"  // 입력란의 자리 표시 텍스트 (placeholder)
          />
        </div>
        {/* 에디터 영역 */}
        <div className="mb-6">  {/* 에디터를 감싸는 div, 아래쪽에 여백을 추가 */}
          <div
              className="border border-gray-300 rounded-md">  {/* 에디터의 테두리, 회색으로 설정하고 둥근 모서리 적용 */}
            {/* 툴바 */}
            <div
                className="p-3 bg-gray-100 border-b border-gray-300 flex space-x-4 items-center">  {/* 툴바 배경색 설정, 하단에 경계선 추가, 버튼들을 가로로 배치 */}
              {/* 굵게 버튼 */}
              <button className="text-gray-500 hover:text-blue-500 font-bold">
                <b>B</b>
              </button>
              {/* 기울임 버튼 */}
              <button className="text-gray-500 hover:text-blue-500 italic">
                <i>I</i>
              </button>
              {/* 밑줄 버튼 */}
              <button className="text-gray-500 hover:text-blue-500 underline">
                U
              </button>
              {/* 리스트 아이콘 버튼 */}
              <button className="text-gray-500 hover:text-blue-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.008v.008H3.75V6.75zm0 5.25h.008v.008H3.75V12zm0 5.25h.008v.008H3.75v-.008z"
                  />
                </svg>
              </button>
              {/* 이미지 아이콘 버튼 */}
              <button className="text-gray-500 hover:text-blue-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75v-13.5a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25v13.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25z"
                  />
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 18.75l5.25-6.75 3.75 4.5 2.25-3 4.5 5.25"
                  />
                </svg>
              </button>
            </div>
            {/* 텍스트 입력 영역 */}
            <textarea
                className="w-full border-0 rounded-md p-3 text-sm focus:outline-none"
                rows="10"
                placeholder="내용을 입력하세요"  // 텍스트 영역의 자리 표시 텍스트
            ></textarea>
          </div>
        </div>
          {/* 지도 부분 */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">스터디 위치 설정</label>
            <KakaoMapCreate onCoordinateSelect={handleCoordinateSelect}/>
          </div>

        {/* 작성 버튼 */}
        <div className="flex justify-end">  {/* 버튼을 오른쪽 정렬 */}
          <button
              type="submit"  // 버튼을 제출 버튼으로 설정
              className="bg-blue-500 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              작성 {/* 버튼 텍스트 "작성" */}
            </button>
          </div>
      </main>
    </div>
);
};

export default StudyCreate;   {/* 이 컴포넌트를 다른 파일에서 사용할 수 있도록 export 합니다. */}
