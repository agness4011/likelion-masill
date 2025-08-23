import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "@assets/logo/main/main-arrowleft.svg";
import HeartIcon from "@logo/myhome/heart.svg";
import ChatIcon from "@logo/myhome/chat.svg";
import Fullheart from "@assets/logo/mainImg/fullheart.png";
import Heart from "@assets/logo/mainImg/heart.png";
import Comment from "@assets/logo/mainImg/commant.png";
import PromotionIcon from "@logo/myhome/promotion.svg";
import dayjs from "dayjs";
import { fetchMyPosts, UpPost } from "../../api/boardApi";
import {
  BoardTitleH1,
  BoardLocationP,
  BoardDateP,
} from "../../components/main/MainStyles.styled";

const Container = styled.div`
  width: 393px;
  height: 852px;
  background: #fff;
  padding: 0;
  margin: 0;
  overflow: hidden;
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: white;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const Content = styled.div`
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(852px - 60px); /* 전체 높이에서 헤더 높이 제외 */
  box-sizing: border-box;
`;

const PostCard = styled.div`
  border-bottom: 1px solid #ddd;
  margin-top: 13px;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
  width: 380px;
  margin-bottom: 0;
`;

const ImageScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 4px;
  padding-bottom: 10px;
  margin-top: 20px;

  /* 스크롤바 스타일 (선택) */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
`;

const BoardImage = styled.img`
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  border-radius: 6px;
  background: url(<path-to-image>);
  gap: 4px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 11px;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: flex-start; /* 로고와 텍스트의 윗줄 맞춤 */
  gap: 7px;
  flex: 1;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;

  /* 보드타이틀 */
  ${BoardTitleH1} {
    margin: 0;
  }

  /* 위치와 날짜는 아래로 순서대로 */
  ${BoardLocationP} {
    margin: 2px 0 0;
  }

  ${BoardDateP} {
    margin: 2px 0 0;
  }
`;

const RightContent = styled.div`
  position: relative; /* 아이콘 고정 기준 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding-top: 2px;
  padding-bottom: 2px;
  min-height: 100%; /* 세로 위치 계산 위해 높이 유지 */
`;

const HeartArea = styled.div`
  position: absolute;
  top: 0; /* 제목과 같은 높이 */
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 54px; /* 아이콘 자리 확보 */
  cursor: pointer;
`;

const CommentArea = styled.div`
  position: absolute;
  top: 30px; /* 위치와 날짜 중간 지점 (수치 조절 가능) */
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 54px;
  cursor: pointer;
`;

const TextStyle = styled.p`
  color: var(--Gray-900, #727c94);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.12px;
  margin: 0;
  white-space: nowrap; /* 줄바꿈 방지 */
`;

const HeartImg = styled.img`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

const CommentImg = styled.img`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

const MemberLogo = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 24px;
`;

const PromotionContainer = styled.div`
  margin: 8px 0;
  text-align: left;
  justify-content: flex-end;
  position: relative;
`;

const PromotionIconImg = styled.img`
  width: 345px;
  height: 103px;
  border-radius: 10px;
`;

const UpBird = styled.img`
  position: absolute;
  top: -48px;
  right: 48px;
  width: 64px;
  height: 64px;
