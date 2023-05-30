import { EmailStatusTypes, CodeStatusTypes } from 'types/util';

export const emailErrorHandler = (type: number, status: EmailStatusTypes) => {
  switch (type) {
    case 200:
      status.setEmailDone(true);
      status.setAuthCodeToggle(true);
      break;
    case 400:
    default:
      break;
  }
};

export const codeErrorHandler = (type: number, status: CodeStatusTypes) => {
  switch (type) {
    case 200:
      status.setRegisterEmail(status.email);
      status.setCodeValidate(false);
      status.setAuthDone(true);
      break;
    case 400:
    case 408:
      status.setCodeValidate(true);
      status.setAuthDone(false);
      break;
    default:
      break;
  }
};
