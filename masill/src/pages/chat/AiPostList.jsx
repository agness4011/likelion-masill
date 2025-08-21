import { useOutletContext, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";
import Fullheart from "../../assets/detail/fullheart.png";
import Heart from "../../assets/detail/heart.png";
import Comment from "../../assets/detail/comment.png";

export default function AiPostList() {
  // MainPage의 Outlet context로 aiPosts 가져오기
  const { aiPosts } = useOutletContext();
  const navigate = useNavigate();

  if (!aiPosts || aiPosts.length === 0) return null;

  return (
    <BoardContainer>
      <PickHeader>
        <PickText>Masill_Bird PICK</PickText>
      </PickHeader>

      <BoardDiv>
        {aiPosts.map((item) => {
          const now = dayjs();
          const eventEnd = dayjs(item.endAt);
          const diffDays = eventEnd
            .startOf("day")
            .diff(now.startOf("day"), "day");
          const isClosingSoon = diffDays >= 0 && diffDays <= 3;
          const deadline = diffDays === 0 ? "오늘" : `D-${diffDays}`;

          return (
            <PostWrapper
              key={item.eventId}
              onClick={() => navigate(`/detail/${item.eventId}`)}
            >
              <div style={{ marginLeft: "24px" }}>
                <ImageScrollWrapper>
                  {Array.isArray(item.images) &&
                    item.images.map((img, idx) => (
                      <BoardImage
                        key={idx}
                        src={img.imageUrl}
                        alt={`${item.title}-${idx}`}
                      />
                    ))}
                </ImageScrollWrapper>

                {isClosingSoon && (
                  <ClosingTag>🔥 {deadline} 마감 임박!</ClosingTag>
                )}

                <ContentWrapper>
                  <LeftContent>
                    <MemberLogo src={item.userImage} alt="회원로고" />
                    <TextInfo>
                      <BoardTitleH1>{item.title}</BoardTitleH1>
                      <BoardLocationP>
                        {item.region?.sido} {item.region?.sigungu}{" "}
                        {item.location}
                      </BoardLocationP>
                      <BoardDateP>
                        {`${dayjs(item.startAt).format(
                          "YYYY.MM.DD.(dd)"
                        )} ~ ${dayjs(item.endAt).format(
                          "YYYY.MM.DD.(dd)"
                        )} ${dayjs(item.startAt).format("HH:mm")}~${dayjs(
                          item.endAt
                        ).format("HH:mm")}`}
                      </BoardDateP>
                    </TextInfo>
                  </LeftContent>

                  <RightContent>
                    <HeartArea>
                      <TextStyle>{item.favoriteCount || 0}</TextStyle>
                      <HeartImg
                        src={item.isHeartClicked ? Fullheart : Heart}
                        alt="하트"
                      />
                    </HeartArea>
                    <CommentArea>
                      <TextStyle>{item.commentCount || 0}</TextStyle>
                      <CommentImg src={Comment} alt="댓글" />
                    </CommentArea>
                  </RightContent>
                </ContentWrapper>
              </div>
            </PostWrapper>
          );
        })}
      </BoardDiv>
    </BoardContainer>
  );
}

// 상단 PICK 표시
const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PickHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  background-color: #f5f6fa;
  border-bottom: 1px solid #e5ecff;
`;

const PickText = styled.p`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 16px;
  color: #1b409c;
`;

// 기존 게시글 스타일
const BoardDiv = styled.div`
  height: 600px;
  overflow-y: auto;
  padding-right: 10px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

const PostWrapper = styled.div`
  padding: 0 0 8px 0;
  cursor: pointer;
  border-top: 2px solid var(--Gray-500, #c1cae0);
  &:hover {
    background-color: #fafafa;
  }
`;

const ClosingTag = styled.p`
  overflow: hidden;
  color: var(--Allert, #ff443e);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;
  margin-bottom: 6px;
`;

const ImageScrollWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 4px;
  margin-top: 20px;

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
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 11px;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7px;
  flex: 1;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const BoardTitleH1 = styled.h1`
  overflow: hidden;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 140%;
  margin-left: 5px;
`;

const BoardLocationP = styled.p`
  overflow: hidden;
  color: var(--Gray-900, #727c94);
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 120%;
  margin: 2px 0 0;
`;

const BoardDateP = styled.p`
  color: #727c94;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 120%;
  margin: 2px 0 0;
  flex-shrink: 0;
  width: 100%;
  white-space: normal;
  overflow-wrap: break-word;
`;

const RightContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  padding-top: 2px;
  padding-bottom: 2px;
  right: 24px;
  min-height: 100%;
`;

const HeartArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 28px;
  cursor: pointer;
`;

const CommentArea = styled.div`
  position: absolute;
  top: 30px;
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
  margin: 0;
  white-space: nowrap;
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
