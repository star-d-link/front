import { useState } from "react";

const StudySchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    studyId: 1, // 임시로 설정 (백엔드 연동 시 수정 필요)
    scheduleTitle: "",
    scheduleContent: "",
    scheduleDate: "",
    time: "",
    location: "",
    isRecurring: false,
    recurrenceType: "DAILY", // DAILY, WEEKLY, MONTHLY 등 반복 타입
    recurrenceCount: 0, // 반복 횟수
  });

  // 일정 추가
  const handleAddSchedule = () => {
    const { scheduleTitle, scheduleContent, scheduleDate, time } = newSchedule;

    if (!scheduleTitle || !scheduleContent || !scheduleDate || !time) {
      alert("모든 필드를 입력하세요!");
      return;
    }

    const fullScheduleDate = `${scheduleDate}T${time}`;
    const formattedSchedule = {
      ...newSchedule,
      scheduleDate: fullScheduleDate, // 날짜와 시간을 합쳐 ISO 형식으로 저장
      id: Date.now(),
    };

    setSchedules([...schedules, formattedSchedule]);
    setNewSchedule({
      studyId: 1,
      scheduleTitle: "",
      scheduleContent: "",
      scheduleDate: "",
      time: "",
      location: "",
      isRecurring: false,
      recurrenceType: "DAILY",
      recurrenceCount: 0,
    });
  };

  // 일정 삭제
  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setNewSchedule({ ...newSchedule, [name]: inputValue });
  };

  return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">스터디 일정 관리</h1>

        {/* 일정 추가 폼 */}
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-lg font-semibold mb-1">일정 제목</label>
            <input
                type="text"
                name="scheduleTitle"
                value={newSchedule.scheduleTitle}
                onChange={handleInputChange}
                placeholder="일정 제목을 입력하세요"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-1">일정 내용</label>
            <textarea
                name="scheduleContent"
                value={newSchedule.scheduleContent}
                onChange={handleInputChange}
                placeholder="일정 내용을 입력하세요"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-lg font-semibold mb-1">날짜</label>
              <input
                  type="date"
                  name="scheduleDate"
                  value={newSchedule.scheduleDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg font-semibold mb-1">시간</label>
              <input
                  type="time"
                  name="time"
                  value={newSchedule.time}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-lg font-semibold mb-1">장소</label>
            <input
                type="text"
                name="location"
                value={newSchedule.location}
                onChange={handleInputChange}
                placeholder="장소를 입력하세요 (선택 사항)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 반복 일정 옵션 */}
          <div>
            <label className="flex items-center space-x-2">
              <input
                  type="checkbox"
                  name="isRecurring"
                  checked={newSchedule.isRecurring}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span>반복 일정</span>
            </label>
            {newSchedule.isRecurring && (
                <div className="mt-4 space-y-2">
                  <div>
                    <label className="block text-lg font-semibold mb-1">반복 주기</label>
                    <select
                        name="recurrenceType"
                        value={newSchedule.recurrenceType}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="DAILY">매일</option>
                      <option value="WEEKLY">매주</option>
                      <option value="MONTHLY">매월</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-lg font-semibold mb-1">반복 횟수</label>
                    <input
                        type="number"
                        name="recurrenceCount"
                        value={newSchedule.recurrenceCount}
                        onChange={handleInputChange}
                        placeholder="반복 횟수"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
            )}
          </div>
          <button
              onClick={handleAddSchedule}
              className="w-full py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            일정 추가
          </button>
        </div>

        {/* 일정 리스트 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">일정 목록</h2>
          {schedules.length > 0 ? (
              schedules.map((schedule) => (
                  <div
                      key={schedule.id}
                      className="p-4 bg-gray-100 border border-gray-300 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-bold">{schedule.scheduleTitle}</h3>
                      <p className="text-sm text-gray-500">
                        {schedule.scheduleDate} <br />
                        장소: {schedule.location || "미정"}
                      </p>
                      {schedule.isRecurring && (
                          <p className="text-sm text-gray-500">
                            반복: {schedule.recurrenceType} ({schedule.recurrenceCount}회)
                          </p>
                      )}
                    </div>
                    <button
                        onClick={() => handleDeleteSchedule(schedule.id)}
                        className="px-4 py-2 text-sm font-semibold text-red-500 bg-white border border-red-500 rounded-lg hover:bg-red-500 hover:text-white"
                    >
                      삭제
                    </button>
                  </div>
              ))
          ) : (
              <p className="text-center text-gray-500">등록된 일정이 없습니다.</p>
          )}
        </div>
      </div>
  );
};

export default StudySchedule;
