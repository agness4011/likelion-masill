import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import BirdIcon from '@logo/bird1.svg';
import ArrowLeftIcon from '@logo/main/main-arrowleft.svg';
import MasilLogoIcon from '@assets/masill-logo.svg';

const SajangContainer = styled.div`
  min-height: 100vh;
  background: white;
  padding: 0;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  margin-right: 16px;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
  flex: 1;
  text-align: center;
`;

const Content = styled.div`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 70vh;
`;

const BirdContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const BirdImage = styled.img`
  width: 80px;
  height: 80px;
`;

const FormSection = styled.div`
  margin-bottom: 30px;
  width: 100%;
  max-width: 340px;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const LabelTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const LabelSubtitle = styled.span`
  font-size: 14px;
  color: #727C94;
  font-weight: 400;
`;

const InputField = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  /* 기본 상태 (비활성화) */
  background: #f8f9fa;
  color: #727C94;
  
  /* 활성화 상태 (포커스) */
  &:focus {
    outline: none;
    background: white;
    color: #000;
    border-color: #007bff;
  }
  
  /* 입력 완료 상태 (다른 필드가 포커스되지 않았을 때) */
  &.completed {
    background: #ECF1FF;
    border-color: #ECF1FF;
    color: #727C94;
  }
  
  /* 다른 필드가 포커스된 상태에서 완료된 필드 */
  &.completed-other-focused {
    background: #ECF1FF;
    border-color: #ECF1FF;
    color: #727C94;
  }
`;

const VerifyButton = styled.button`
  width: 100%;
  max-width: 340px;
  padding: 13px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 40px;
  position: absolute;
  bottom: -200px;
  left: 50%;
  transform: translateX(-50%);
  
  ${props => props.disabled ? `
    background: #e9ecef;
    color: white;
    cursor: not-allowed;
  ` : `
    background: #C1CAE0;
    color: #727C94;
    
    &:hover {
      background: #0056b3;
      color: white;
    }
  `}
`;

const SajangPage = () => {
  const navigate = useNavigate();
  const { verifySajang } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    openingDate: '',
    businessNumber: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [completedFields, setCompletedFields] = useState({
    name: false,
    openingDate: false,
    businessNumber: false
  });

  const handleBack = () => {
    navigate('/myhome');
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    // 개업일자 필드에 대한 자동 포맷팅
    if (field === 'openingDate') {
      // 숫자만 추출
      const numbers = value.replace(/[^0-9]/g, '');
      
      // 4자리까지 입력된 경우 (년도)
      if (numbers.length <= 4) {
        formattedValue = numbers;
      }
      // 6자리까지 입력된 경우 (년도 + 월)
      else if (numbers.length <= 6) {
        formattedValue = numbers.slice(0, 4) + ' - ' + numbers.slice(4);
      }
      // 8자리까지 입력된 경우 (년도 + 월 + 일)
      else if (numbers.length <= 8) {
        formattedValue = numbers.slice(0, 4) + ' - ' + numbers.slice(4, 6) + ' - ' + numbers.slice(6);
      }
      // 8자리 초과인 경우 8자리까지만 유지
      else {
        formattedValue = numbers.slice(0, 4) + ' - ' + numbers.slice(4, 6) + ' - ' + numbers.slice(6, 8);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
    
    // 입력이 있으면 완료 상태로 설정
    if (formattedValue.trim()) {
      setCompletedFields(prev => ({
        ...prev,
        [field]: true
      }));
    }
  };

  const handleInputFocus = (field) => {
    setFocusedField(field);
  };

  const handleInputBlur = (field) => {
    setFocusedField(null);
  };

  const handleVerify = () => {
    // 모든 필드가 입력되었는지 확인
    const allFieldsCompleted = Object.values(completedFields).every(completed => completed);
    if (allFieldsCompleted) {
      console.log('사장님 인증 요청:', formData);
      // 여기에 실제 인증 로직을 추가할 수 있습니다
      verifySajang();
      alert('인증 요청이 완료되었습니다.');
      navigate('/myhome');
    }
  };

  const getInputClassName = (field) => {
    if (focusedField === field) {
      return ''; // 활성화 상태 (흰색 배경, 검정 텍스트)
    } else if (completedFields[field] && focusedField && focusedField !== field) {
      return 'completed-other-focused'; // 다른 필드가 포커스된 상태에서 완료된 필드 (#ECF1FF 배경, #727C94 텍스트)
    } else if (completedFields[field]) {
      return 'completed'; // 완료된 필드 (#ECF1FF 배경, #727C94 텍스트)
    }
    return ''; // 기본 상태 (회색 배경, #727C94 텍스트)
  };

  // 모든 필드가 입력되었는지 확인
  const allFieldsCompleted = Object.values(completedFields).every(completed => completed);

  return (
    <SajangContainer>
      {/* 상태바 */}
      
      {/* 헤더 */}
      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon src={ArrowLeftIcon} alt="뒤로가기" />
        </BackButton>
        <Title>사장님 인증</Title>
      </Header>

      {/* 콘텐츠 */}
      <Content>
        <BirdContainer>
          <BirdImage src={BirdIcon} alt="새" />
        </BirdContainer>

        <FormSection>
          <SectionTitle>정보 등록</SectionTitle>
          
                     <InputGroup>
             <InputLabel>성명</InputLabel>
             <InputField
               type="text"
               value={formData.name}
               placeholder="성명을 입력하세요"
               onChange={(e) => handleInputChange('name', e.target.value)}
               onFocus={() => handleInputFocus('name')}
               onBlur={() => handleInputBlur('name')}
               className={getInputClassName('name')}
             />
           </InputGroup>

                       <InputGroup>
              <InputLabel>개업일자</InputLabel>
              <InputField
                type="text"
                value={formData.openingDate}
                placeholder="YYYY-MM-DD"
                onChange={(e) => handleInputChange('openingDate', e.target.value)}
                onFocus={() => handleInputFocus('openingDate')}
                onBlur={() => handleInputBlur('openingDate')}
                className={getInputClassName('openingDate')}
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>사업자 등록번호</InputLabel>
              <InputField
                type="text"
                value={formData.businessNumber}
                placeholder="사업자 등록번호를 입력하세요"
                onChange={(e) => handleInputChange('businessNumber', e.target.value)}
                onFocus={() => handleInputFocus('businessNumber')}
                onBlur={() => handleInputBlur('businessNumber')}
                className={getInputClassName('businessNumber')}
              />
            </InputGroup>
            
            <VerifyButton 
              disabled={!allFieldsCompleted}
              onClick={handleVerify}
            >
              인증하기
            </VerifyButton>
         </FormSection>
      </Content>
    </SajangContainer>
  );
};

export default SajangPage;
