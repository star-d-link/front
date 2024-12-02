import { useEffect } from "react";
import PropTypes from "prop-types";
const KakaoMap = ({ latitude, longitude }) => {
  useEffect(() => {
    console.log("latitude:", latitude, "longitude:", longitude); // 위도와 경도 값 확인

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 지도 API가 로드되지 않았습니다.");
      return;
    }

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      // 마커를 생성하여 지도에 표시
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 주소 정보 요청 객체 생성
      const geocoder = new window.kakao.maps.services.Geocoder();

      // 좌표로 주소를 가져와 인포윈도우에 표시
      geocoder.coord2Address(longitude, latitude, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div class='p-2 w-auto text-center truncate'>${address}</div>`,
          });
          infowindow.open(map, marker);
        }
      });
    });
  }, [latitude, longitude]);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

KakaoMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
}

export default KakaoMap;
