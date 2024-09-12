import { useState } from 'react';
import styled from 'styled-components';

// モーダル全体のレイアウト
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
  z-index: 1000;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
`;

const SelectField = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 間隔を設定 */
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const RepeatModal = ({ onClose, onSave }: { onClose: () => void; onSave: (data: any) => void }) => {
  const [repeatInterval, setRepeatInterval] = useState(1);
  const [repeatType, setRepeatType] = useState('weekly');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedDayOfMonth, setSelectedDayOfMonth] = useState(1);

  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

  // 曜日選択トグル
  const toggleDaySelection = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSave = () => {
    const data = {
      repeatInterval,
      repeatType,
      selectedDays,
      selectedDayOfMonth,
    };
    onSave(data);
    onClose();
  };

  return (
    <Modal>
      <h3>カスタムの繰り返し</h3>

      {/* 繰り返し間隔とタイプ */}
      <Label>繰り返す間隔:</Label>
      <FlexContainer>
        <InputField
          type="number"
          min="1"
          value={repeatInterval}
          onChange={(e) => setRepeatInterval(Number(e.target.value))}
        />
        <SelectField value={repeatType} onChange={(e) => setRepeatType(e.target.value)}>
          <option value="daily">日ごと</option>
          <option value="weekly">週ごと</option>
          <option value="monthly">月ごと</option>
          <option value="yearly">年ごと</option>
        </SelectField>
      </FlexContainer>

      {/* 週ごとの場合は曜日選択 */}
      {repeatType === 'weekly' && (
        <div>
          <Label>曜日を選択:</Label>
          {daysOfWeek.map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDaySelection(day)}
              />
              {day}
            </label>
          ))}
        </div>
      )}

      {/* 月ごとの場合は日付選択 */}
      {repeatType === 'monthly' && (
        <div>
          <Label>日を選択:</Label>
          <InputField
            type="number"
            min="1"
            max="31"
            value={selectedDayOfMonth}
            onChange={(e) => setSelectedDayOfMonth(Number(e.target.value))}
          />
        </div>
      )}

      {/* 保存およびキャンセルボタン */}
      <ButtonGroup>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSave}>完了</Button>
      </ButtonGroup>
    </Modal>
  );
};

export default RepeatModal;
