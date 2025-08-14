import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@assets/logo/main/main-arrowleft.svg';
import HeartIcon from '@logo/myhome/heart.svg';
import ChatIcon from '@logo/myhome/chat.svg';

const Container = styled.div`
  min-height: 100vh;
  background: white;
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
  margin-bottom: 24px;
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
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const Footer = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 14px;
  border-top: 1px solid #f0f0f0;
`;

// 더미 데이터
const dummyPosts = [
  {
    id: 1,
    title: "퇘사랑 흑돼지 입점 기념 3+1",
    location: "서울 성북구 서경로 79 돼사랑",
    date: "2025. 09. 05. (금) 16:00 ~ 02:00 (익일)",
    likes: 894,
    comments: 68,
    images: [
      "https://via.placeholder.com/120x120/FF6B35/FFFFFF?text=Restaurant",
      "https://via.placeholder.com/120x120/FFD700/000000?text=Menu",
      "https://via.placeholder.com/120x120/FF6B35/FFFFFF?text=Food"
    ]
  },
  {
    id: 2,
    title: "성북 청년의 날 행사",
    location: "서울 성북구청 앞 바람마당 일대",
    date: "2025. 09. 20. (토) 12:00 ~ 17:00",
    likes: 1200,
    comments: 117,
    images: [
      "https://via.placeholder.com/120x120/007AFF/FFFFFF?text=City",
      "https://via.placeholder.com/120x120/FF6B35/FFFFFF?text=Beauty",
      "https://via.placeholder.com/120x120/28A745/FFFFFF?text=Event"
    ]
  }
];

const MyPostsPage = () => {
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
        <Title>내가 작성한 게시물</Title>
      </Header>

      <Content>
        {dummyPosts.map((post) => (
          <PostCard key={post.id}>
                         <ImageContainer>
               {post.images.map((image, index) => (
                 <ImageWrapper key={index}>
                   <PostImage src={image} alt={`게시글 이미지 ${index + 1}`} />
                 </ImageWrapper>
               ))}
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

      <Footer>
        총 {dummyPosts.length}개
      </Footer>
    </Container>
  );
};

export default MyPostsPage;
