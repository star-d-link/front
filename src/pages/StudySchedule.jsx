import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CircularProgress from "@mui/material/CircularProgress";
import ApiClient from "../auth/apiClient";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    content: "",
    start: "",
    location: "",
    isRecurring: false, // 반복 여부
    recurrenceType: "DAILY", // 반복 주기
    recurrenceCount: 1, // 반복 횟수
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
    const clickedDate = info.dateStr; // YYYY-MM-DD 형식의 날짜
    setNewSchedule({
      title: "",
      content: "",
      start: `${clickedDate}T12:00`,
      location: "",
      isRecurring: false,
      recurrenceType: "DAILY",
      recurrenceCount: 1,
    });
    setCurrentSchedule(null); // 새 일정 추가 모드로 전환
    setEditDialogOpen(true);
  };

  // 스케줄 저장
  const handleSaveSchedule = async () => {
    try {
      if (currentSchedule) {
        // 수정 요청
        await ApiClient.put(
            `/study/${studyId}/schedule/update-single/${currentSchedule.scheduleId}`,
            {
              scheduleTitle: newSchedule.title,
              scheduleContent: newSchedule.content,
              scheduleDate: newSchedule.start,
              location: newSchedule.location,
            }
        );
      } else {
        // 추가 요청
        await ApiClient.post(`/study/${studyId}/schedule/add`, {
          scheduleTitle: newSchedule.title,
          scheduleContent: newSchedule.content,
          scheduleDate: newSchedule.start,
          location: newSchedule.location,
          isRecurring: newSchedule.isRecurring,
          recurrenceType: newSchedule.isRecurring ? newSchedule.recurrenceType : null,
          recurrenceCount: newSchedule.isRecurring ? newSchedule.recurrenceCount : null,
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

      // 스케줄 목록 다시 불러오기
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
            />
        )}

        {/* 스케줄 추가/수정 다이얼로그 */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>{currentSchedule ? "스케줄 수정" : "스케줄 추가"}</DialogTitle>
          <DialogContent>
            <TextField
                label="날짜"
                type="date"
                value={newSchedule.start.split("T")[0]} // 날짜만 표시
                disabled // 날짜 수정 불가
                fullWidth
                margin="dense"
            />
            <TextField
                label="시간"
                type="time"
                value={newSchedule.start.split("T")[1] || ""}
                onChange={(e) =>
                    setNewSchedule({
                      ...newSchedule,
                      start: `${newSchedule.start.split("T")[0]}T${e.target.value}`,
                    })
                }
                fullWidth
                margin="dense"
            />
            <TextField
                label="제목"
                value={newSchedule.title}
                onChange={(e) =>
                    setNewSchedule({ ...newSchedule, title: e.target.value })
                }
                fullWidth
                margin="dense"
            />
            <TextField
                label="내용"
                value={newSchedule.content}
                onChange={(e) =>
                    setNewSchedule({ ...newSchedule, content: e.target.value })
                }
                fullWidth
                margin="dense"
            />
            <TextField
                label="위치"
                value={newSchedule.location}
                onChange={(e) =>
                    setNewSchedule({ ...newSchedule, location: e.target.value })
                }
                fullWidth
                margin="dense"
            />
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
                      value={newSchedule.recurrenceType}
                      onChange={(e) =>
                          setNewSchedule({ ...newSchedule, recurrenceType: e.target.value })
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
                      value={newSchedule.recurrenceCount}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>취소</Button>
            <Button onClick={handleSaveSchedule} color="primary">
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
};

export default StudySchedule;