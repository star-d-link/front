import { useState, useEffect } from "react";
import ApiClient from "../auth/ApiClient";
import StudyList from "../components/StudyList";
import StudyMember from "../components/StudyMember";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "framer-motion";

const StudyManagement = () => {
  const [adminStudies, setAdminStudies] = useState([]); // 관리 중인 스터디
  const [joinedStudies, setJoinedStudies] = useState([]); // 가입한 스터디
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지
  const [currentStudy, setCurrentStudy] = useState(null); // 선택된 스터디
  const [isManaging, setIsManaging] = useState(false); // 관리 중 여부

  // 스터디 목록 가져오기
  useEffect(() => {
    const fetchStudies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await ApiClient.get("/study/manage/list");
        const { admin = [], joined = [] } = response.data.data;
        setAdminStudies(admin);
        setJoinedStudies(joined);
      } catch (err) {
        console.error("스터디 목록 로드 오류:", err);
        setError("스터디 목록을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudies();
  }, []);

  // 애니메이션 설정
  const memberVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.5 } },
  };

  // 컴포넌트 렌더링
  return (
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <div className="flex flex-col flex-1 p-6">
          {loading ? (
              <Typography variant="h5" align="center" className="text-gray-600">
                로딩 중...
              </Typography>
          ) : error ? (
              <Typography variant="h5" align="center" className="text-red-500">
                {error}
              </Typography>
          ) : (
              <div className="grid gap-6">
                {/* 관리 중인 스터디 */}
                <section>
                  <Typography variant="h4" gutterBottom>
                    관리 중인 스터디
                  </Typography>
                  {adminStudies.length > 0 ? (
                      <StudyList
                          studies={adminStudies}
                          onSelectStudy={(study) => {
                            setCurrentStudy(study);
                            setIsManaging(true);
                          }}
                      />
                  ) : (
                      <Typography className="text-gray-500">
                        관리 중인 스터디가 없습니다.
                      </Typography>
                  )}
                </section>

                {/* 가입한 스터디 */}
                <section>
                  <Typography variant="h4" gutterBottom>
                    가입한 스터디
                  </Typography>
                  {joinedStudies.length > 0 ? (
                      <StudyList
                          studies={joinedStudies}
                          onSelectStudy={(study) => {
                            setCurrentStudy(study);
                            setIsManaging(false);
                          }}
                      />
                  ) : (
                      <Typography className="text-gray-500">
                        가입한 스터디가 없습니다.
                      </Typography>
                  )}
                </section>
              </div>
          )}

          {/* 멤버 관리 애니메이션 */}
          <AnimatePresence>
            {currentStudy && (
                <motion.div
                    className="absolute top-0 left-0 w-full bg-white z-40"
                    variants={memberVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                  <StudyMember
                      studyId={currentStudy.studyId}
                      isManaging={isManaging}
                      goBack={() => setCurrentStudy(null)}
                  />
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  );
};

export default StudyManagement;
