import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { BLACK } from "styles/color";
import { FONTCOLOR_BLACK, FONTSIZE_PARAGRAPH } from "styles/typography";

import { getStyleByType } from "./style";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttontype: "primary" | "default" | "danger" | "none";
  text: string;
}

const Button = styled.button<{ buttontype: Props["buttontype"] }>`
  border-style: solid;
  border-width: 1px;
  border-color: ${BLACK};
  color: ${FONTCOLOR_BLACK};
  box-sizing: border-box;
  cursor: pointer;
  font-size: ${FONTSIZE_PARAGRAPH};
  user-select: none;

  &:active {
    opacity: 0.9;
  }

  ${(props) => getStyleByType[props.buttontype]}
`;

export function TextButton({ buttontype, text, ...props }: Props) {
  return (
    <Button buttontype={buttontype} type="button" {...props}>
      {text}
    </Button>
  );
}
