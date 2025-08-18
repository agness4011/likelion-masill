import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@assets/logo/main/main-arrowleft.svg';
import HeartIcon from '@logo/myhome/heart.svg';
import ChatIcon from '@logo/myhome/chat.svg';
import Fullheart from '@assets/logo/mainImg/fullheart.png';
import Heart from '@assets/logo/mainImg/Heart.png';
import Comment from '@assets/logo/mainImg/commant.png';
import PromotionIcon from '@logo/myhome/promotion.svg';
import dayjs from 'dayjs';
import { fetchMyPosts } from '../../api/boardApi';
import {
  BoardTitleH1,
  BoardLocationP,
  BoardDateP,
} from '../../components/main/MainStyles.styled';

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
  padding: 0 0 20px 0;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding-bottom: 4px;
  max-height: 140px;
`;

const BoardImage = styled.img`
  width: 100%;
  height: 140px;
  border-radius: 6px;
  object-fit: cover;
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
  margin-left: -140px;
  text-align: left;
  display: flex;
  justify-content: flex-end;
`;

const PromotionIconImg = styled.img`
  width: 80%;
  height: 100px;
  border-radius: 20px;
`;

const MyPostsPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetchMyPosts();
        console.log("내가 작성한 게시글:", res);
        console.log("내가 작성한 게시글 데이터 구조:", JSON.stringify(res, null, 2));

        // 실제 데이터 구조에 맞게 접근
        const content = res?.data?.content || [];
        console.log("내가 작성한 게시글 content:", content);
        if (content.length > 0) {
          console.log("첫 번째 게시글 구조:", content[0]);
        }
        setPosts(content);
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
    // eventId 또는 postId 중 존재하는 것을 사용
    const id = post.eventId || post.postId || post.id;
    if (id) {
      navigate(`/detail/${id}`);
    } else {
      console.error('게시글 ID를 찾을 수 없습니다:', post);
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>
            <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
          </BackButton>
          <Title>내가 작성한 게시물</Title>
        </Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666', fontSize: '16px' }}>
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
          <Title>내가 작성한 게시물</Title>
        </Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666', fontSize: '16px' }}>
            게시물을 불러오는 중 오류가 발생했습니다.
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
        <Title>내가 작성한 게시물</Title>
      </Header>

      <Content>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666', fontSize: '16px' }}>
            아직 작성한 게시물이 없습니다.<br />새로운 게시물을 작성해보세요!
          </div>
        ) : (
          <div style={{ padding: '0 24px 0 16px' }}>
            {posts.map((post, index) => (
              <React.Fragment key={post.eventId}>
                <PostCard onClick={() => handlePostClick(post)}>
                  <ImageScrollWrapper>
                    {Array.isArray(post.images) && post.images.length > 0 ? (
                      post.images.map((image, idx) => (
                        <BoardImage
                          key={idx}
                          src={image.imageUrl}
                          alt={`${post.title}-${idx}`}
                        />
                      ))
                    ) : null}
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
                      <HeartArea>
                        <TextStyle>{formatLikes(post.favoriteCount)}</TextStyle>
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
                  
                  {/* PromotionIcon을 마지막 게시물이 아닌 경우에만 표시 */}
                  {index < posts.length - 1 && (
                    <PromotionContainer>
                      <PromotionIconImg src={PromotionIcon} alt="프로모션 아이콘" />
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

export default MyPostsPage;
