// src/api/productApi.js
import { APIService } from "./axios";

// GET: 게시글 목록
export const fetchAllBoards = async () => {
  try {
    console.log("GET 요청: /events/all");
    const res = await APIService.public.get(`/events/all`);
    return res.data; // 서버에서 반환하는 실제 데이터 구조에 맞게 조정
  } catch (error) {
    console.error("게시물 불러오기 실패:", error);
    throw error;
  }
};

// POST: 이벤트 추가
export const addBoard = async (formData) => {
  console.log("POST 요청: /events");
  const req = await APIService.private.post(`/events`, formData);
  return req.data;
};

// get 지역 정보 받아오기
export const getRegion = async (sido, sigungu) => {
  if (!sido || !sigungu) {
    throw new Error("sido와 sigungu를 모두 전달해야 합니다.");
  }
  console.log("getRegion 호출값:", { sido, sigungu });
  const res = await APIService.public.get(`/regions/id`, {
    params: { sido, sigungu },
  });
  return res.data?.data; // Swagger 응답 구조: data 안에 regionId
};

// 광역시/도 목록 조회
export const getSidos = async () => {
  try {
    console.log("GET 요청: /regions/sidos");
    const res = await APIService.public.get(`/regions/sidos`);
    return res.data?.data; // 실제 데이터 구조에 맞춰 data 사용
  } catch (error) {
    console.error("광역지역 조회 실패:", error);
    throw error;
  }
};

// 특정 광역시/도에 속한 시/군/구 목록 조회
export const getSigungus = async (sido) => {
  if (!sido) {
    throw new Error("sido를 전달해야 합니다.");
  }
  try {
    console.log(`GET 요청: /regions/sidos/${sido}`);
    const res = await APIService.public.get(`/regions/sidos/${sido}`); // ✅ 템플릿 리터럴 사용
    return res.data?.data; // 실제 데이터 구조에 맞춤
  } catch (error) {
    console.error("시/군/구 조회 실패:", error);
    throw error;
  }
};

// // PUT: 전체 수정
// export const updateBoards = async (type, id, product) => {
//   console.log("PUT 요청:", type);
//   const data = await APIService.public.put(`/${type}/${id}`, product);
//   return data;
// };

// // PATCH: 부분 수정
// export const patchBoards = async (type, id, partial) => {
//   console.log("PATCH 요청:", type);
//   const data = await APIService.public.patch(`/${type}/${id}`, partial);
//   return data;
// };

// // DELETE: 삭제
// export const deleteBoards = async (type, id) => {
//   console.log("DELETE 요청:", type);
//   const data = await APIService.public.delete(`/${type}/${id}`);
//   return data;
// };
