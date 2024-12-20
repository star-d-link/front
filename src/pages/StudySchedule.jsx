import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ApiClient from "../auth/ApiClient";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
const StudySchedule = () => {
  const { studyId } = useParams();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(null); // 전체 수정 or 개별 수정 구분
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    content: "",
    start: "",
    location: "",
    isRecurring: false,
    recurrenceType: "DAILY",
    recurrenceCount: 1,
  });

  // 스케줄 목록 가져오기
  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await ApiClient.get(`/study/${studyId}/schedule`);
        setSchedules(response.data.data || []);
      } catch (err) {
        console.error("스케줄 조회 중 오류 발생:", err);
        setError("스케줄을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [studyId]);

  // 날짜 클릭 시 처리
  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    setNewSchedule({
      title: "",
      content: "",
      start: `${clickedDate}T12:00`,
      location: "",
      isRecurring: false,
      recurrenceType: "DAILY",
      recurrenceCount: 1,
    });
    setCurrentSchedule(null);
    setEditMode("add");
    setEditDialogOpen(true);
  };

  // 이벤트 클릭 시 처리
  const handleEventClick = (clickInfo) => {
    const schedule = schedules.find(
      (item) => item.scheduleId === Number(clickInfo.event.id)
    );
    if (schedule) {
      setCurrentSchedule(schedule);
      setInfoDialogOpen(true);
    }
  };

  // 스케줄 삭제 처리
  const handleDeleteSchedule = async () => {
    if (!currentSchedule) return;

    const confirmDelete = window.confirm(
      "정말로 이 스케줄을 삭제하시겠습니까?"
    );
    if (!confirmDelete) return;

    try {
      await ApiClient.delete(
        `/study/${studyId}/schedule/${currentSchedule.scheduleId}/delete`
      );
      setInfoDialogOpen(false);
      setCurrentSchedule(null);

      // 스케줄 목록 다시 불러오기
      const response = await ApiClient.get(`/study/${studyId}/schedule`);
      setSchedules(response.data.data || []);
    } catch (err) {
      console.error("스케줄 삭제 중 오류 발생:", err);
      setError("스케줄 삭제 중 문제가 발생했습니다.");
    }
  };

  // 스케줄 저장 처리 (추가, 수정)
  const handleSaveSchedule = async () => {
    try {
      if (editMode === "all") {
        // 전체 수정
        await ApiClient.put(
          `/study/${studyId}/schedule/update-entire/${currentSchedule.recurrenceGroup}`,
          {
            recurrenceGroupId: currentSchedule.recurrenceGroup,
            scheduleTitle: newSchedule.title,
            scheduleContent: newSchedule.content,
            location: newSchedule.location,
            recurrenceType: newSchedule.recurrenceType || null,
          }
        );
      } else if (editMode === "single") {
        // 개별 수정
        await ApiClient.put(
          `/study/${studyId}/schedule/update-single/${currentSchedule.scheduleId}`,
          {
            scheduleId: currentSchedule.scheduleId,
            scheduleTitle: newSchedule.title,
            scheduleContent: newSchedule.content,
            scheduleDate: newSchedule.start,
            location: newSchedule.location,
          }
        );
      } else {
        // 새 일정 추가
        await ApiClient.post(`/study/${studyId}/schedule/add`, {
          scheduleTitle: newSchedule.title,
          scheduleContent: newSchedule.content,
          scheduleDate: newSchedule.start,
          location: newSchedule.location,
          isRecurring: newSchedule.isRecurring,
          recurrenceType: newSchedule.isRecurring
            ? newSchedule.recurrenceType
            : null,
          recurrenceCount: newSchedule.isRecurring
            ? newSchedule.recurrenceCount
            : null,
        });
      }
      setEditDialogOpen(false);
      setNewSchedule({
        title: "",
        content: "",
        start: "",
        location: "",
        isRecurring: false,
        recurrenceType: "DAILY",
        recurrenceCount: 1,
      });
      setCurrentSchedule(null);

      const response = await ApiClient.get(`/study/${studyId}/schedule`);
      setSchedules(response.data.data || []);
    } catch (err) {
      console.error("스케줄 저장 중 오류 발생:", err);
      setError("스케줄 저장 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          events={schedules.map((schedule) => ({
            id: schedule.scheduleId,
            title: schedule.title,
            start: schedule.scheduleDate,
          }))}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      )}

      {/* 스케줄 정보 다이얼로그 */}
      <Dialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)}>
        <DialogTitle>스케줄 정보</DialogTitle>
        <DialogContent>
          {currentSchedule && (
            <>
              <Typography variant="h6">
                제목: {currentSchedule.title}
              </Typography>
              <Typography>내용: {currentSchedule.content}</Typography>
              <Typography>시간: {currentSchedule.scheduleDate}</Typography>
              <Typography>위치: {currentSchedule.location}</Typography>
              <Typography>
                반복 일정 여부:{" "}
                {currentSchedule.recurrenceGroup ? "예" : "아니오"}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoDialogOpen(false)}>닫기</Button>
          {currentSchedule?.recurrenceGroup && (
            <Button
              onClick={() => {
                setNewSchedule({
                  title: currentSchedule.title,
                  content: currentSchedule.content,
                  start: currentSchedule.scheduleDate,
                  location: currentSchedule.location,
                });
                setEditMode("all");
                setEditDialogOpen(true);
                setInfoDialogOpen(false);
              }}
              color="primary"
            >
              전체 수정
            </Button>
          )}
          <Button
            onClick={() => {
              setNewSchedule({
                title: currentSchedule.title,
                content: currentSchedule.content,
                start: currentSchedule.scheduleDate,
                location: currentSchedule.location,
              });
              setEditMode("single");
              setEditDialogOpen(true);
              setInfoDialogOpen(false);
            }}
            color="secondary"
          >
            개별 수정
          </Button>
          <Button onClick={handleDeleteSchedule} color="error">
            삭제
          </Button>
        </DialogActions>
      </Dialog>

      {/* 스케줄 추가/수정 다이얼로그 */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>
          {editMode === "add"
            ? "스케줄 추가"
            : editMode === "single"
            ? "개별 일정 수정"
            : "반복 그룹 수정"}
        </DialogTitle>
        <DialogContent>
          {/* 공통 필드 */}
          <TextField
            label="제목"
            value={newSchedule.title}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, title: e.target.value })
            }
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="내용"
            value={newSchedule.content}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, content: e.target.value })
            }
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="위치"
            value={newSchedule.location}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, location: e.target.value })
            }
            fullWidth
            margin="dense"
            required
          />

          {/* 추가와 개별 수정 공통: 날짜 및 시간 */}
          {(editMode === "add" || editMode === "single") && (
            <TextField
              label="날짜 및 시간"
              type="datetime-local"
              value={newSchedule.start}
              onChange={(e) =>
                setNewSchedule({ ...newSchedule, start: e.target.value })
              }
              fullWidth
              margin="dense"
              required
            />
          )}

          {/* 추가와 전체 수정 공통: 반복 여부 */}
          {(editMode === "add" || editMode === "all") && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newSchedule.isRecurring}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        isRecurring: e.target.checked,
                      })
                    }
                  />
                }
                label="반복 일정"
              />
              {newSchedule.isRecurring && (
                <>
                  <Select
                    value={newSchedule.recurrenceType || ""}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        recurrenceType: e.target.value,
                      })
                    }
                    fullWidth
                    margin="dense"
                  >
                    <MenuItem value="DAILY">매일</MenuItem>
                    <MenuItem value="WEEKLY">매주</MenuItem>
                    <MenuItem value="MONTHLY">매월</MenuItem>
                  </Select>
                  <TextField
                    label="반복 횟수"
                    type="number"
                    value={newSchedule.recurrenceCount || ""}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        recurrenceCount: parseInt(e.target.value, 10),
                      })
                    }
                    fullWidth
                    margin="dense"
                  />
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>취소</Button>
          <Button
            onClick={async () => {
              try {
                if (editMode === "add") {
                  // 스케줄 추가
                  await ApiClient.post(`/study/${studyId}/schedule/add`, {
                    scheduleTitle: newSchedule.title,
                    scheduleContent: newSchedule.content,
                    scheduleDate: newSchedule.start,
                    location: newSchedule.location,
                    isRecurring: newSchedule.isRecurring,
                    recurrenceType: newSchedule.isRecurring
                      ? newSchedule.recurrenceType
                      : null,
                    recurrenceCount: newSchedule.isRecurring
                      ? newSchedule.recurrenceCount
                      : null,
                  });
                } else if (editMode === "single") {
                  // 개별 일정 수정
                  await ApiClient.put(
                    `/study/${studyId}/schedule/update-single/${currentSchedule.scheduleId}`,
                    {
                      scheduleId: currentSchedule.scheduleId,
                      scheduleTitle: newSchedule.title,
                      scheduleContent: newSchedule.content,
                      scheduleDate: newSchedule.start,
                      location: newSchedule.location,
                    }
                  );
                } else if (editMode === "all") {
                  // 반복 그룹 수정
                  await ApiClient.put(
                    `/study/${studyId}/schedule/update-entire/${currentSchedule.recurrenceGroup}`,
                    {
                      recurrenceGroupId: currentSchedule.recurrenceGroup,
                      scheduleTitle: newSchedule.title,
                      scheduleContent: newSchedule.content,
                      location: newSchedule.location,
                      recurrenceType: newSchedule.recurrenceType || null,
                    }
                  );
                }

                // 다이얼로그 닫기 및 초기화
                setEditDialogOpen(false);
                setNewSchedule({
                  title: "",
                  content: "",
                  start: "",
                  location: "",
                  isRecurring: false,
                  recurrenceType: "DAILY",
                  recurrenceCount: 1,
                });
                setCurrentSchedule(null);

                // 스케줄 목록 다시 불러오기
                const response = await ApiClient.get(
                  `/study/${studyId}/schedule`
                );
                setSchedules(response.data.data || []);
              } catch (err) {
                console.error("저장 중 오류:", err);
              }
            }}
            color="primary"
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudySchedule;
