import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@assets/logo/main/main-arrowleft.svg';
import HeartIcon from '@logo/myhome/heart.svg';
import ChatIcon from '@logo/myhome/chat.svg';

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 0;
  margin: 0;
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
  padding: 20px;
`;

const PostCard = styled.div`
  margin-bottom: 16px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 1;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostImage = styled.div`
  width: 100%;
  height: 100%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 12px;
`;

const PostInfo = styled.div`
  padding: 16px;
  display: flex;
  gap: 12px;
`;

const ProfileIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &::before {
    content: '👤';
    font-size: 16px;
  }
`;

const PostDetails = styled.div`
  flex: 1;
`;

const PostTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
`;

const PostLocation = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.3;
`;

const PostDate = styled.p`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.3;
`;

const EngagementMetrics = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-left: 12px;
`;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
`;

const MetricIcon = styled.img`
  width: 16px;
  height: 16px;
`;

// 더미 데이터
const dummyWishlist = [
  {
    id: 1,
    title: "퇘사랑 흑돼지 입점 기념 3+1",
    location: "서울 성북구 서경로 79 퇘사랑",
    date: "2025. 09. 05. (금) 16:00 ~ 02:00 (익일)",
    likes: 894,
    comments: 68
  },
  {
    id: 2,
    title: "성북 청년의 날 행사",
    location: "서울 성북구청 앞 바람마당 일대",
    date: "2025. 09. 20. (토) 12:00 ~ 17:00",
    likes: 1200,
    comments: 117
  },
  {
    id: 3,
    title: "오동공원 물놀이터",
    location: "서울 성북구 하월곡동 228-4",
    date: "2025. 07. 12. (토)~2025. 08. 31. (일) 10:00...",
    likes: 671,
    comments: 81
  }
];

const WishlistPage = () => {
  const navigate = useNavigate();

  const formatLikes = (likes) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}K`;
    }
    return likes.toString();
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={ArrowLeftIcon} alt="뒤로 가기" />
        </BackButton>
        <Title>관심 목록</Title>
      </Header>

      <Content>
        {dummyWishlist.map((post) => (
          <PostCard key={post.id}>
            <ImageContainer>
              <ImageWrapper>
                <PostImage>이미지 1</PostImage>
              </ImageWrapper>
              <ImageWrapper>
                <PostImage>이미지 2</PostImage>
              </ImageWrapper>
              <ImageWrapper>
                <PostImage>이미지 3</PostImage>
              </ImageWrapper>
            </ImageContainer>
            
            <PostInfo>
              <ProfileIcon />
              <PostDetails>
                <PostTitle>{post.title}</PostTitle>
                <PostLocation>{post.location}</PostLocation>
                <PostDate>{post.date}</PostDate>
              </PostDetails>
              
              <EngagementMetrics>
                <MetricItem>
                  <span>{formatLikes(post.likes)}</span>
                  <MetricIcon src={HeartIcon} alt="좋아요" />
                </MetricItem>
                <MetricItem>
                  <span>{post.comments}</span>
                  <MetricIcon src={ChatIcon} alt="댓글" />
                </MetricItem>
              </EngagementMetrics>
            </PostInfo>
          </PostCard>
        ))}
      </Content>
    </Container>
  );
};

export default WishlistPage;
