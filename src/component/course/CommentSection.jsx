import React, { useState, useEffect } from "react";
import apiClient from "../../auth/apiClient";

const CommentSection = ({ studyId, postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiClient.get(
          `/study/${studyId}/post/${postId}/comment`
        );
        setComments(response.data);
      } catch {
        alert("댓글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [studyId, postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(
        `/study/${studyId}/post/${postId}/comment`,
        { content: commentContent }
      );
      console.log(response);
      setComments((prevComments) => [...prevComments, response.data]);
      setCommentContent("");
    } catch {
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;
  
    try {
      await apiClient.delete(`/study/${studyId}/post/${postId}/comment/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch {
      alert("댓글 삭제에 실패했습니다.");
    }
  };
  

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.put(
        `/study/${studyId}/post/${postId}/comment/${editingCommentId}`,
        { content: editingContent }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === editingCommentId ? response.data : comment
        )
      );
      setEditingCommentId(null);
      setEditingContent("");
    } catch {
      alert("댓글 수정에 실패했습니다.");
    }
  };

  if (loading) return <div>댓글 로딩 중...</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">댓글</h2>
      <ul className="mb-6">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="border-b border-gray-300 py-4 hover:bg-gray-100"
          >
            <div className="text-sm text-gray-500">
              {comment.nickname} | {comment.createdAt}
            </div>
            {editingCommentId === comment.id ? (
              // 수정 모드 UI
              <form onSubmit={handleUpdateComment} className="mt-2">
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="p-2 border rounded-md w-full"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
                >
                  저장
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCommentId(null);
                    setEditingContent("");
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 ml-2 mt-2"
                >
                  취소
                </button>
              </form>
            ) : (
              // 일반 모드 UI
              <>
                <div className="text-gray-700">{comment.content}</div>
                {currentUser && comment.author === currentUser.username && (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditingContent(comment.content);
                      }}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:underline"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
  
      <form onSubmit={handleCommentSubmit} className="flex flex-col space-y-4">
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          댓글 작성
        </button>
      </form>
    </div>
  );
  
};

export default CommentSection;
