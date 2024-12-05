import { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import KakaoMapCreate from "../components/KakaoMapCreate.jsx";
import "react-quill/dist/quill.snow.css";

const StudyCreate = () => {
  // 스터디 정보 상태
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    hashtag: "",
    isRecruit: true,
    region: "",
    isOnline: false,
    headCount: 0,
    latitude: null,
    longitude: null,
  });

  // Quill 에디터 값 상태
  const [quillContent, setQuillContent] = useState("");
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
      },
    }
  }, [])
  // KakaoMap에서 좌표 업데이트
  const handleMapUpdate = (latitude, longitude, address) => {
    const region = address.split(/[\s,]/)[0];
    setFormData((prevData) => ({
      ...prevData,
      latitude,
      longitude,
      region,
    }));
  };

  // 입력 값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Boolean 값 변경 핸들러
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      content: quillContent, // Quill에서 작성된 내용 추가
    };
    console.log("스터디 생성 데이터:", requestData);
    // 여기에 API 요청 로직 추가
  };

  return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">스터디 모집글 작성</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 제목 */}
          <div>
            <label htmlFor="title" className="block text-lg font-semibold mb-2">
              스터디 제목
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quill 에디터 */}
          <div>
            <label className="block text-lg font-semibold mb-2">스터디 내용</label>
            <ReactQuill
                value={quillContent}
                onChange={setQuillContent}
                modules={modules}
                placeholder="스터디 내용을 작성하세요..."
                theme="snow"
                className="bg-white rounded-lg"
            />
          </div>

          {/* 해시태그 */}
          <div>
            <label htmlFor="hashtag"
                   className="block text-lg font-semibold mb-2">
              해시태그
            </label>
            <input
                type="text"
                id="hashtag"
                name="hashtag"
                value={formData.hashtag}
                onChange={handleInputChange}
                placeholder="#JAVA #PYTHON"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 모집 인원 */}
          <div>
            <label htmlFor="headCount"
                   className="block text-lg font-semibold mb-2">
              모집 인원
            </label>
            <input
                type="number"
                id="headCount"
                name="headCount"
                value={formData.headCount}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 온라인 여부 */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                  type="checkbox"
                  name="isOnline"
                  checked={formData.isOnline}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span>온라인 스터디</span>
            </label>
          </div>

          {/* Kakao 지도 */}
          {!formData.isOnline && (
              <div>
                <label className="block text-lg font-semibold mb-2">스터디 장소</label>
                <KakaoMapCreate onLocationSelect={handleMapUpdate} />
                {formData.latitude && formData.longitude && (
                    <p className="text-sm text-gray-500 mt-2">
                      선택된 지역: {formData.region} <br />
                      위도: {formData.latitude}, 경도: {formData.longitude}
                    </p>
                )}
              </div>
          )}


          {/* 제출 버튼 */}
          <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            모집글 작성
          </button>
        </form>
      </div>
  );
};

export default StudyCreate;
