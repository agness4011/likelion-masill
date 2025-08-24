import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { addSmallGroup, detailBoard } from "../../api/boardApi";

import BoardIcon from "../../assets/write/board.svg";
import BackIcon from "../../assets/write/Arrow-Left.svg";
import BirdIcon from "../../assets/write/smallgroup.png";

import {
  BackBtn,
  HeadTitle,
  HeadDiv,
  Formdiv,
  DetailDiv,
  CategoryBtn,
  Wrapper,
  CategoryArea,
  Categories,
  LeftBtn,
  RightBtn,
  TextStyle,
  InputStyle,
  InputWrapper,
  MapImg,
  HeadBoardImg,
  TimeInput,
  TextArea,
  DateDiv,
  CharCount,
  SubmitBtn,
  ErrorMessage,
  ErrorDiv,
  overlayStyle,
  modalStyle,
  ReigonInput,
  CancleBtn,
  Div,
  MainEventDiv,
  BirdImg,
} from "./WrtieSmall.styled";
import styled from "styled-components";

export default function WriteSmall({ children }) {
  return <WriteWrapper>{children}</WriteWrapper>;
}
const WriteWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
`;

function Head() {
  const navigate = useNavigate();
  return (
    <HeadDiv>
      <BackBtn src={BackIcon} onClick={() => navigate(-1)} />
      <HeadTitle>모임만들기</HeadTitle>
      <HeadBoardImg src={BoardIcon} />
    </HeadDiv>
  );
}
function Form({ children }) {
  return <Formdiv>{children}</Formdiv>;
}

function MainEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await detailBoard(eventId);
        setEvent(res); // API 데이터 중 data만 가져오기
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) return <div>로딩 중...</div>;
  if (!event) return <div>데이터 없음</div>;

  return (
    <div>
      <BirdImg src={BirdIcon} />
      <div style={{ marginBottom: "18px" }}>
        <TextStyle>본행사</TextStyle>
        <MainEventDiv>{event.title}</MainEventDiv>
      </div>
    </div>
  );
}

function SetTitle({ title, setTitle, error, setTouched }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <ErrorDiv>
        <TextStyle>제목</TextStyle>
      </ErrorDiv>

      <InputStyle
        type="text"
        placeholder="이벤트 제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setTouched(true)}
      />
    </div>
  );
}

function SetLocation({ location, setLocation, error, setTouched }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <ErrorDiv>
        <TextStyle>세부 장소</TextStyle>
      </ErrorDiv>

      <InputWrapper>
        <InputStyle
          type="text"
          placeholder={"장소를 입력해주세요"}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        {/* <MapImg src={MapIcon} /> */}
      </InputWrapper>
    </div>
  );
}
function EventDateTimePicker({
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  errors,
}) {
  const [modalConfig, setModalConfig] = useState({ open: false, type: null });

  const openModal = (type) => setModalConfig({ open: true, type });
  const closeModal = () => setModalConfig({ open: false, type: null });

  const handleSelect = (date) => {
    switch (modalConfig.type) {
      case "startDate":
        setStartDate(date);
        break;
      case "endDate":
        setEndDate(date);
        break;
      case "startTime":
        setStartTime(date);
        break;
      case "endTime":
        setEndTime(date);
        break;
      default:
        break;
    }
    closeModal();
  };

  const grayColor = "var(--Gray-700, #959EB7)";
  const blackColor = "#000000";

  return (
    <div>
      <div style={{ display: "flex", gap: "16px", marginBottom: "18px" }}>
        <DateDiv>
          <ErrorDiv>
            <TextStyle>만날 날짜</TextStyle>
          </ErrorDiv>
          <TimeInput
            style={{ color: startDate ? blackColor : grayColor }}
            onClick={() => openModal("startDate")}
          >
            {startDate ? startDate.toLocaleDateString() : "날짜 선택"}
          </TimeInput>
        </DateDiv>

        <DateDiv>
          <ErrorDiv>
            <TextStyle>만날 시간</TextStyle>
          </ErrorDiv>
          <TimeInput
            style={{ color: startTime ? blackColor : grayColor }}
            onClick={() => openModal("startTime")}
          >
            {startTime
              ? startTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "시간 선택"}
          </TimeInput>
        </DateDiv>
      </div>

      {modalConfig.open && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <DatePicker
              selected={
                modalConfig.type === "startDate"
                  ? startDate || new Date()
                  : modalConfig.type === "startTime"
                  ? startTime || new Date()
                  : null
              }
              onChange={handleSelect}
              inline
              showTimeSelect={modalConfig.type.includes("Time")}
              showTimeSelectOnly={modalConfig.type.includes("Time")}
              timeIntervals={10}
              dateFormat={
                modalConfig.type.includes("Date") ? "yyyy-MM-dd" : "HH:mm"
              }
            />
            <button onClick={closeModal} style={{ marginTop: "10px" }}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
function SubmitButton() {
  return (
    <div>
      <SubmitBtn>작성 완료</SubmitBtn>
    </div>
  );
}
function WriteContext({ content, setContent, error, setTouched }) {
  const maxLength = 5000;
  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) setContent(value);
    setTouched(true);
  };

  return (
    <DetailDiv>
      <TextStyle>내용</TextStyle>
      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
      <TextArea
        placeholder="주최하시는 모임에 대해 자세히 설명해주세요!"
        value={content}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        maxLength={maxLength}
      />
      <CharCount>
        {(content || "").length} / {maxLength}
      </CharCount>
    </DetailDiv>
  );
}

// --- 최종 InputForm ---

function InputForm() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false); // ✅ 버튼 클릭 여부 추적

  const isFormValid =
    title.trim() && location.trim() && content.trim() && startDate && startTime;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true); // ✅ 검증 시도

    if (!isFormValid) {
      setErrorMessage("모든 필드를 입력해주세요!");
      return;
    }

    try {
      const startAt = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startTime.getHours(),
        startTime.getMinutes()
      );

      const formatDateTimeLocal = (date) => {
        const pad = (n) => String(n).padStart(2, "0");
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
          date.getDate()
        )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
          date.getSeconds()
        )}`;
      };

      const payload = {
        title,
        content,
        location,
        startAt: formatDateTimeLocal(startAt),
      };

      await addSmallGroup(eventId, payload);
      navigate(`/detail/${eventId}`);
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MainEvent />
      <SetTitle title={title} setTitle={setTitle} />
      <SetLocation location={location} setLocation={setLocation} />
      <EventDateTimePicker
        startDate={startDate}
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
      />
      <WriteContext content={content} setContent={setContent} />

      {/* ✅ 에러 메시지는 "버튼을 누른 후 && 아직 유효하지 않을 때"만 표시 */}
      {touched && !isFormValid && (
        <p style={{ color: "red", marginTop: "8px" }}>
          모든 필드를 입력해주세요!
        </p>
      )}

      <SubmitBtn type="submit" disabled={!isFormValid}>
        작성 완료
      </SubmitBtn>
    </form>
  );
}

WriteSmall.SubmitButton = SubmitButton;
WriteSmall.InputForm = InputForm;

WriteSmall.Form = Form;
WriteSmall.Head = Head;
WriteSmall.SetTitle = SetTitle;

WriteSmall.WriteContext = WriteContext;
