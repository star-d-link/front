import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import ApiClient from "../auth/ApiClient";

const StudyEdit = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    hashtag: "",
    region: "",
    isOnline: false,
    headCount: 0,
  });
  const [quillContent, setQuillContent] = useState("");

  // 스터디 데이터 가져오기
  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const response = await ApiClient.get(`/study/${studyId}`);
        const { data } = response.data;
        setFormData({
          title: data.title,
          hashtag: data.hashtag,
          region: data.region,
          isOnline: data.isOnline,
          headCount: data.headCount,
        });
        setQuillContent(data.content);
      } catch (error) {
        console.error(
          "스터디 데이터를 가져오는 중 문제가 발생했습니다.",
          error
        );
      }
    };

    fetchStudy();
  }, [studyId]);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Boolean 값 변경 핸들러
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // 수정 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      content: quillContent,
    };

    try {
      const response = await ApiClient.put(`/study/${studyId}`, requestData);
      alert(response.data.message || "스터디가 성공적으로 수정되었습니다.");
      navigate(`/study/${studyId}`); // 수정 후 상세 페이지로 이동
    } catch (error) {
      console.error("스터디 수정 중 문제가 발생했습니다.", error);
      alert("스터디 수정 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">스터디 수정</h1>
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
          <label className="block text-lg font-semibold mb-2">
            스터디 내용
          </label>
          <ReactQuill
            value={quillContent}
            onChange={setQuillContent}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }, "link", "image"],
              ],
            }}
            placeholder="스터디 내용을 작성하세요..."
            theme="snow"
            className="bg-white rounded-lg"
          />
        </div>

        {/* 해시태그 */}
        <div>
          <label htmlFor="hashtag" className="block text-lg font-semibold mb-2">
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
          <label
            htmlFor="headCount"
            className="block text-lg font-semibold mb-2"
          >
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

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
        >
          수정하기
        </button>
      </form>
    </div>
  );
};

export default StudyEdit;
