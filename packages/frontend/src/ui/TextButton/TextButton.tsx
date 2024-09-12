import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { BLACK } from "styles/color";
import { FONTCOLOR_BLACK, FONTSIZE_PARAGRAPH } from "styles/typography";

import { getStyleByType } from "./style";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: "primary" | "default" | "danger" | "none";
  text: string;
}

const Button = styled.button<{ $buttonType: Props["buttonType"] }>`
  border-style: solid;
  border-width: 1px;
  border-color: ${BLACK};
  color: ${FONTCOLOR_BLACK};
  font-size: ${FONTSIZE_PARAGRAPH};
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.9;
  }

  ${(props) => getStyleByType[props.$buttonType]}
`;

export function TextButton({ buttonType, text, ...props }: Props) {
  return (
    <Button $buttonType={buttonType} type="button" {...props}>
      {text}
    </Button>
  );
}