`;

import UpPromtionImg from "../../assets/up/up.svg";
import UpBirdImg from "../../assets/up/bird.svg";
import UpModalIconImg from "../../assets/up/upmodal.svg";
import OffAdvers from "../../assets/up/onadver.svg";
const MyPostsPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModalId, setOpenModalId] = useState(null); // ✅ 현재 열린 모달의 eventId 저장

  const toggleUpModal = (eventId) => {
    setOpenModalId((prev) => (prev === eventId ? null : eventId));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchMyPosts(); // ✅ data가 바로 { content: [...] }

        const content = data?.content || [];

        setPosts(content); // posts 배열 안에 바로 up이 들어옴
        console.log("첫 번째 게시물 up 값:", content[0]?.up); // true / false 확인
      } catch (err) {
        console.error("내가 작성한 게시물 불러오기 실패", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatLikes = (likes) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}K`;
    }
    return likes.toString();
  };

  const handlePostClick = (post) => {
    try {
      // postType에 따라 다른 경로로 이동
      if (post.postType === "CLUB" && post.clubId) {
        // 소모임 게시글: /events/{eventId}/clubs/{clubId}

        navigate(`/smallgroup/${post.eventId}/${post.clubId}`);
      } else if (post.postType === "EVENT") {
        // 이벤트 게시글: /events/{eventId}

        navigate(`/detail/${post.eventId}`);
      } else {
        console.error("게시글 타입을 확인할 수 없습니다:", post);
      }
    } catch (error) {
      console.error("게시글 클릭 처리 중 오류:", error);
    }
  };
  const [showUpModal, setShowUpModal] = useState(false);

  // 남은 시간을 시:분:초 형태로 변환하는 헬퍼
  // 남은 시간을 "n일 hh:mm:ss" 형태로 변환하는 헬퍼
  const formatRemainingTime = (seconds) => {
    if (!seconds || seconds <= 0) return "0일 00:00:00";

    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    // 두 자리수 맞추기 (01, 02 형태)
    const pad = (num) => String(num).padStart(2, "0");

    return `${d}일 ${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosts((prev) =>
        prev.map((p) => {
          if (p.up && p.upRemainingSeconds > 0) {
            return {
              ...p,
              upRemainingSeconds: Math.max(0, p.upRemainingSeconds - 1),
            };
          }
          // ⬇️ 남은 시간이 0이 되면 자동으로 up 종료
          if (p.up && p.upRemainingSeconds <= 0) {
            return {
              ...p,
              up: false,
              upRemainingSeconds: 0,
            };
          }
          return p;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleUpClick = async (eventId) => {
    try {
      const updated = await UpPost(eventId); // API 호출

      // ✅ 해당 게시글만 업데이트
      setPosts((prev) =>
        prev.map((p) =>
          p.eventId === eventId
            ? {
                ...p,
                up: updated.up,
                upRemainingSeconds: updated.upRemainingSeconds,
              }
            : p
        )
      );
    } catch (err) {
      console.error("업 시작 실패:", err);
      alert("업 시작에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate("/myhome")}>
            <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
          </BackButton>
          <Title>내가 작성한 게시물</Title>
        </Header>
        <Content>
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#666",
              fontSize: "16px",
            }}
          >
            로딩 중...
          </div>
        </Content>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate("/myhome")}>
            <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
          </BackButton>
          <Title>내가 작성한 게시물</Title>
        </Header>
        <Content>
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#666",
              fontSize: "16px",
            }}
          >
            게시물을 불러오는 중 오류가 발생했습니다.
          </div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/myhome")}>
          <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
        </BackButton>
        <Title>내가 작성한 게시물</Title>
      </Header>

      <Content>
        {posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#666",
              fontSize: "16px",
            }}
          >
            아직 작성한 게시물이 없습니다.
            <br />
            새로운 게시물을 작성해보세요!
          </div>
        ) : (
          <div style={{ padding: "0 24px 0 16px" }}>
            {posts.map((post, index) => (
              <React.Fragment key={`${post.eventId}-${index}`}>
                <PostCard>
                  <div onClick={() => handlePostClick(post)}>
                    <ImageScrollWrapper>
                      {Array.isArray(post.images) &&
                        post.images.map((img, idx) => (
                          <BoardImage
                            key={idx}
                            src={img.imageUrl}
                            alt={`${post.title}-${idx}`}
                          />
                        ))}
                    </ImageScrollWrapper>

                    <ContentWrapper>
                      <LeftContent>
                        <MemberLogo src={post.userImage} alt="회원로고" />
                        <TextInfo>
                          <BoardTitleH1>
                            {post.title}
                          </BoardTitleH1>
                          <BoardLocationP>{post.location}</BoardLocationP>
                          <BoardDateP>
                            {post.endAt
                              ? `${dayjs(post.startAt).format(
                                  "YYYY.MM.DD.(dd)"
                                )} ~ ${dayjs(post.endAt).format(
                                  "YYYY.MM.DD.(dd)"
                                )} ${dayjs(post.startAt).format(
                                  "HH:mm"
                                )}~${dayjs(post.endAt).format("HH:mm")}`
                              : `${dayjs(post.startAt).format(
                                  "YYYY.MM.DD.(dd)"
                                )} ${dayjs(post.startAt).format("HH:mm")}`}
                          </BoardDateP>
                          {post.postType === "CLUB" && (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#154ad0",
                                fontWeight: "normal",
                                marginTop: "4px",
                              }}
                            >
                              [소모임]
                            </span>
                          )}
                          {post.postType === "EVENT" && (
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#ff6b35",
                                fontWeight: "normal",
                                marginTop: "4px",
                              }}
                            >
                              [이벤트]
                            </span>
                          )}
                        </TextInfo>
                      </LeftContent>

                      <RightContent>
                        <HeartArea>
                          <TextStyle>
                            {formatLikes(post.favoriteCount)}
                          </TextStyle>
                          <HeartImg
                            src={Heart}
                            alt="하트"
                            style={{ width: "24px", height: "24px" }}
                          />
                        </HeartArea>

                        <CommentArea>
                          <TextStyle>{post.commentCount}</TextStyle>
                          <CommentImg src={Comment} alt="댓글" />
                        </CommentArea>
                      </RightContent>
                    </ContentWrapper>
                  </div>

                  {/* PromotionIcon을 소모임이 아닌 경우에만 표시 */}
                  <PromotionContainer>
                    {post.up ? (
                      <>
                        <UpIconBack
                          src={UpPromtionImg}
                          alt="업 프로모션 아이콘"
                          style={{ position: "relative" }}
                        />
                        <UpBird src={UpBirdImg} alt="업 새 아이콘" />

                        {/* ✅ 업 모달 아이콘 */}
                        <UpModalIcon
                          src={UpModalIconImg}
                          alt="업 정보 아이콘"
                          onClick={() => toggleUpModal(post.eventId)}
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                            position: "relative",
                          }}
                        />

                        {/* ✅ 해당 post만 모달 열리도록 */}
                        {openModalId === post.eventId && (
                          <UpModalWrapper>
                            [UP광고 정보]
                            <br />
                            게시물 전지역 노출
                            <br />
                            게시물 상단 노출
                            <br />
                            노출 빈도 UP
                          </UpModalWrapper>
                        )}

                        <UpP>
                          남은 시간 :{" "}
                          {formatRemainingTime(post.upRemainingSeconds)}
                        </UpP>
                      </>
                    ) : (
                      <PromotionIconImg
                        src={OffAdvers}
                        alt="프로모션 아이콘"
                        onClick={() => handleUpClick(post.eventId)}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </PromotionContainer>
                </PostCard>
              </React.Fragment>
            ))}
          </div>
        )}
      </Content>
    </Container>
  );
};

export default MyPostsPage;
const UpP = styled.p`
  color: #fff;
  position: absolute;
  top: 16px;
  left: 66%; /* 부모 기준 중앙 */
  transform: translateX(-50%); /* 중앙 정렬 */

  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  white-space: nowrap;
  text-align: left;

  width: 160px; /* 고정 폭 */
  z-index: 10;
`;

const UpIconBack = styled.img`
  width: 350px;
  height: 73px;
  object-fit: contain;
  position: relative;
  z-index: 0; /* 배경은 아래 */
`;

const UpModalIcon = styled.img`
  position: absolute;
  width: 14px;
  height: 14px;
  top: -25px;
  right: 210px;
  z-index: 2; /* 아이콘은 위 */
`;

const UpModalWrapper = styled.div`
  padding: 8px;
  position: absolute;
  top: calc(30px + 14px + 3px); /* 아이콘 아래 3px */
  left: 145px;
  transform: translateX(-50%);
  z-index: 3; /* 모달이 제일 위 */

  border-radius: 6px;
  border: 1px solid var(--Gray-900, #727c94);
  background: rgba(198, 200, 210, 0.7);
  backdrop-filter: blur(1.1px);

  width: 112px;
  height: 85px;
  color: #454e63;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  line-height: 130%;
  letter-spacing: 0.24px;
  text-align: center;
`;
