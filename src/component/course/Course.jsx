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
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">강의 리뷰 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">
            제목:
            <input
              type="text"
              name="title"
              onChange={onChange}
              required
              className="w-full border rounded-md p-2 mt-1"
            />
          </label>
        </div>

        <div>
          <label className="block font-medium mb-1">
            이름:
            <input
              type="text"
              name="name"
              onChange={onChange}
              required
              className="w-full border rounded-md p-2 mt-1"
            />
          </label>
        </div>

        <div>
          <label className="block font-medium mb-1">평점:</label>
          <div className="flex space-x-1">
            {[...Array(10)].map((_, i) => (
              <button
                key={i + 1}
                type="button"
                onClick={() => handleRatingChange(i + 1)}
                className={`w-8 h-8 rounded-full ${
                  review.rating >= i + 1
                    ? "bg-yellow-400"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">선택한 평점: {review.rating}</p>
        </div>

        <div>
          <label className="block font-medium mb-1">
            내용:
            <textarea
              name="content"
              onChange={onChange}
              required
              className="w-full border rounded-md p-2 mt-1"
              rows="4"
            />
          </label>
        </div>

        <div>
          <label className="block font-medium mb-1">
            해시태그 (쉼표로 구분):
            <input
              type="text"
              name="hashtag"
              onChange={onChange}
              className="w-full border rounded-md p-2 mt-1"
            />
          </label>
        </div>

        <div>
          <label className="block font-medium mb-1">
            파일 업로드:
            <input
              type="file"
              name="files"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </label>
          <ul className="mt-2 text-sm text-gray-600">
            {review.files.map((file, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span>📄 {file.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
            등록
        </button>
      </form>
    </div>
  );
};

export default CourseReviewForm;
