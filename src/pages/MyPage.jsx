import React, { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../js/apiClient";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    profileUrl: "",
    phoneNumber: "",
    birthDate: "",
    region: "",
  });
  const [profileImage, setProfileImage] = useState(null); // 업로드할 파일

  // 사용자 기본 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get("/profile");
        if (response.data.profileUrl !== null) {
          response.data.profileUrl =
            "http://localhost:8080" + response.data.profileUrl;
        }
        setUserInfo(response.data);
      } catch (error) {
        console.error("사용자 정보를 가져오지 못했습니다:", error);
        alert("사용자 정보를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  // 사용자 정보 업데이트
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("nickname", userInfo.nickname);
    formData.append("phoneNumber", userInfo.phoneNumber);
    formData.append("birthDate", userInfo.birthDate);
    formData.append("region", userInfo.region);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      await apiClient.put("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("프로필이 성공적으로 업데이트되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  // 입력값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 프로필 이미지 변경 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setUserInfo((prev) => ({
        ...prev,
        profileUrl: URL.createObjectURL(file), // 미리보기
      }));
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">마이페이지</h1>
      <div className="bg-white shadow rounded-lg p-6">
        {/* 프로필 사진 */}
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={userInfo.profileUrl || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-20 h-20 rounded-full bg-gray-300 object-cover"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            )}
          </div>
          <div className="ml-4">
            <p className="text-lg font-bold">{userInfo.nickname}</p>
          </div>
        </div>

        {/* 사용자 정보 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <input
              type="text"
              name="nickname"
              value={userInfo.nickname}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border px-4 py-2 rounded-lg ${
                isEditing
                  ? "focus:outline-none focus:ring-2 focus:ring-orange-500"
                  : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              전화번호
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border px-4 py-2 rounded-lg ${
                isEditing
                  ? "focus:outline-none focus:ring-2 focus:ring-orange-500"
                  : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              생년월일
            </label>
            <input
              type="date"
              name="birthDate"
              value={userInfo.birthDate}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border px-4 py-2 rounded-lg ${
                isEditing
                  ? "focus:outline-none focus:ring-2 focus:ring-orange-500"
                  : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              지역
            </label>
            <input
              type="text"
              name="region"
              value={userInfo.region}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border px-4 py-2 rounded-lg ${
                isEditing
                  ? "focus:outline-none focus:ring-2 focus:ring-orange-500"
                  : "bg-gray-100"
              }`}
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              저장하기
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              수정하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
