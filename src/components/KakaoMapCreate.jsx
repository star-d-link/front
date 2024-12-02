import { useEffect, useState } from "react";

const KakaoMapCreate = () => {
  const [keyword, setKeyword] = useState("이태원 맛집");
  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 지도 API가 로드되지 않았습니다.");
      return;
    }

    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 서울 좌표
        level: 3,
      };
      const newMap = new window.kakao.maps.Map(container, options);
      const places = new window.kakao.maps.services.Places();

      setMap(newMap);
      setPlacesService(places);
    });
  }, []);

  // 검색 요청 함수
  const searchPlaces = (e) => {
    e.preventDefault();

    if (!keyword.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    if (!placesService) {
      console.error("Places 서비스가 초기화되지 않았습니다.");
      return;
    }

    placesService.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        displayPlaces(data);
        setPagination(pagination);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    });
  };

  // 검색 결과 목록과 마커를 표출하는 함수
  const displayPlaces = (places) => {
    setPlaces(places);

    // 이전에 생성된 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const bounds = new window.kakao.maps.LatLngBounds();

    const newMarkers = places.map((place, index) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      bounds.extend(position);

      const marker = new window.kakao.maps.Marker({
        position,
      });

      marker.setMap(map);

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, place.place_name);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.close();
      });

      return marker;
    });

    setMarkers(newMarkers);
    map.setBounds(bounds);
  };

  // 인포윈도우를 표시하는 함수
  const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

  const displayInfowindow = (marker, title) => {
    const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
    infowindow.setContent(content);
    infowindow.open(map, marker);
  };

  // 검색결과 목록과 마커를 클릭했을 때 호출되는 함수
  const getListItem = (index, place) => (
      <li
          key={index}
          className="item"
          onMouseOver={() => displayInfowindow(markers[index], place.place_name)}
          onMouseOut={() => infowindow.close()}
      >
        <span className={`markerbg marker_${index + 1}`}></span>
        <div className="info">
          <h5>{place.place_name}</h5>
          {place.road_address_name ? (
              <>
                <span>{place.road_address_name}</span>
                <span className="jibun gray">{place.address_name}</span>
              </>
          ) : (
              <span>{place.address_name}</span>
          )}
          <span className="tel">{place.phone}</span>
        </div>
      </li>
  );

  return (
      <div className="map_wrap" style={{ position: "relative", width: "100%", height: "500px" }}>
        <div id="map" style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}></div>

        {/* 검색 창 및 목록 */}
        <div
            id="menu_wrap"
            className="bg_white"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "250px",
              margin: "10px 0 30px 10px",
              padding: "5px",
              overflowY: "auto",
              background: "rgba(255, 255, 255, 0.7)",
              zIndex: 1,
              fontSize: "12px",
              borderRadius: "10px",
            }}
        >
          <div className="option" style={{ textAlign: "center" }}>
            <form onSubmit={searchPlaces}>
              키워드 :{" "}
              <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  size="15"
                  style={{ padding: "5px" }}
              />
              <button type="submit" style={{ marginLeft: "5px", padding: "5px" }}>
                검색하기
              </button>
            </form>
          </div>
          <hr />
          <ul id="placesList" style={{ listStyle: "none", padding: 0 }}>
            {places.map((place, index) => getListItem(index, place))}
          </ul>
          <div id="pagination" style={{ textAlign: "center", margin: "10px auto" }}>
            {pagination &&
                Array.from({ length: pagination.last }, (_, i) => (
                    <a
                        href="#"
                        key={i}
                        onClick={(e) => {
                          e.preventDefault();
                          pagination.gotoPage(i + 1);
                        }}
                        style={{ marginRight: "10px", fontWeight: pagination.current === i + 1 ? "bold" : "normal" }}
                    >
                      {i + 1}
                    </a>
                ))}
          </div>
        </div>
      </div>
  );
};

export default KakaoMapCreate;