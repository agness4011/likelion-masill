import React from "react";
import styled from "styled-components";

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  background: #fff;
  &:hover {
    background: #fafafa;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ccc;
  margin-right: 12px;
`;

const Info = styled.div`
  flex: 1;
  & > p:nth-child(1) {
    margin: 0;
    font-weight: bold;
  }
  & > p:nth-child(2) {
    margin: 4px 0 0;
    color: #666;
    font-size: 0.875rem;
  }
`;

const DateLabel = styled.span`
  font-size: 0.75rem;
  color: #999;
`;

export default function ChatListItem({ room, onClick }) {
  return (
    <ItemWrapper onClick={onClick}>
      <Avatar />
      <Info>
        <p>{room.name}</p>
        <p>{room.lastMessage}</p>
      </Info>
      <DateLabel>{room.date}</DateLabel>
    </ItemWrapper>
  );
}
