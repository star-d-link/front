import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill 기본 스타일 추가
import apiClient from "../../js/apiClient";

const StudyModify = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { studyId, postId } = useParams();
  const navigate = useNavigate();
  const [studyBoard, setStudyBoard] = useState({
    title: "",
    content: "",
  });
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(`/study/group/${studyId}/post/${postId}`);
        setPost(response.data);
        setStudyBoard({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (err) {
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [studyId, postId]);

  const onChange = (e) => {
    setStudyBoard((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const requestBody = {
      title: studyBoard.title,
      content: studyBoard.content,

    };

    try {
      const response = await apiClient.put(`/study/group/${studyId}/post/${postId}`, requestBody);
      if (response.status === 200) {
        alert("게시글이 성공적으로 수정되었습니다!");
        navigate(`/study/${studyId}/post/${postId}`);
      } else {
        setError("게시글 수정 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("게시글 수정 중 오류가 발생했습니다:", error);
      setError("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">스터디 게시글 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-base font-medium text-gray-700 w-20">제목</label>
          <input
            type="text"
            name="title"
            value={studyBoard.title}
            onChange={onChange}
            required
            placeholder="제목을 입력하세요"
            className="flex-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-base font-medium mb-2 text-gray-700">내용</label>
          <div className="relative" style={{ height: "300px" }}>
            <ReactQuill
              theme="snow"
              value={studyBoard.content}
              onChange={(content) =>
                setStudyBoard((prev) => ({ ...prev, content }))
              }
              className="bg-white border border-gray-300 rounded-md"
              style={{ height: "100%", overflow: "hidden" }}
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-medium mb-2 text-gray-700">
            해시태그 (쉼표로 구분)
          </label>
          <input
            type="text"
            name="hashtag"
            value={studyBoard.hashtag}
            onChange={onChange}
            placeholder="예: #스터디, #프로젝트"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {isSubmitting && <p className="text-gray-500">수정 중...</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            수정
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudyModify;
