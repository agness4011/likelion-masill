import { APIService, publicAPI, privateAPI, multipartAPI } from "./axios";

/* --- API 호출 --- */

export const smallGroupDetail = async (eventId, clubId) => {
  try {
    const res = await publicAPI.get(`/events/${eventId}/clubs/${clubId}`);
    return res.data.data; // data 전체 반환
  } catch (error) {
    console.error("소모임 상세 조회 실패", error);
    throw error;
  }
};

export const smallGroupDetailImg = async (eventId, clubId) => {
  try {
    const res = await privateAPI.get(`/events/${eventId}/clubs/${clubId}`);
    return res.data.data; // data 전체 반환
  } catch (error) {
    console.error("이벤트 이미지 조회 실패", error);
    throw error;
  }
};

export const smallFavorite = async (eventId, clubId) => {
  try {
    const res = await privateAPI.post(
      `/events/${eventId}/clubs/${clubId}/favorites`
    );
    return res.data.data; // 서버에서 내려주는 favorite, favoriteCount 포함
  } catch (error) {
    console.error("좋아요 요청 실패", error);
    throw error;
  }
};

export const fetchSmallGroup = async (
  eventId,
  page = 1,
  size = 20,
  sortBy = "createdAt",
  sortDir = "desc"
) => {
  try {
    console.log(`GET 요청: /events/${eventId}/clubs/all`);
    const res = await privateAPI.get(`/events/${eventId}/clubs/all`, {
      params: { eventId, page, size, sortBy, sortDir },
    });
    return res.data; // res.data 안에 content 배열이 있는지 확인
  } catch (error) {
    console.error("게시물 불러오기 실패:", error);
    throw error;
  }
};

export const addReply = async (eventId, commentId, content) => {
  try {
    const res = await privateAPI.post(
      `/events/${eventId}/${commentId}/replies`,
      {
        content,
      }
    );
    return res.data.data; // ✅ 서버가 data.data 안에 새 댓글 줄 가능성 반영
  } catch (error) {
    console.error("댓글 작성 실패", error);
    throw error;
  }
};

export const showReplies = async (eventId, commentId) => {
  try {
    const res = await publicAPI.get(`/events/${eventId}/${commentId}/replies`);
    return res.data.data.items;
  } catch (error) {
    console.error("이벤트 댓글 조회 실패", error);
    throw error;
  }
};

export const addComment = async (eventId, content) => {
  try {
    const res = await privateAPI.post(`/events/${eventId}/comments`, {
      content,
    });
    return res.data.data; // ✅ 서버가 data.data 안에 새 댓글 줄 가능성 반영
  } catch (error) {
    console.error("댓글 작성 실패", error);
    throw error;
  }
};

export const commentBoards = async (eventId) => {
  try {
    const res = await publicAPI.get(`/events/${eventId}/comments`);
    return res.data.data.items;
  } catch (error) {
    console.error("이벤트 댓글 조회 실패", error);
    throw error;
  }
};

export const detailImg = async (eventId) => {
  try {
    const res = await privateAPI.get(`/events/${eventId}`);
    return res.data; // 실제 이벤트 데이터 반환
  } catch (error) {
    console.error("이벤트 이미지 조회 실패", error);
    throw error;
  }
};

