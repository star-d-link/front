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
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField, Typography,
} from "@mui/material";


const ScheduleManagement = () => {
  const { studyId } = useParams();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    content: "",
    start: "",
    location: "",
  });

  // 스케줄 목록 불러오기
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

  useEffect(() => {
    fetchSchedules();
  }, [studyId]);

  const handleDateClick = (info) => {
    setNewSchedule({
      title: "",
      content: "",
      start: info.dateStr,
      location: "",
    });
    setDialogOpen(true);
    setCurrentSchedule(null);
  };

  const handleEventClick = (clickInfo) => {
    const schedule = schedules.find(
        (item) => item.scheduleId === Number(clickInfo.event.id)
    );
    if (schedule) {
      setCurrentSchedule(schedule);
      setNewSchedule({
        title: schedule.title,
        content: schedule.content,
        start: schedule.scheduleDate,
        location: schedule.location,
      });
      setDialogOpen(true);
    }
  };

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
        });
      }
      setDialogOpen(false);
      setNewSchedule({ title: "", content: "", start: "", location: "" });
      setCurrentSchedule(null);
      fetchSchedules(); // 스케줄 다시 불러오기
    } catch (err) {
      console.error("스케줄 저장 중 오류 발생:", err);
      setError("스케줄 저장 중 문제가 발생했습니다.");
    }
  };

  const handleDeleteSchedule = async () => {
    try {
      if (currentSchedule) {
        await ApiClient.delete(
            `/study/${studyId}/schedule/${currentSchedule.scheduleId}/delete`
        );
        setDialogOpen(false);
        setNewSchedule({ title: "", content: "", start: "", location: "" });
        setCurrentSchedule(null);
        fetchSchedules(); // 스케줄 다시 불러오기
      }
    } catch (err) {
      console.error("스케줄 삭제 중 오류 발생:", err);
      setError("스케줄 삭제 중 문제가 발생했습니다.");
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
    );
  }

  if (error) {
    return (
        <div className="text-center text-red-500 mt-4">
          <Typography variant="h6">{error}</Typography>
        </div>
    );
  }

  return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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

        {/* 스케줄 추가/수정 다이얼로그 */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>
            {currentSchedule ? "스케줄 수정" : "스케줄 추가"}
          </DialogTitle>
          <DialogContent>
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
            <TextField
                label="시작 날짜"
                type="datetime-local"
                value={newSchedule.start}
                onChange={(e) =>
                    setNewSchedule({ ...newSchedule, start: e.target.value })
                }
                fullWidth
                margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>취소</Button>
            {currentSchedule && (
                <Button onClick={handleDeleteSchedule} color="secondary">
                  삭제
                </Button>
            )}
            <Button onClick={handleSaveSchedule} color="primary">
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
};

export default ScheduleManagement;
