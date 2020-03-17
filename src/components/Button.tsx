import * as React from "react";

export interface IButtonProps {
  text: string;
  onClick?: () => void;
}

export const Button: React.FunctionComponent<IButtonProps> = props => {
  return <button onClick={props.onClick}>{props.text}</button>;
};
