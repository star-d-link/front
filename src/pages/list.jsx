import { useEffect, useState } from "react";
import axios from "axios";
import StudyCard from "../components/StudyCard";

const List = () => {
  const [studies, setStudies] = useState([]);
  const [currentPage] = useState(1);
  const [error, setError] = useState(null);
  const pageSize = 10;


  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const params = {
          page: currentPage - 1,
          size: pageSize,
          sort: "createDate,DESC",
        };

        const response = await axios.get("http://localhost:8080/study/list", { params });
        setStudies(response.data.data.content || []);
      } catch {
        setError("스터디 목록을 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchStudies().catch((e) => {
      console.error("스터디 데이터를 가져오는 중 오류 발생:", e);
    });
  }, [currentPage]);


  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="">
        <h1 className="text-2xl font-bold text-center">스터디 목록</h1>
        <div className="">
          {studies.length > 0 ? (
              studies.map((study) => (
                  <StudyCard key={study.studyId} study={study}/> // StudyCard 컴포넌트 사용
              ))
          ) : (
              <div>스터디 목록이 없습니다.</div>
          )}
        </div>
      </div>
  );
};

export default List;