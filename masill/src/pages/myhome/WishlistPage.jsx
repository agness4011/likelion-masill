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
import { fetchMyFavorites } from "../../api/boardApi";
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
  padding: 0 0 5px 0;
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
  right: 50px;
  min-height: 100%; /* 세로 위치 계산 위해 높이 유지 */
`;

const HeartArea = styled.div`
  position: absolute;
  top: 0; /* 제목과 같은 높이 */
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 28px; /* 아이콘 자리 확보 */
  cursor: pointer;
`;

const CommentArea = styled.div`
  position: absolute;
  top: 30px; /* 위치와 날짜 중간 지점 (수치 조절 가능) */
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 28px;
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
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

const CommentImg = styled.img`
  position: absolute;
  right: 0;
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
  margin: 12px 0;
  margin-left: -160px;
  text-align: left;
  display: flex;
  justify-content: flex-end;
`;

const PromotionIconImg = styled.img`
  width: 80%;
  height: 100px;
  border-radius: 20px;
`;

// 더미 데이터 제거 - 실제 좋아요한 게시물을 사용

const WishlistPage = () => {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API에서 관심있는 게시글 가져오기
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const res = await fetchMyFavorites();
        console.log("관심있는 게시글:", res);
        console.log(
          "관심있는 게시글 데이터 구조:",
          JSON.stringify(res, null, 2)
        );

        // 실제 데이터 구조에 맞게 접근
        const content = res?.data?.content || [];
        console.log("관심있는 게시글 content:", content);
        if (content.length > 0) {
          console.log("첫 번째 관심 게시글 구조:", content[0]);
        }
        setLikedPosts(content);
      } catch (err) {
        console.error("관심있는 게시물 불러오기 실패", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const formatLikes = (likes) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}K`;
    }
    return likes.toString();
  };

  const handlePostClick = (post) => {
    // eventId 또는 postId 중 존재하는 것을 사용
    const id = post.eventId || post.postId || post.id;
    if (id) {
      navigate(`/detail/${id}`);
    } else {
      console.error("게시글 ID를 찾을 수 없습니다:", post);
    }
  };

  const handleRemoveFromWishlist = (postId, e) => {
    e.stopPropagation();
    // TODO: API를 통해 관심 목록에서 제거하는 로직 추가
    console.log("관심 목록에서 제거:", postId);
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
          </BackButton>
          <Title>관심 목록</Title>
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
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
          </BackButton>
          <Title>관심 목록</Title>
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
            관심 목록을 불러오는 중 오류가 발생했습니다.
          </div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
        </BackButton>
        <Title>관심 목록</Title>
      </Header>

      <Content>
        {likedPosts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#666",
              fontSize: "16px",
            }}
          >
            아직 관심있는 게시물이 없습니다.
            <br />
            메인페이지에서 관심 있는 게시물에 하트를 눌러보세요!
          </div>
        ) : (
          <div style={{ padding: "0 24px 0 24px" }}>
            {likedPosts.map((post, index) => (
              <React.Fragment key={post.postId}>
                <PostCard onClick={() => handlePostClick(post)}>
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
                        <BoardTitleH1>{post.title}</BoardTitleH1>
                        <BoardLocationP>{post.location}</BoardLocationP>
                        <BoardDateP>
                          {`${dayjs(post.startAt).format(
                            "YYYY.MM.DD.(dd)"
                          )} ~ ${dayjs(post.endAt).format(
                            "YYYY.MM.DD.(dd)"
                          )} ${dayjs(post.startAt).format("HH:mm")}~${dayjs(
                            post.endAt
                          ).format("HH:mm")}`}
                        </BoardDateP>
                      </TextInfo>
                    </LeftContent>

                    <RightContent>
                      <HeartArea
                        onClick={(e) =>
                          handleRemoveFromWishlist(post.postId, e)
                        }
                      >
                        <TextStyle>{post.favoriteCount}</TextStyle>
                        <HeartImg
                          src={Fullheart}
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

                  {/* PromotionIcon을 마지막 게시물이 아닌 경우에만 표시 */}
                  {index < likedPosts.length - 1 && (
                    <PromotionContainer>
                      <PromotionIconImg
                        src={PromotionIcon}
                        alt="프로모션 아이콘"
                      />
                    </PromotionContainer>
                  )}
                </PostCard>
              </React.Fragment>
            ))}
          </div>
        )}
      </Content>
    </Container>
  );
};

export default WishlistPage;
