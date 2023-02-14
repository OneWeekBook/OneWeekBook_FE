import { useEffect, useLayoutEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { userToggle } from 'redux/reducers/Func';
import useToggle from 'hooks/useToggle';
import Rank from './_items/Rank';
import NameButton from './_items/NameButton';
import OutButton from './_items/OutButton';
import RemoveUserModal from './modal/RemoveUserModal';

function UserInfo() {
  const dispatch = useDispatch();
  const [rank, setRank] = useState<string>('');
  const [remaining, setRemaining] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [percent, setPercent] = useState<number>(0);
  const rankLimit = [10, 25, 50];
  const [removeToggle, removeToggleIsOn] = useToggle(false);
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
    <Wrapper>
      <NameButton nickName={user.nick} />
      <Rank
        rank={rank}
        limit={limit}
        write={userBooks.length}
        remaining={remaining}
        percent={percent}
      />
      <OutButton removeToggleIsOn={removeToggleIsOn} />
      {removeToggle && <RemoveUserModal removeToggleIsOn={removeToggleIsOn} />}
    </Wrapper>
  );
}

export default UserInfo;

const Wrapper = styled.div`
  border: 3px solid #f07055;
  border-radius: 10px;
  box-sizing: border-box;
  margin: 50px auto 0;
  padding: 30px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;
