import * as React from "react";
import { Button, IButtonProps, Tooltip } from "@blueprintjs/core";

export interface IToolTipButtonProps extends IButtonProps {
  tooltip: string;
}

export const ToolTipButton: React.FunctionComponent<IToolTipButtonProps> = ({
  tooltip,
  ...otherProps
}) => {
  const ButtonInner = () => <Button {...otherProps}></Button>;

  if (otherProps.disabled) {
    return <ButtonInner></ButtonInner>;
  } else {
    return (
      <Tooltip content={tooltip}>
        <ButtonInner></ButtonInner>
      </Tooltip>
    );
  }
};
