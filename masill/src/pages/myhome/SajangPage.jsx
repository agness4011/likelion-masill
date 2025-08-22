import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { verifyBusinessOwner } from '../../api/userService';
import BirdIcon from '../../assets/logo/bird1.svg';
import ArrowLeftIcon from '../../assets/logo/main/main-arrowleft.svg';
import MasilLogoIcon from '../../assets/masill-logo.svg';

const SajangContainer = styled.div`
  min-height: 100%;
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
  min-height: 400px;
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
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate('/myhome');
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'openingDate') {
      const numbers = value.replace(/[^0-9]/g, '');
      if (numbers.length <= 4) {
        formattedValue = numbers;
      } else if (numbers.length <= 6) {
        formattedValue = numbers.slice(0, 4) + '-' + numbers.slice(4);
      } else if (numbers.length <= 8) {
        formattedValue = numbers.slice(0, 4) + '-' + numbers.slice(4, 6) + '-' + numbers.slice(6);
      } else {
        formattedValue = numbers.slice(0, 4) + '-' + numbers.slice(4, 6) + '-' + numbers.slice(6, 8);
      }
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    if (formattedValue.trim()) {
      setCompletedFields(prev => ({
        ...prev,
        [field]: true
      }));
    }
  };

  const handleVerify = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const currentUser = localStorage.getItem('currentUser');
  
    console.log('=== 토큰 상태 확인 ===');
    console.log('Access Token:', accessToken ? accessToken : '없음');
    console.log('Refresh Token:', refreshToken ? '있음' : '없음');
    console.log('Current User:', currentUser ? JSON.parse(currentUser) : '없음');
    console.log('========================');
  
    // 모든 필드 확인
    const allFieldsCompleted = Object.values(completedFields).every((completed) => completed);
    if (!allFieldsCompleted) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
  
    // 입력값 정규화
    const openingDateDigits = formData.openingDate.replace(/\D/g, ''); // YYYYMMDD
    const businessNumberDigits = formData.businessNumber.replace(/\D/g, ''); // 10자리
  
    // 형식 검증
    if (!/^\d{8}$/.test(openingDateDigits)) {
      alert('개업일자를 YYYYMMDD 형식으로 입력하세요.');
      return;
    }
    if (!/^\d{10}$/.test(businessNumberDigits)) {
      alert('사업자등록번호는 숫자 10자리입니다.');
      return;
    }
  
    // 더미 토큰 차단(최소한)
    if (!accessToken || accessToken.startsWith('dummy_')) {
      alert('실제 로그인 후 이용 가능한 기능입니다.');
      return;
    }
  
    try {
      setIsLoading(true);
  
      // 서버 스펙에 맞춘 payload (키명/포맷)
      const payload = {
        businessName: formData.name.trim(),
        openingDate: openingDateDigits,       // 하이픈 제거된 YYYYMMDD
        businessNumber: businessNumberDigits, // 숫자만 10자리
      };
  
      console.log('사업자 인증 요청 payload:', payload);
  
      // API 호출
      const response = await verifyBusinessOwner(payload);
  
      if (response?.success || response?.code === 200) {
        verifySajang();
        alert('사업자 인증이 완료되었습니다.');
        navigate('/myhome');
      } else {
        alert(response?.message || '인증에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('사업자 인증 오류:', error);
  
      let errorMessage = '인증 중 오류가 발생했습니다.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = '입력 정보를 확인해주세요.';
      } else if (error.response?.status === 401) {
        errorMessage = '로그인이 필요합니다.';
      } else if (error.response?.status === 403) {
        errorMessage = '인증 권한이 없습니다.';
      } else if (error.response?.status === 409) {
        errorMessage = '이미 인증된 사업자입니다.';
      } else if (error.response?.status === 500) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }
  
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  

  const getInputClassName = (field) => {
    if (focusedField === field) return '';
    else if (completedFields[field] && focusedField && focusedField !== field) return 'completed-other-focused';
    else if (completedFields[field]) return 'completed';
    return '';
  };

  const allFieldsCompleted = Object.values(completedFields).every(completed => completed);

  return (
    <SajangContainer>
      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon src={ArrowLeftIcon} alt="뒤로가기" />
        </BackButton>
        <Title>사장님 인증</Title>
      </Header>

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
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
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
              onFocus={() => setFocusedField('openingDate')}
              onBlur={() => setFocusedField(null)}
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
              onFocus={() => setFocusedField('businessNumber')}
              onBlur={() => setFocusedField(null)}
              className={getInputClassName('businessNumber')}
            />
          </InputGroup>

          <VerifyButton
            disabled={!allFieldsCompleted || isLoading}
            onClick={handleVerify}
          >
            {isLoading ? '인증 중...' : '인증하기'}
          </VerifyButton>
        </FormSection>
      </Content>
    </SajangContainer>
  );
};

export default SajangPage;