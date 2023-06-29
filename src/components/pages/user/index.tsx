import { useEffect, useLayoutEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { authUserRequest } from 'redux/reducers/authUserReducer';
import useToggle from 'hooks/useToggle';
import Container from 'common/Container';
import DefaultText from 'components/atoms/texts/DefaultText';
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
    dispatch(authUserRequest());
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
        <DefaultTexts>
          <DefaultText content="등급:" fontSize={1.8} />
          <DefaultText content={rank} fontSize={1.8} />
        </DefaultTexts>
        <ProgressBarForm
          limit={limit}
          write={userBooks.length}
          width={200}
          percent={percent}
        />
        <DefaultTexts>
          <DefaultText content="다음 등급까지&nbsp;" />
          <DefaultText
            content={remaining}
            fontColor={theme.color.COLOR_CORAL}
          />
          <DefaultText content="권 남았습니다." />
        </DefaultTexts>
        <SignOutButton>
          <DefaultButton
            content="회원 탈퇴"
            fontSize={1.6}
            width={80}
            height={20}
            fontColor={theme.color.COLOR_BLACK}
            backgroundColor={[theme.color.COLOR_NONE, theme.color.COLOR_NONE]}
            handleClick={handleRemoveToggle}
          />
        </SignOutButton>
      </UserInfoContainer>
      <DefaultTexts>
        <DefaultText
          content={user.nick}
          fontSize={2.4}
          fontColor={theme.color.COLOR_CORAL}
        />
        <DefaultText content="님이 읽으신 책" fontSize={2.4} />
      </DefaultTexts>
      <UserBookList userBooks={userBooks} />
      {removeToggle && <RemoveUserModal handleToggle={handleRemoveToggle} />}
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

const DefaultTexts = styled.div`
  display: flex;
`;

const SignOutButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;
