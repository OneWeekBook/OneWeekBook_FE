import { lazy } from 'react';
import Container from 'components/Container';

const UserInfo = lazy(
  () => import(/* webpackChunkName: "UserInfo" */ './components/UserInfo'),
);

function Index() {
  return (
    <Container>
      <UserInfo />
    </Container>
  );
}

export default Index;
