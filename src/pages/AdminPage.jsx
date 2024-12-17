import React, { useEffect, useState } from "react";
import axios from "axios";
import apiClient from "../js/apiClient";

const AdminPage = () => {
  const [users, setUsers] = useState([]); // 사용자 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [filteredUsers, setFilteredUsers] = useState([]); // 필터링된 사용자 목록

  // 사용자 목록 가져오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/admin/users");
        console.log(response.data);
        setUsers(response.data);
        setFilteredUsers(response.data); // 초기값 설정
      } catch (error) {
        console.error("사용자 목록을 가져오지 못했습니다:", error);
        alert("사용자 목록 로드 중 오류가 발생했습니다.");
      }
    };

    fetchUsers();
  }, []);

  // 검색어 입력 처리
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.nickname.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users); // 검색어 없으면 전체 목록 표시
    }
  };

  // 사용자 삭제
  const handleDelete = async (userId) => {
    if (window.confirm("이 사용자를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/admin/users/${userId}/deactivate`);
        alert("사용자가 삭제되었습니다.");
        setUsers(users.filter((user) => user.id !== userId));
        setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("사용자 삭제 실패:", error);
        alert("사용자 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-orange-500 mb-4">관리자 페이지</h1>
      <div className="bg-white shadow rounded-lg p-6">
        {/* 검색 */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="사용자 검색 (닉네임, 이메일)"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* 사용자 목록 */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">닉네임</th>
              <th className="border border-gray-300 px-4 py-2">이메일</th>
              <th className="border border-gray-300 px-4 py-2">전화번호</th>
              <th className="border border-gray-300 px-4 py-2">관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.nickname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.phoneNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  사용자가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
