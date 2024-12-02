import React, { useState } from "react";

const CourseReviewForm = () => {
  const [review, setReview] = useState({
    title: "",
    name: "",
    rating: 0,
    content: "",
    hashtag: "",
    files: [],
  });

  const onChange = (e) => {
    setReview((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setReview((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  const handleRatingChange = (newRating) => {
    setReview((prev) => ({
      ...prev,
      rating: newRating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review Submitted:", review);
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">강의 리뷰 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center space-x-4 mb-4">
          {/* 제목 */}
          <label className="text-base font-medium text-gray-700 w-20">
            제목
          </label>
          <input
            type="text"
            name="title"
            onChange={onChange}
            required
            placeholder="제목을 입력하세요"
            className="flex-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-4 mb-4">
          {/* 이름 */}
          <label className="text-base font-medium text-gray-700 w-20">
            이름
          </label>
          <input
            type="text"
            name="name"
            onChange={onChange}
            required
            placeholder="이름을 입력하세요"
            className="flex-1 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 평점 */}
        <div>
          <div className="flex items-center space-x-3">
            <label className="text-base font-medium text-gray-700" >평점</label>
            <div className="flex space-x-3">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i + 1}
                  type="button"
                  onClick={() => handleRatingChange(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
                    review.rating >= i + 1
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            선택한 평점: {review.rating}
          </p>
        </div>

        {/* 내용 */}
        <div>
  
          <textarea
            name="content"
            onChange={onChange}
            required
            placeholder="내용을 입력하세요"
            className="w-full border border-gray-300 rounded-lg p-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="6"
          />
        </div>

        {/* 해시태그 */}
        <div>
          <label className="block text-base font-medium mb-2 text-gray-700">
            해시태그 (쉼표로 구분)
          </label>
          <input
            type="text"
            name="hashtag"
            onChange={onChange}
            placeholder="예: #리뷰, #강의"
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 파일 업로드 */}
        <div>
          <label className="block text-base font-medium mb-2 text-gray-700">
            파일 업로드
          </label>
          <input
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
            className="block w-full text-base text-gray-600 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
          <ul className="mt-3 text-sm text-gray-600 space-y-1">
            {review.files.map((file, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span>📄 {file.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseReviewForm;
