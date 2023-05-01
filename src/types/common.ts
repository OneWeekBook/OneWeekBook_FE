export interface ContainerTypes {
  pc?: boolean;
  mobile?: boolean;
  as?: React.ElementType;
}

export interface HeaderType {
  handleToggle: () => void;
}

export interface ProtectedRouteTypes {
  authenticationPath: string;
  outlet: JSX.Element;
}

export interface SidebarTypes {
  toggle: boolean;
  handleToggle: () => void;
}