export const detailBoard = async (eventId) => {
  try {
    console.log(`=== detailBoard API 호출 ===`);
    console.log(`요청 URL: /events/${eventId}`);
    const res = await privateAPI.get(`/events/${eventId}`);
    console.log(`API 응답 전체:`, res);
    console.log(`API 응답 data:`, res.data);
    console.log(`API 응답 data.data:`, res.data.data);
    console.log(`regionId 값:`, res.data.data?.regionId);
    return res.data.data; // 실제 이벤트 데이터 반환
  } catch (error) {
    console.error("이벤트 조회 실패", error);
    throw error;
  }
};
export const changeRegion = async (regionId) => {
  try {
    const res = await privateAPI.patch(`/users/me/region`, {
      regionId, // body에 regionId 전달
    });
    return res.data; // 응답 그대로 반환
  } catch (error) {
    console.error("지역 이벤트 실패", error);
    throw error;
  }
};
// GET: 게시글 목록
export const fetchAllBoards = async (
  regionId,
  page = 1,
  size = 20,
  sortBy = "createdAt",
  sortDir = "desc"
) => {
  try {
    console.log(
      `GET 요청: /events/all?regionId=${regionId}&page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
    const res = await privateAPI.get(`/events/all`, {
      params: { regionId, page, size, sortBy, sortDir },
    });
    return res.data; // res.data 안에 content 배열이 있는지 확인
  } catch (error) {
    console.error("게시물 불러오기 실패:", error);
    throw error;
  }
};

// GET: 모든 게시글 (검색용)
export const fetchAllBoardsForSearch = async (
  page = 1,
  size = 100,
  sortBy = "createdAt",
  sortDir = "desc"
) => {
  try {
    console.log(
      `GET 요청: /events/all/search?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
    const res = await privateAPI.get(`/events/all/search`, {
      params: { page, size, sortBy, sortDir },
    });
    return res.data;
  } catch (error) {
    console.error("전체 게시물 불러오기 실패:", error);
    throw error;
  }
};

// GET: 내가 작성한 게시글 목록
export const fetchMyPosts = async (
  page = 1,
  size = 20,
  sortBy = "createdAt",
  sortDir = "desc"
) => {
  try {
    console.log(
      `GET 요청: /users/me/posts?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
    const res = await privateAPI.get(`/users/me/posts`, {
      params: { page, size, sortBy, sortDir },
    });
    return res.data;
  } catch (error) {
    console.error("내가 작성한 게시물 불러오기 실패:", error);
    throw error;
  }
};

// GET: 내가 관심있는 게시글 목록
export const fetchMyFavorites = async (
  page = 1,
  size = 20,
  sortBy = "createdAt",
  sortDir = "desc"
) => {
  try {
    console.log(
      `GET 요청: /users/me/favorites?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
    const res = await privateAPI.get(`/users/me/favorites`, {
      params: { page, size, sortBy, sortDir },
    });
    return res.data;
  } catch (error) {
    console.error("관심있는 게시물 불러오기 실패:", error);
    throw error;
  }
};

// boardApi.js
export const eventTypeBoards = async (eventType, regionId) => {
  try {
    console.log("GET 요청: /events/eventType/list");

    const params = {
      regionId,
      eventType, // ENUM 값 직접 받음
      page: 1,
      size: 20,
      sortBy: "createdAt",
      sortDir: "desc",
    };

    const res = await privateAPI.get(`/events/eventType/list`, {
      params,
    });

    return res.data;
  } catch (error) {
    console.error("게시물 불러오기 실패:", error);
    throw error;
  }
};

// POST: 게시글 이벤트 추가
export const addBoard = async (formData) => {
  try {
    console.log("POST 요청: /events");
    console.log("addBoard 호출됨 - FormData 내용:");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // private 인스턴스가 없으면 그냥 multipartAPI로
    const res = await multipartAPI.private.post("/events", formData);

    return res.data;
  } catch (error) {
    console.error("addBoard 에러:", error);
    console.error("에러 응답:", error.response?.data);
    throw error;
  }
};

// 지역 API
export const getRegions = async () => {
  try {
    console.log("지역 목록 API 호출 시작");
    const { data } = await publicAPI.get("/regions/sidos");
    console.log("지역 목록 API 성공:", data);

    // API 응답 구조에 맞게 처리
    if (data && data.data && data.data.items) {
      // 백엔드 응답 구조: { success: true, data: { items: [...] } }
      return data.data.items.map((item) => item.sido);
    } else if (Array.isArray(data)) {
      // 직접 배열로 반환되는 경우
      return data;
    } else {
      console.warn("예상하지 못한 지역 데이터 구조:", data);
      return [];
    }
  } catch (apiError) {
    console.error("지역 목록 API 실패:", apiError);
    console.error("API 오류 상세:", {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message,
    });

    const status = apiError.response?.status;

    // API 실패 시 더미 데이터 사용
    if ([400, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 지역 데이터 사용`);

      return await new Promise((resolve) => {
        setTimeout(() => {
          const dummyRegions = [
            "서울특별시",
            "부산광역시",
            "대구광역시",
            "인천광역시",
            "광주광역시",
            "대전광역시",
            "울산광역시",
            "세종특별자치시",
            "경기도",
            "강원특별자치도",
            "충청북도",
            "충청남도",
            "전북특별자치도",
            "전라남도",
            "경상북도",
            "경상남도",
            "제주특별자치도",
          ];
          resolve(dummyRegions);
        }, 300);
      });
    }

    throw apiError;
  }
};

export const getDistricts = async (region) => {
  try {
    console.log("구/군 목록 API 호출 시작:", region);
    const { data } = await publicAPI.get(`/regions/sidos/${region}/sigungus`);
    console.log("구/군 목록 API 성공:", data);

    // API 응답 구조에 맞게 처리
    if (data && data.data && data.data.items) {
      // 백엔드 응답 구조: { success: true, data: { items: [...] } }
      return data.data.items.map((item) => item.sigungu);
    } else if (Array.isArray(data)) {
      // 직접 배열로 반환되는 경우
      return data;
    } else {
      console.warn("예상하지 못한 구/군 데이터 구조:", data);
      return [];
    }
  } catch (apiError) {
    console.error("구/군 목록 API 실패:", apiError);
    console.error("API 오류 상세:", {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message,
    });

    const status = apiError.response?.status;

    // API 실패 시 더미 데이터 사용
    if ([400, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 구/군 데이터 사용`);

      return await new Promise((resolve) => {
        setTimeout(() => {
          // 서울시 구/군 목록 (예시)
          const dummyDistricts = {
            서울특별시: [
              "강남구",
              "강동구",
              "강북구",
              "강서구",
              "관악구",
              "광진구",
              "구로구",
              "금천구",
              "노원구",
              "도봉구",
              "동대문구",
              "동작구",
              "마포구",
              "서대문구",
              "서초구",
              "성동구",
              "성북구",
              "송파구",
              "양천구",
              "영등포구",
              "용산구",
              "은평구",
              "종로구",
              "중구",
              "중랑구",
            ],
            부산광역시: [
              "강서구",
              "금정구",
              "남구",
              "동구",
              "동래구",
              "부산진구",
              "북구",
              "사상구",
              "사하구",
              "서구",
              "수영구",
              "연제구",
              "영도구",
              "중구",
              "해운대구",
              "기장군",
            ],
            대구광역시: [
              "남구",
              "달서구",
              "동구",
              "북구",
              "서구",
              "수성구",
              "중구",
              "달성군",
            ],
            인천광역시: [
              "계양구",
              "남구",
              "남동구",
              "동구",
              "부평구",
              "서구",
              "연수구",
              "중구",
              "강화군",
              "옹진군",
            ],
            광주광역시: ["광산구", "남구", "동구", "북구", "서구"],
            대전광역시: ["대덕구", "동구", "서구", "유성구", "중구"],
            울산광역시: ["남구", "동구", "북구", "중구", "울주군"],
            세종특별자치시: ["세종특별자치시"],
            경기도: [
              "수원시",
              "성남시",
              "의정부시",
              "안양시",
              "부천시",
              "광명시",
              "평택시",
              "동두천시",
              "안산시",
              "고양시",
              "과천시",
              "구리시",
              "남양주시",
              "오산시",
              "시흥시",
              "군포시",
              "의왕시",
              "하남시",
              "용인시",
              "파주시",
              "이천시",
              "안성시",
              "김포시",
              "화성시",
              "광주시",
              "여주시",
              "양평군",
              "고양군",
              "연천군",
              "포천군",
              "가평군",
            ],
            강원특별자치도: [
              "춘천시",
              "원주시",
              "강릉시",
              "동해시",
              "태백시",
              "속초시",
              "삼척시",
              "홍천군",
              "횡성군",
              "영월군",
              "평창군",
              "정선군",
              "철원군",
              "화천군",
              "양구군",
              "인제군",
              "고성군",
              "양양군",
            ],
            충청북도: [
              "청주시",
              "충주시",
              "제천시",
              "보은군",
              "옥천군",
              "영동군",
              "증평군",
              "진천군",
              "괴산군",
              "음성군",
              "단양군",
            ],
            충청남도: [
              "천안시",
              "공주시",
              "보령시",
              "아산시",
              "서산시",
              "논산시",
              "계룡시",
              "당진시",
              "금산군",
              "부여군",
              "서천군",
              "청양군",
              "홍성군",
              "예산군",
              "태안군",
            ],
            전북특별자치도: [
              "전주시",
              "군산시",
              "익산시",
              "정읍시",
              "남원시",
              "김제시",
              "완주군",
              "진안군",
              "무주군",
              "장수군",
              "임실군",
              "순창군",
              "고창군",
              "부안군",
            ],
            전라남도: [
              "목포시",
              "여수시",
              "순천시",
              "나주시",
              "광양시",
              "담양군",
              "곡성군",
              "구례군",
              "고흥군",
              "보성군",
              "화순군",
              "장흥군",
              "강진군",
              "해남군",
              "영암군",
              "무안군",
              "함평군",
              "영광군",
              "장성군",
              "완도군",
              "진도군",
              "신안군",
            ],
            경상북도: [
              "포항시",
              "경주시",
              "김천시",
              "안동시",
              "구미시",
              "영주시",
              "영천시",
              "상주시",
              "문경시",
              "경산시",
              "군위군",
              "의성군",
              "청송군",
              "영양군",
              "영덕군",
              "청도군",
              "고령군",
              "성주군",
              "칠곡군",
              "예천군",
              "봉화군",
              "울진군",
              "울릉군",
            ],
            경상남도: [
              "창원시",
              "진주시",
              "통영시",
              "사천시",
              "김해시",
              "밀양시",
              "거제시",
              "양산시",
              "의령군",
              "함안군",
              "창녕군",
              "고성군",
              "남해군",
              "하동군",
              "산청군",
              "함양군",
              "거창군",
              "합천군",
            ],
            제주특별자치도: ["제주시", "서귀포시"],
          };

          resolve(dummyDistricts[region] || []);
        }, 300);
      });
    }

    throw apiError;
  }
};

// 지역 ID 조회 API
export const getRegionId = async (sido, sigungu) => {
  try {
    // 파라미터 검증
    if (!sido || !sigungu) {
      console.error("지역 ID 조회 실패: 필수 파라미터 누락", { sido, sigungu });
      throw new Error("sido와 sigungu는 필수 파라미터입니다.");
    }

    console.log("지역 ID 조회 API 호출 시작:", { sido, sigungu });
    const { data } = await publicAPI.get("/regions/id", {
      params: { sido, sigungu },
    });
    console.log("지역 ID 조회 API 성공:", data);

    // API 응답 구조에 맞게 처리 (Swagger 문서 기반)
    console.log("지역 ID API 응답 데이터:", data);

    if (data && typeof data === "object") {
      // Swagger 문서의 응답 구조: { success: true, code: 200, message: "...", data: { regionId: 141 } }
      if (data.success && data.data && data.data.regionId !== undefined) {
        console.log("지역 ID 추출 성공:", data.data.regionId);
        return data.data.regionId;
      }
      // 다른 가능한 구조들
      else if (data.regionId !== undefined) {
        console.log("지역 ID 직접 추출:", data.regionId);
        return data.regionId;
      } else if (data.data && data.data.regionId !== undefined) {
        console.log("지역 ID data에서 추출:", data.data.regionId);
        return data.data.regionId;
      }
    } else if (typeof data === "number") {
      // 직접 숫자로 반환되는 경우
      console.log("지역 ID 직접 숫자:", data);
      return data;
    }

    console.warn("예상하지 못한 지역 ID 데이터 구조:", data);
    return null;
  } catch (apiError) {
    console.error("지역 ID 조회 API 실패:", apiError);
    console.error("API 오류 상세:", {
      status: apiError.response?.status,
      statusText: apiError.response?.statusText,
      data: apiError.response?.data,
      message: apiError.message,
    });

    const status = apiError.response?.status;

    // API 실패 시 더미 데이터 사용
    if ([400, 500].includes(status)) {
      console.warn(`${status} 오류로 인해 더미 지역 ID 사용`);

      return await new Promise((resolve) => {
        setTimeout(() => {
          // 더미 지역 ID 매핑 (실제 행정구역 코드)
          const dummyRegionIds = {
            서울특별시: {
              강남구: 11680,
              강동구: 11740,
              강북구: 11305,
              강서구: 11500,
              관악구: 11620,
              광진구: 11215,
              구로구: 11530,
              금천구: 11545,
              노원구: 11350,
              도봉구: 11320,
              동대문구: 11110,
              동작구: 11590,
              마포구: 11440,
              서대문구: 11410,
              서초구: 11650,
              성동구: 11200,
              성북구: 11290,
              송파구: 11710,
              양천구: 11470,
              영등포구: 11560,
              용산구: 11170,
              은평구: 11380,
              종로구: 11110,
              중구: 11140,
              중랑구: 11260,
            },
            부산광역시: {
              강서구: 26440,
              금정구: 26410,
              남구: 26290,
              동구: 26170,
              동래구: 26260,
              부산진구: 26140,
              북구: 26320,
              사상구: 26530,
              사하구: 26380,
              서구: 26180,
              수영구: 26500,
              연제구: 26470,
              영도구: 26200,
              중구: 26110,
              해운대구: 26350,
              기장군: 26710,
            },
            대구광역시: {
              남구: 27200,
              달서구: 27290,
              동구: 27140,
              북구: 27230,
              서구: 27170,
              수성구: 27260,
              중구: 27110,
              달성군: 27710,
            },
            인천광역시: {
              계양구: 28245,
              남구: 28200,
              남동구: 28260,
              동구: 28140,
              부평구: 28237,
              서구: 28260,
              연수구: 28245,
              중구: 28110,
              강화군: 28710,
              옹진군: 28720,
            },
            광주광역시: {
              광산구: 29200,
              남구: 29140,
              동구: 29110,
              북구: 29170,
              서구: 29155,
            },
            대전광역시: {
              대덕구: 30230,
              동구: 30110,
              서구: 30170,
              유성구: 30200,
              중구: 30140,
            },
            울산광역시: {
              남구: 31140,
              동구: 31170,
              북구: 31200,
              중구: 31110,
              울주군: 31710,
            },
            세종특별자치시: {
              세종특별자치시: 36110,
            },
            경기도: {
              수원시: 41110,
              성남시: 41130,
              의정부시: 41150,
              안양시: 41170,
              부천시: 41190,
              광명시: 41210,
              평택시: 41220,
              동두천시: 41250,
              안산시: 41270,
              고양시: 41280,
              과천시: 41290,
              구리시: 41310,
              남양주시: 41360,
              오산시: 41370,
              시흥시: 41390,
              군포시: 41410,
              의왕시: 41430,
              하남시: 41450,
              용인시: 41460,
              파주시: 41480,
              이천시: 41500,
              안성시: 41550,
              김포시: 41570,
              화성시: 41590,
              광주시: 41610,
              여주시: 41630,
              양평군: 41830,
              고양군: 41800,
              연천군: 41800,
              포천군: 41650,
              가평군: 41820,
            },
          };

          const regionId = dummyRegionIds[sido]?.[sigungu] || 11680; // 기본값: 서울 강남구
          resolve(regionId);
        }, 300);
      });
    }

    throw apiError;
  }
};

export const getRegionName = async (regionId) => {
  try {
    const response = await privateAPI.get(`/regions/${regionId}`, {
      params: { regionId }, // 쿼리 파라미터로도 전달
      headers: { Accept: "application/json" }, // Authorization은 인터셉터에서 자동 처리
    });
    return response.data.data; // sido, sigungu 포함
  } catch (error) {
    console.error("지역 정보 조회 실패:", error);
    return null;
  }
};

export const getMyRegionName = async (regionId) => {
  try {
    const response = await privateAPI.get(`/regions/${regionId}`, {
      params: { regionId },
      headers: { Accept: "application/json" },
    });

    // sigungu만 반환
    return response.data.data.sigungu;
  } catch (error) {
    console.error("지역 정보 조회 실패:", error);
    return null;
  }
};

// 게시글 수정 API
export const updateEvent = async (eventId, formData) => {
  try {
    console.log("PUT 요청: /events/" + eventId);
    console.log("updateEvent 호출됨 - FormData 내용:");

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // addBoard와 동일한 방식으로 multipartAPI.private 사용
    const res = await multipartAPI.private.put(`/events/${eventId}`, formData);
    return res.data;
  } catch (error) {
    console.error("updateEvent 에러:", error);
    console.error("에러 응답:", error.response?.data);
    throw error;
  }
};
