import { Outlet, useLocation } from 'react-router-dom';
import Header from '@commons/header/Header';
import Footer from '@commons/Footer';
import Wrapper from '@commons/Wrapper';

export default function RootLayout() {
  const { pathname } = useLocation();
  // 온보딩, 로그인, 회원가입 단계(모두)에서 Header/Footer 숨김
  const noLayoutPaths = [
    '/', 
    '/login',
    '/signup',
    '/signup/agree',
    '/signup/phone',
    '/signup/create',
    '/signup/region',
    '/signup/done'
  ];
  const isHidden = noLayoutPaths.includes(pathname);

  return (
    <Wrapper>
      {!isHidden && <Header />}
      <Outlet />
      {!isHidden && <Footer />}
    </Wrapper>
  );
}

