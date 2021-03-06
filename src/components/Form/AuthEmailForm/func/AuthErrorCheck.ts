type EmailStatusTypes = {
  setEmailDone: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

type CodeStatusTypes = {
  email: string;
  setRegisterEmail: React.Dispatch<React.SetStateAction<string>>;
  setCodeReg: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthDone: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useAuthErrorCheck(): {
  handleEmailCheck: (type: number, stauts: EmailStatusTypes) => void;
  handleCodeCheck: (type: number, status: CodeStatusTypes) => void;
} {
  const handleEmailCheck = (type: number, status: EmailStatusTypes) => {
    switch (type) {
      case 200:
        status.setEmailDone(true);
        status.setToggle(true);
        break;
      case 400:
      default:
        break;
    }
  };

  const handleCodeCheck = (type: number, status: CodeStatusTypes) => {
    switch (type) {
      case 200:
        status.setRegisterEmail(status.email);
        status.setCodeReg(false);
        status.setAuthDone(true);
        break;
      case 400:
      case 408:
        status.setCodeReg(true);
        status.setAuthDone(false);
        break;
      default:
        break;
    }
  };

  return { handleEmailCheck, handleCodeCheck };
}
