import { useState, useEffect } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';
import '../css/KakaoMapCreate.css';

function KakaoKeywordMap({ onLocationSelect }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // 검색 입력값
  const [keyword, setKeyword] = useState(""); // 실제 검색에 사용되는 값
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null); // 선택된 마커의 인덱스

  const markerImageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
  const imageSize = { width: 36, height: 37 };
  const spriteSize = { width: 36, height: 691 };

  const handleKeywordChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // 기본 새로고침 방지
    if (!searchInput.trim()) {
      alert("키워드를 입력하세요.");
      return;
    }
    setKeyword(searchInput); // 검색어 업데이트
  };

  useEffect(() => {
    if (!map || !keyword) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);

        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers = data.map((place) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          bounds.extend(position);

          return {
            position: { lat: place.y, lng: place.x },
            content: place.place_name,
            roadAddress: place.road_address_name,
            address: place.address_name,
          };
        });

        setMarkers(newMarkers);
        setSelectedMarkerIndex(null); // 검색 결과 초기화
        map.setBounds(bounds); // 결과에 맞게 지도 범위 조정
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  }, [map, keyword]);

  const EventMarkerContainer = ({ position, content, roadAddress, address, i }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    // 선택된 마커만 강조
    if (selectedMarkerIndex !== null && selectedMarkerIndex !== i) {
      return null;
    }

    return (
        <MapMarker
            position={position}
            image={{
              src: markerImageSrc,
              size: imageSize,
              options: {
                spriteSize: spriteSize,
                spriteOrigin: new window.kakao.maps.Point(0, i * 46 + 10),
                offset: new window.kakao.maps.Point(13, 37),
              },
            }}
            onClick={(marker) => {
              map.panTo(marker.getPosition());
              setSelectedMarkerIndex(i); // 마커 선택
              if (onLocationSelect) {
                onLocationSelect(position.lat, position.lng, roadAddress || address);
              }
            }}
            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)}
        >
          {isVisible && <div style={{ color: "#000" }}>{content}</div>}
        </MapMarker>
    );
  };

  // PropTypes 검증
  EventMarkerContainer.propTypes = {
    position: PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    roadAddress: PropTypes.string,
    address: PropTypes.string,
    i: PropTypes.number.isRequired,
  };

  return (
      <div className="map_wrap">
        <Map
            center={{
              lat: 37.566826,
              lng: 126.9786567,
            }}
            style={{
              width: "100%",
              height: "500px",
            }}
            level={3}
            onCreate={setMap}
        >
          {markers.map((marker, i) => (
              <EventMarkerContainer
                  key={`EventMarkerContainer-${marker.position.lat}-${marker.position.lng}`}
                  position={marker.position}
                  content={marker.content}
                  roadAddress={marker.roadAddress}
                  address={marker.address}
                  i={i}
              />
          ))}
        </Map>
        <div id="menu_wrap" className="bg_white">
          <div className="option">
            <div>
              {/* 검색 UI에서 <form> 대신 <div> 사용 */}
              <div onSubmit={handleSearchSubmit}>
                키워드 :{" "}
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleKeywordChange}
                    id="keyword"
                    size={15}
                />
                <button type="button" onClick={handleSearchSubmit}>
                  검색하기
                </button>
              </div>
            </div>
          </div>
          <hr />
          <ul id="placesList">
            {places.map((item, i) => (
                <li
                    key={i}
                    className={`item ${i === selectedMarkerIndex ? "selected" : ""}`}
                    onClick={() => {
                      map.panTo(
                          new window.kakao.maps.LatLng(
                              markers[i].position.lat,
                              markers[i].position.lng
                          )
                      );
                      setSelectedMarkerIndex(i); // 선택된 마커의 인덱스 설정
                      if (onLocationSelect) {
                        onLocationSelect(
                            markers[i].position.lat,
                            markers[i].position.lng,
                            item.road_address_name || item.address_name
                        );
                      }
                    }}
                >
                  <span className={`markerbg marker_${i + 1}`}></span>
                  <div className="info">
                    <h5>{item.place_name}</h5>
                    {item.road_address_name ? (
                        <>
                          <span>{item.road_address_name}</span>
                          <span className="jibun gray">{item.address_name}</span>
                        </>
                    ) : (
                        <span>{item.address_name}</span>
                    )}
                    <span className="tel">{item.phone}</span>
                  </div>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default KakaoKeywordMap;