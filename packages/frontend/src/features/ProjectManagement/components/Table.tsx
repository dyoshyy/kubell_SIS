import styled from "styled-components";
import { LAYER_1, TEXT_PRIMARY } from "styles/color";
import { gutterBy } from "styles/spaces";
import { FONTSIZE_PARAGRAPH, FONTWEIGHT_IMPORTANT } from "styles/typography";

export const TableRow = styled.tr`
  background-color: ${LAYER_1};
  display: flex;
  align-items: center;
`;

export const TableCell = styled.td`
  padding: ${gutterBy(2)};
  text-align: left;
  vertical-align: middle;
  font-size: ${FONTSIZE_PARAGRAPH};
  color: ${TEXT_PRIMARY};
`;

export const NameCell = styled(TableCell)`
  width: 80%;
  font-weight: ${FONTWEIGHT_IMPORTANT};
`;
