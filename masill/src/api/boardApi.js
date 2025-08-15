import { APIService, publicAPI, privateAPI, multipartAPI } from "./axios";

// GET: 게시글 목록
export const fetchAllBoards = async () => {
  try {
    console.log("GET 요청: /events/all");
    const res = await APIService.public.get(`/events/all`);
    return res.data;
  } catch (error) {
    console.error("게시물 불러오기 실패:", error);
    throw error;
  }
};

// POST: 이벤트 추가
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
export const eventBoards = async (eventType) => {
  try {
    console.log("GET 요청: /events/eventType/list");
    const res = await APIService.public.get(`/events/eventType/list`);
    return res.data;
  } catch (error) {
    console.error("이벤트 게시물 불러오기 실패:", error);
    throw error;
  }
};
