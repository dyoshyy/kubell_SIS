import type { ButtonHTMLAttributes, ReactElement } from "react";
import styled from "styled-components";

import { BLACK } from "styles/color";
import { FONTCOLOR_BLACK } from "styles/typography";
import { getStyleByType } from "./style";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttontype: "primary" | "default" | "danger" | "none";
  icon: "circle-cross";
}

const Button = styled.button<{ buttontype: Props["buttontype"] }>`
  width: 28px;
  height: 28px;
  padding: 0;
  border-style: solid;
  border-width: 1px;
  border-color: ${BLACK};
  color: ${FONTCOLOR_BLACK};
  box-sizing: border-box;
  cursor: pointer;
  vertical-align: middle;

  &:active {
    opacity: 0.9;
  }

  & svg {
    width: 24px;
    height: 24px;
    padding: 1px;
    fill: none;
    stroke: ${BLACK};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }

  ${(props) => getStyleByType[props.buttontype]}
`;

const getSvgByIcon: Record<Props["icon"], ReactElement> = {
  "circle-cross": (
    <svg xmlns="http://www.w3.org/2000/svg">
      <path d="M4.92893219 19.0710678c-3.90524292-3.9052429-3.90524292-10.23689269 0-14.14213561 3.90524292-3.90524292 10.23689271-3.90524292 14.14213561 0 3.9052429 3.90524292 3.9052429 10.23689271 0 14.14213561-3.9052429 3.9052429-10.23689269 3.9052429-14.14213561 0zM15.5355339 15.5355339L8.46446609 8.46446609m7.07106781 0L8.46446609 15.5355339" />
    </svg>
  ),
};

export function IconButton({ buttontype, icon, ...props }: Props) {
  return (
    <Button type="button" buttontype={buttontype} {...props}>
      {getSvgByIcon[icon]}
    </Button>
  );
}
