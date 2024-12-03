import { useState, useEffect } from 'react';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import PropTypes from 'prop-types';
import '../css/KakaoMapCreate.css';

function KakaoKeywordMap() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [searchInput, setSearchInput] = useState('이태원 맛집');
  const [keyword, setKeyword] = useState('이태원 맛집');
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null); // 선택된 마커의 인덱스

  const markerImageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
  const imageSize = { width: 36, height: 37 };
  const spriteSize = { width: 36, height: 691 };

  const handleKeywordChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
  };

  useEffect(() => {
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);

        const bounds = new window.kakao.maps.LatLngBounds();
        let newMarkers = [];

        for (let i = 0; i < data.length; i++) {
          newMarkers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(newMarkers);
        setSelectedMarkerIndex(null); // 검색할 때 선택 초기화
        map.setBounds(bounds);
      }
    });
  }, [map, keyword]);

  const EventMarkerContainer = ({ position, content, i }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    // 선택된 마커의 경우만 표시하기 위해 인덱스를 비교하여 결정
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
              setSelectedMarkerIndex(i); // 선택된 마커의 인덱스 설정
            }}
            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)}
        >
          {isVisible && <div style={{ color: '#000' }}>{content}</div>}
        </MapMarker>
    );
  };

  // PropTypes 검증 추가
  EventMarkerContainer.propTypes = {
    position: PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
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
              width: '100%',
              height: '500px',
            }}
            level={3}
            onCreate={setMap}
        >
          {markers.map((marker, i) => (
              <EventMarkerContainer
                  key={`EventMarkerContainer-${marker.position.lat}-${marker.position.lng}`}
                  position={marker.position}
                  content={marker.content}
                  i={i}
              />
          ))}
        </Map>
        <div id="menu_wrap" className="bg_white">
          <div className="option">
            <div>
              <form onSubmit={handleSearchSubmit}>
                키워드 :{' '}
                <input
                    type="text"
                    value={searchInput}
                    onChange={handleKeywordChange}
                    id="keyword"
                    size={15}
                />
                <button type="submit">검색하기</button>
              </form>
            </div>
          </div>
          <hr />
          <ul id="placesList">
            {places.map((item, i) => (
                <li
                    key={i}
                    className={`item ${i === selectedMarkerIndex ? 'selected' : ''}`}
                    onClick={() => {
                      map.panTo(
                          new window.kakao.maps.LatLng(
                              markers[i].position.lat,
                              markers[i].position.lng
                          )
                      );
                      setSelectedMarkerIndex(i); // 리스트 항목 클릭 시 선택된 마커의 인덱스 설정
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
          <div id="pagination"></div>
        </div>
      </div>
  );
}

export default KakaoKeywordMap;