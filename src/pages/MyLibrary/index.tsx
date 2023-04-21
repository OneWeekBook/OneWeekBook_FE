import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import { navInit, userToggle } from 'redux/reducers/Func';
import { Toast } from 'lib/Toast';
import Container from 'common/Container';
import MultiText from 'components/atoms/texts/MultiText';
import styled from 'styled-components';
import LibraryMenuList from '../../components/modules/lists/LibraryMenuList';
import Nav from './components/Nav';

function Index() {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );
  const navId = useSelector((state: AppStateType) => state.func.navId);
  const isDeleteSuccess = useSelector(
    (state: AppStateType) => state.myLibrary.isDeleteSuccess,
  );
  const { itemAddSuccess, itemModifySuccess, itemDeleteSuccess } = useSelector(
    (state: AppStateType) => state.userReview,
    shallowEqual,
  );

  useEffect(() => {
    if (itemAddSuccess) Toast('success', '작성 완료');
    else if (itemModifySuccess) Toast('info', '수정 완료!');
    else if (itemDeleteSuccess) Toast('info', '삭제 완료!');
    else if (isDeleteSuccess) Toast('success', '해당 책을 삭제했습니다!');
  }, [itemAddSuccess, itemModifySuccess, itemDeleteSuccess, isDeleteSuccess]);

  useEffect(() => {
    dispatch(userToggle());
    return () => {
      dispatch(navInit());
    };
  }, []);

  return (
    <Container>
      <MyLibraryHeader>
        <MultiText
          className="flexstart"
          imageSrc={`${process.env.PUBLIC_URL}/assets/myLibrary/my-library-icon.svg`}
          imageAlt="book icon"
          imageSize={60}
          content={`${user.nick}님의 서재`}
          fontSize={2.4}
        />
        <LibraryMenuList useId={user.id} navId={navId} />
      </MyLibraryHeader>
      <ComponentWrapper>
        <Nav id={navId} />
      </ComponentWrapper>
    </Container>
  );
}

export default Index;

const MyLibraryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;

const ComponentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 10px auto 30px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    grid-template-columns: 1fr 1fr;
    width: 95%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
