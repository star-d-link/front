import { useState, useEffect } from "react";
import ApiClient from "../auth/ApiClient";
import StudyList from "../components/StudyList";
import StudyMember from "../components/StudyMember";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "framer-motion";

const StudyManagement = () => {
  const [adminStudies, setAdminStudies] = useState([]);
  const [joinedStudies, setJoinedStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStudy, setCurrentStudy] = useState(null);
  const [isManaging, setIsManaging] = useState(false);

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

  const memberVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.5 } },
  };

  return (
      <div className="min-h-screen bg-gray-100">
        {/* 여기 컨테이너에 p-6, max-w-4xl, mx-auto를 적용하여 레이아웃 중앙정렬과 여백 적용 */}
        <div className="p-6 max-w-4xl mx-auto relative">
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

          {/* 멤버 관리 애니메이션을 같은 컨테이너 내부에서 absolute로 처리 */}
          <AnimatePresence>
            {currentStudy && (
                <motion.div
                    className="absolute inset-0 bg-white"
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
