import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ApiClient from "../auth/apiClient";
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
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
} from "@mui/material";
import { useAuth } from "../auth/AuthContext.jsx";

// 필요하다면 아이콘 임포트
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

const StudySchedule = () => {
  const { studyId } = useParams();
  const { user } = useAuth();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [userParticipationStatus, setUserParticipationStatus] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    content: "",
    start: "",
    location: "",
    isRecurring: false,
    recurrenceType: "DAILY",
    recurrenceCount: 1,
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("12:00");
  const statusMap = {
    ATTENDING: "참여",
    NOT_ATTENDING: "불참",
    PENDING: "미정",
  };

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

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    setSelectedDate(clickedDate);
    setSelectedTime("12:00");
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
    setEditMode("add");
    setEditDialogOpen(true);
  };

  const handleEventClick = async (clickInfo) => {
    const scheduleId = Number(clickInfo.event.id);
    const schedule = schedules.find((item) => item.scheduleId === scheduleId);
    if (schedule) {
      setCurrentSchedule(schedule);
      try {
        const response = await ApiClient.get(`/study/${studyId}/schedule/${scheduleId}/participation`);
        const participationList = response.data.data || [];
        setParticipants(participationList);

        const currentUserParticipation = participationList.find(p => p.username === user?.username);
        setUserParticipationStatus(currentUserParticipation ? currentUserParticipation.participationStatus : null);
      } catch (err) {
        console.error("참여자 목록 조회 중 오류:", err);
      }
    }
  };

  const handleParticipationChange = async (newStatus) => {
    if (!currentSchedule || !user) return;
    const scheduleId = currentSchedule.scheduleId;
    try {
      const requestData = {
        scheduleId: scheduleId,
        status: newStatus
      };
      await ApiClient.put(`/study/${studyId}/schedule/${scheduleId}/participation/respond`, requestData);
      setUserParticipationStatus(newStatus);

      const response = await ApiClient.get(`/study/${studyId}/schedule/${scheduleId}/participation`);
      setParticipants(response.data.data || []);
    } catch (error) {
      console.error("참여 상태 변경 오류:", error);
      alert("참여 상태 변경 중 문제가 발생했습니다.");
    }
  };

  const handleDeleteSchedule = async () => {
    if (!currentSchedule) return;
    const confirmDelete = window.confirm("정말로 이 스케줄을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await ApiClient.delete(
          `/study/${studyId}/schedule/${currentSchedule.scheduleId}/delete`
      );
      setCurrentSchedule(null);

      const response = await ApiClient.get(`/study/${studyId}/schedule`);
      setSchedules(response.data.data || []);
    } catch (err) {
      console.error("스케줄 삭제 중 오류 발생:", err);
      setError("스케줄 삭제 중 문제가 발생했습니다.");
    }
  };

  const handleSaveSchedule = async () => {
    const finalDateTime =
        editMode === "single" || editMode === "add"
            ? `${selectedDate}T${selectedTime}`
            : currentSchedule.scheduleDate;

    try {
      if (editMode === "all") {
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
        await ApiClient.put(
            `/study/${studyId}/schedule/update-single/${currentSchedule.scheduleId}`,
            {
              scheduleId: currentSchedule.scheduleId,
              scheduleTitle: newSchedule.title,
              scheduleContent: newSchedule.content,
              scheduleDate: finalDateTime,
              location: newSchedule.location,
            }
        );
      } else {
        await ApiClient.post(`/study/${studyId}/schedule/add`, {
          scheduleTitle: newSchedule.title,
          scheduleContent: newSchedule.content,
          scheduleDate: finalDateTime,
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
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                }}
            />
        )}

        {currentSchedule && (
            <Card className="mt-6">
              <CardHeader title="스케줄 상세 정보" />
              <CardContent>
                <Typography variant="h6">제목: {currentSchedule.title}</Typography>
                <Typography>내용: {currentSchedule.content}</Typography>
                <Typography>시간: {currentSchedule.scheduleDate}</Typography>
                <Typography>위치: {currentSchedule.location}</Typography>

                <Divider sx={{ my: 2 }} />

                {/* 개별 수정 / 전체 수정 / 삭제 버튼: 오른쪽 정렬 */}
                <Box className="flex justify-end gap-2 mb-4">
                  {currentSchedule.recurrenceGroup && (
                      <Button
                          variant="outlined"
                          onClick={() => {
                            setNewSchedule({
                              title: currentSchedule.title,
                              content: currentSchedule.content,
                              start: currentSchedule.scheduleDate,
                              location: currentSchedule.location,
                              isRecurring: true,
                              recurrenceType: "DAILY",
                              recurrenceCount: 1,
                            });
                            setEditMode("all");
                            setEditDialogOpen(true);
                          }}
                      >
                        전체 수정
                      </Button>
                  )}

                  <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        const [datePart, timePart] = currentSchedule.scheduleDate.split("T");
                        const timeOnly = timePart ? timePart.slice(0, 5) : "12:00";
                        setSelectedDate(datePart);
                        setSelectedTime(timeOnly);
                        setNewSchedule({
                          title: currentSchedule.title,
                          content: currentSchedule.content,
                          start: currentSchedule.scheduleDate,
                          location: currentSchedule.location,
                          isRecurring: false,
                          recurrenceType: "DAILY",
                          recurrenceCount: 1,
                        });
                        setEditMode("single");
                        setEditDialogOpen(true);
                      }}
                  >
                    개별 수정
                  </Button>

                  <Button variant="contained" color="error" onClick={handleDeleteSchedule}>
                    삭제
                  </Button>
                </Box>

                <Typography variant="h6">참여자 목록</Typography>
                <div className="flex flex-wrap gap-2 mt-2">
                  {participants.map((p) => (
                      <div key={p.participationId} className="border p-2 rounded flex items-center gap-2">
                        <Typography>
                          {p.username} - {statusMap[p.participationStatus] || p.participationStatus}
                        </Typography>
                        {p.username === user?.username && (
                            <Box className="flex justify-end" sx={{ minWidth: '100px' }}>
                              <Select
                                  value={userParticipationStatus || ""}
                                  onChange={(e) => handleParticipationChange(e.target.value)}
                                  displayEmpty
                                  size="small"
                                  sx={{ fontSize: '0.875rem', py: 0.5, px:1 }}
                              >
                                <MenuItem value="" sx={{ fontSize: '0.875rem', py: 0.5 }}>상태 선택</MenuItem>
                                <MenuItem value="ATTENDING" sx={{ fontSize: '0.875rem', py: 0.5 }}>참여</MenuItem>
                                <MenuItem value="NOT_ATTENDING" sx={{ fontSize: '0.875rem', py: 0.5 }}>불참</MenuItem>
                                <MenuItem value="PENDING" sx={{ fontSize: '0.875rem', py: 0.5 }}>미정</MenuItem>
                              </Select>
                            </Box>
                        )}
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
        )}

        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>
            {editMode === "add"
                ? "스케줄 추가"
                : editMode === "single"
                    ? "개별 일정 수정"
                    : "반복 그룹 수정"}
          </DialogTitle>
          <DialogContent>
            <TextField
                label="제목"
                value={newSchedule.title}
                onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
                fullWidth
                margin="dense"
                required
            />
            <TextField
                label="내용"
                value={newSchedule.content}
                onChange={(e) => setNewSchedule({ ...newSchedule, content: e.target.value })}
                fullWidth
                margin="dense"
                required
            />
            <TextField
                label="위치"
                value={newSchedule.location}
                onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
                fullWidth
                margin="dense"
                required
            />

            {(editMode === "add" || editMode === "single") && (
                <>
                  <Typography className="mt-4 mb-2">선택한 날짜: {selectedDate}</Typography>
                  <TextField
                      label="시간"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      fullWidth
                      margin="dense"
                      required
                  />
                </>
            )}

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
            <Button onClick={handleSaveSchedule} color="primary">
              저장
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
};

export default StudySchedule;
