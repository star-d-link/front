import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill 기본 스타일 추가
import axios from "../api"; // axios 인스턴스 사용

const StudyPostDetail = () => {
  const { studyId, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5173/study/${studyId}/post/${postId}`);
        setPost(response.data);
      } catch (err) {
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [studyId, postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/study/${studyId}/post/${postId}`);
      alert("게시글이 삭제되었습니다.");
      navigate(`/study/${studyId}`); // 스터디 목록 페이지로 이동
    } catch (err) {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleEdit = () => {
    navigate(`/study/${studyId}/post/${postId}/edit`); // 수정 페이지로 이동
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{post.title}</h1>

      <div className="mb-8">
        <ReactQuill
          theme="bubble"
          value={post.content}
          readOnly={true}
          className="bg-white border border-gray-300 rounded-md mb-4"
          style={{ height: "300px" }}
        />

        <div className="text-sm text-gray-500">해시태그: {post.hashtag}</div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default StudyPostDetail;
