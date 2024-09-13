import React from 'react';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'primary' | 'secondary' | 'danger' | 'ghost' | 'default';
  text: string;
}

const getStyleByType = {
  primary: `
    background-color: #3498db;
    color: white;
    border: none;
  `,
  secondary: `
    background-color: #ecf0f1;
    color: #2c3e50;
    border: 1px solid #bdc3c7;
  `,
  danger: `
    background-color: #e74c3c;
    color: white;
    border: none;
  `,
  ghost: `
    background-color: transparent;
    color: #3498db;
    border: 1px solid #3498db;
  `,
  default: `
    background-color: #f1f1f1;
    color: #333;
    border: 1px solid #ccc;
  `,
};

const Button = styled.button<{ $buttonType: Props['buttonType'] }>`
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
