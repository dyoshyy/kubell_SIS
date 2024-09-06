import React from "react";
import styled from "styled-components";
import { gutterBy } from "../../../styles/spaces";
import * as Typography from "../../../styles/typography";
import { TextButton } from "../../../ui";

interface Props {
  onClose: () => void;
}

const Caption = styled.p`
  font-size: ${Typography.FONTSIZE_CAPTION};
  margin: ${gutterBy(2)};
`;

const ActionButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - ${gutterBy(2)} * 2);
  margin: ${gutterBy(2)};
  text-align: center;
`;

export const BusynessList = ({onClose}: Props) => {
    return (
    <>
      <Caption>グループチャットのタイトルを入力してください：</Caption>
      <Caption>
        グループチャットに所属させるユーザーを選択してください：
      </Caption>
      <ActionButtonContainer>
        <TextButton buttonType="danger" text="キャンセル" onClick={onClose} />
      </ActionButtonContainer>
    </>
  );

}
