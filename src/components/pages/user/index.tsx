import { useEffect, useLayoutEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { userToggle } from 'redux/reducers/Func';
import useToggle from 'hooks/useToggle';
import Container from 'common/Container';
import DataText from 'components/atoms/texts/DataText';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import UserSettingForm from 'components/modules/forms/UserSettingForm';
import ProgressBarForm from 'components/modules/forms/ProgressBarForm';
import RemoveUserModal from 'components/pages/modal/RemoveUserModal';
import UserBookList from 'components/modules/lists/UserBookList';

function Index() {
  const dispatch = useDispatch();
  const [rank, setRank] = useState<string>('');
  const [remaining, setRemaining] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [percent, setPercent] = useState<number>(0);
  const rankLimit = [10, 25, 50];
  const [removeToggle, handleRemoveToggle] = useToggle(false);
  const { user, userBooks } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(userToggle());
  }, []);

  useLayoutEffect(() => {
    if (userBooks.length < rankLimit[0]) {
      setRank('독서 입문자');
      setLimit(rankLimit[0]);
      setRemaining(rankLimit[0] - userBooks.length);
      setPercent(userBooks.length / rankLimit[0]);
    } else if (userBooks.length < rankLimit[1]) {
      setRank('독서 중급자');
      setLimit(rankLimit[1]);
      setRemaining(rankLimit[1] - userBooks.length);
      setPercent(userBooks.length / rankLimit[1]);
    } else if (userBooks.length < rankLimit[2]) {
      setRank('독서 천재');
      setLimit(rankLimit[2]);
      setRemaining(rankLimit[2] - userBooks.length);
      setPercent(userBooks.length / rankLimit[2]);
    }
  }, [userBooks]);

  useEffect(() => {
    return () => {
      setRank('');
      setRemaining(0);
      setPercent(0);
    };
  }, []);

  return (
    <Container>
      <UserInfoContainer>
        <UserSettingForm nickName={user.nick} />
        <DataText before="등급:" data={rank} fontSize={1.8} />
        <ProgressBarForm
          limit={limit}
          write={userBooks.length}
          width={200}
          percent={percent}
        />
        <DataText
          before="다음 등급까지"
          data={remaining}
          after="권 남았습니다."
          fontColor={[theme.color.COLOR_BLACK, theme.color.COLOR_CORAL]}
        />
        <SignOutButton>
          <DefaultButton
            content="회원 탈퇴"
            fontSize={1.8}
            width={80}
            height={20}
            fontColor={theme.color.COLOR_BLACK}
            bgColor={[theme.color.COLOR_NONE, theme.color.COLOR_NONE]}
            handleClick={handleRemoveToggle}
          />
        </SignOutButton>
      </UserInfoContainer>
      <DataText
        data={user.nick}
        after="님이 읽으신 책"
        fontSize={2.4}
        fontColor={[theme.color.COLOR_BLACK, theme.color.COLOR_CORAL]}
      />
      <UserBookList userBooks={userBooks} />
      {removeToggle && (
        <RemoveUserModal removeToggleIsOn={handleRemoveToggle} />
      )}
    </Container>
  );
}

export default Index;

const UserInfoContainer = styled.div`
  box-sizing: border-box;
  border: 3px solid ${({ theme }) => theme.color.COLOR_CORAL};
  border-radius: 10px;
  padding: 30px;
  margin: 30px auto 20px;
`;

const SignOutButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;
