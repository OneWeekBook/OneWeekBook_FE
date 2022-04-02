import axios from "axios";

// axios 인스턴스를 만들 때 구성 기본 값 설정
export const instance = axios.create({ baseURL: `${process.env.REACT_APP_BASIC_URL}` });
  
// 인스턴스가 생성 된 후 기본값 변경
instance.defaults.headers.common.Authorization = `${sessionStorage.getItem('accessToken')}`;