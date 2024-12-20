import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../../auth/ApiClient";

const StudyPostList = () => {
  const { studyId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get(`/study/group/${studyId}`, {
          params: { page: currentPage, size: 10 },
        });
        setPosts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("게시글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [studyId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">스터디 게시글 목록</h1>
        <Link
          to={`/study/${studyId}/board`}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          작성
        </Link>
      </div>

      <ul className="mb-8">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border-b border-gray-300 py-4 hover:bg-gray-100"
          >
            <Link
              to={`/study/${studyId}/post/${post.id}`}
              className="text-blue-500 hover:underline"
            >
              {post.title}
            </Link>
            <div className="text-sm text-gray-500">{post.createdAt}</div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudyPostList;
