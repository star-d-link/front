import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill 기본 스타일 추가
import apiClient from "../../auth/apiClient";
import { useAuth } from "../../auth/AuthContext.jsx";

const StudyPostDetail = () => {
  const { user } = useAuth(); // 현재 로그인 사용자 정보
  const { studyId, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get(
          `/study/group/${studyId}/post/${postId}`
        );
        setPost(response.data);
        console.log(user);
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
      await apiClient.delete(`/study/group/${studyId}/post/${postId}`);
      alert("게시글이 삭제되었습니다.");
      navigate(`/study/group/${studyId}/list`); // 스터디 목록 페이지로 이동
    } catch (err) {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleEdit = () => {
    navigate(`/study/group/${studyId}/post/${postId}/edit`); // 수정 페이지로 이동
  };
  const handleBackToList = () => {
    navigate(`/study/group/${studyId}/list`); // 리스트 페이지로 이동
  };
  const isOwner = user && post && user.username === post.author;
  

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
          onClick={handleBackToList}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          목록
        </button>
        {isOwner && (<>
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
        </button></>
        )}
      </div>
    </div>
  );
};

export default StudyPostDetail;
