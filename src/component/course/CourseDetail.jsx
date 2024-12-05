import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill 기본 스타일 추가

const CourseDetail = () => {
  const [review] = useState({
    title: "강의 제목",
    name: "홍길동",
    rating: 8,
    content: "강의 내용 및 후기...",
    hashtag: "#강의 #리뷰",
    files: [],
  });

  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentContent.trim()) {
      setComments((prevComments) => [
        ...prevComments,
        { content: commentContent, author: "댓글 작성자" },
      ]);
      setCommentContent(""); // 댓글 작성 후 입력란 비우기
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{review.title}</h1>

      {/* 강의 정보 */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-base text-gray-700"><b>강사명: </b>{review.name}</span>
          <span className="text-sm text-gray-500">| 평점: {review.rating}점</span>
        </div>

        <ReactQuill
          theme="bubble"
          value={review.content}
          readOnly={true}
          className="bg-white border border-gray-300 rounded-md mb-4"
          style={{ height: "300px" }}
        />

        <div className="text-sm text-gray-500">해시태그: {review.hashtag}</div>
        <ul className="mt-3 text-sm text-gray-600 space-y-1">
          {review.files.map((file, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span>📄 {file.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 댓글 작성란 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">댓글 작성</h2>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <div className="mb-4">
            <textarea
              value={commentContent}
              onChange={handleCommentChange}
              placeholder="댓글을 작성하세요"
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              댓글 작성
            </button>
          </div>
        </form>
      </div>

      {/* 댓글 목록 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">댓글 목록</h2>
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="border-b border-gray-200 py-4">
                <div className="text-sm text-gray-600">{comment.author}</div>
                <div className="text-base text-gray-800">{comment.content}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">댓글이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
