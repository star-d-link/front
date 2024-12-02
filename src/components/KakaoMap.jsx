import { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      // 스크립트가 로드된 후 지도 생성
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 초기 좌표
        level: 3,
      };
      new window.kakao.maps.Map(container, options);
    }
  }, []);

  return (
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
  );
};

export default KakaoMap;