import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {
  retouchSmallGroup,
  detailBoard,
  smallGroupDetail,
} from "../../api/boardApi";

import BoardIcon from "../../assets/write/board.svg";
import BackIcon from "../../assets/write/Arrow-Left.svg";
import BirdIcon from "../../assets/write/smallgroup.png";

import {
  BackBtn,
  HeadTitle,
  HeadDiv,
  Formdiv,
  DetailDiv,
  TextStyle,
  InputStyle,
  InputWrapper,
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
  Div,
  MainEventDiv,
  BirdImg,
} from "./WrtieSmall.styled";

export default function RetouchSmall({ children }) {
  return <div>{children}</div>;
}

function Head() {
  const navigate = useNavigate();
  return (
    <HeadDiv>
      <BackBtn src={BackIcon} onClick={() => navigate(-1)} />
      <HeadTitle>모임 수정하기</HeadTitle>
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
      <div>
        <TextStyle>본행사</TextStyle>
        <MainEventDiv>{event.title}</MainEventDiv>
      </div>
    </div>
  );
}

function SetTitle({ title, setTitle, error, setTouched }) {
  return (
    <Div>
      <ErrorDiv>
        <TextStyle>제목</TextStyle>
      </ErrorDiv>

      <InputStyle
        type="text"
        placeholder="모임 제목 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setTouched(true)}
      />
    </Div>
  );
}

function SetLocation({ location, setLocation, error, setTouched }) {
  return (
    <div>
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
      <div style={{ display: "flex", gap: "16px" }}>
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
        placeholder="내용을 입력하세요..."
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
  const { eventId, clubId } = useParams();
  const [club, setClub] = useState("");

  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await smallGroupDetail(eventId, clubId);
        setClub(res);

        // ✅ 초기값 세팅
        setTitle(res.title || "");
        setLocation(res.location || "");
        setContent(res.content || "");
        if (res.startAt) {
          const start = new Date(res.startAt);
          setStartDate(start);
          setStartTime(start);
        }
      } catch (error) {
        console.error("이벤트 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId, clubId]);

  // --- 기존 state ---

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [dateErrors, setDateErrors] = useState({});
  const [formError, setFormError] = useState("");

  // --- 유효성 검사 ---
  const validateForm = () => {
    let valid = true;

    if (!title.trim()) {
      setTitleError("제목을 입력해주세요!");
      valid = false;
    } else setTitleError("");

    if (!location.trim()) {
      setLocationError("장소를 입력해주세요!");
      valid = false;
    } else setLocationError("");

    if (!content.trim()) {
      setContentError("내용을 입력해주세요!");
      valid = false;
    } else setContentError("");

    const newDateErrors = {};
    if (!startDate) newDateErrors.startDate = "시작 날짜를 선택해주세요!";

    if (!startTime) newDateErrors.startTime = "시작 시간을 선택해주세요!";
    setDateErrors(newDateErrors);

    if (Object.keys(newDateErrors).length > 0) valid = false;

    if (!valid) {
      setFormError("모든 항목을 기입해주세요!");
    } else {
      setFormError("");
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setFormError("");

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

      const formData = new FormData();
      const payload = {
        title,
        content,
        location,
        startAt: formatDateTimeLocal(startAt),
      };

      const result = await retouchSmallGroup(eventId, clubId, payload);

      console.log("서버 응답:", result);

      navigate(`/detail/${eventId}`); // 🔥 소모임 생성 후 본행사 상세 페이지로 이동
    } catch (error) {
      console.error("저장 실패:", error);
      setFormError("서버 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MainEvent></MainEvent>
      {/* 제목 */}
      <SetTitle
        title={title}
        setTitle={setTitle}
        error={titleError}
        setTouched={() => {}}
      />
      {/* 장소 */}
      <SetLocation
        location={location}
        setLocation={setLocation}
        error={locationError}
        setTouched={() => {}}
      />
      <EventDateTimePicker
        startDate={startDate}
        setStartDate={setStartDate}
        startTime={startTime}
        setStartTime={setStartTime}
        errors={dateErrors}
      />
      {/* 내용 */}
      <WriteContext
        content={content}
        setContent={setContent}
        error={contentError}
        setTouched={() => {}}
      />
      {/* 에러 메시지 */}
      <ErrorDiv>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
      </ErrorDiv>

      <SubmitBtn type="submit">수정 완료</SubmitBtn>
    </form>
  );
}
RetouchSmall.SubmitButton = SubmitButton;
RetouchSmall.InputForm = InputForm;

RetouchSmall.Form = Form;
RetouchSmall.Head = Head;
RetouchSmall.SetTitle = SetTitle;

RetouchSmall.WriteContext = WriteContext;
