import { useQuery } from '@apollo/client';
import { useFragment } from '__generated__/query';
import { GetGroupChatsQuery } from 'features/GroupChats/apis/getGroupChats.query';
import { GroupChatsFragment, MaskedGroupChats } from 'features/GroupChats/components/groupChatsFragment.query';
import { useSignedInUser } from 'local-service/auth/hooks';
import { useState } from 'react';
import styled from 'styled-components';
import { gutterBy } from '../../../styles/spaces';
import { TextButton } from '../../../ui';

interface Props {
  onCreateRegisterMessage: (title: string, body: string, groupChatId: string, cronFormular: string) => void;
  onClose: () => void;
}

const Container = styled.div`
  padding: ${gutterBy(2)};
  max-width: 900px; /* 横幅を900pxに拡大 */
  width: 100%;
  height: 90%;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: ${gutterBy(1)};
    height: auto;
    max-width: 100%; /* モバイルでは横幅を100%に */
  }
`;


const Caption = styled.p`
  font-size: 24px;
  margin-bottom: ${gutterBy(2)};
  text-align: center;
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: ${gutterBy(1)};
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: ${gutterBy(1)};
  margin-bottom: ${gutterBy(2)};
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: ${gutterBy(0.5)};
    font-size: 14px;
  }
`;

const TextAreaField = styled.textarea`
  width: 100%;
  height: 200px; /* 高さを固定 */
  flex-grow: 1;
  padding: ${gutterBy(1)};
  margin-bottom: ${gutterBy(2)};
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
`;


const FrequencyContainer = styled.div`
  margin-bottom: ${gutterBy(2)};
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: ${gutterBy(1)};
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between; /* フォーム内要素を左右に配置 */
  width: 100%; /* 横幅を最大に設定 */
`;

const InputGroup = styled.div`
  width: 100%; /* 横幅を均等に設定 */
  display: flex;
  flex-direction: column;
`;

const SelectField = styled.select`
  padding: ${gutterBy(1)};
  font-size: 16px;
  width: 100%; /* フル幅に設定 */
  max-width: 200px; /* 必要なら最大幅を設定 */
  border-radius: 4px;
  border: 1px solid #ccc;
`;


const TimeInput = styled.input`
  padding: ${gutterBy(1)};
  font-size: 16px;
  width: 100%; /* 幅を最大にする */
  text-align: center;
  border-radius: 4px;
  border: 1px solid #ccc;
`;


const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${gutterBy(3)};
  
  button {
    width: 150px; /* ボタンの横幅を固定 */
    margin-bottom: ${gutterBy(1)};
  }

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;


export const RegisterMessage = ({ onClose, onCreateRegisterMessage }: Props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedTime, setSelectedTime] = useState(''); // デフォルトを空に設定
    const [selectedDayOfMonth, setSelectedDayOfMonth] = useState('1'); // 月の場合の日付
  const { id: myID } = useSignedInUser();

  const { data, loading, error } = useQuery(GetGroupChatsQuery, {
    variables: { accountId: myID },
  });


  const [repeatSettings, setRepeatSettings] = useState({
    repeatInterval: 1,
    repeatType: 'daily',
    selectedDays: [] as string[],
  });

   const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

  const useGroupChatsFragment = (groupChatsFragment: MaskedGroupChats) => 
    useFragment(GroupChatsFragment, groupChatsFragment);

  const groupChats = data.getGroupChats.map(useGroupChatsFragment);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [groupChatId, setGroupChatId] = useState<string>('');
  

  if (error) return <p>Error Happened</p>;

  if (loading || data?.getGroupChats === undefined) return <></>;

  const buildCronExpression = () => {
    const [hours, minutes] = selectedTime.split(':');
    let cronExpression = '* * * * *';
    

    // 繰り返し設定に基づいてCron式を生成
    if (repeatSettings) {
      const { repeatType, selectedDays } = repeatSettings;
      switch (repeatType) {
        case 'daily':
          cronExpression = `${minutes} ${hours} * * *`;
          break;
        case 'weekly':
          cronExpression = `${minutes} ${hours} * * ${selectedDays.join(',')}`;
          break;
        case 'monthly':
          cronExpression = `${minutes} ${hours}  ${selectedDayOfMonth} * *`;
          break;
        default:
          cronExpression = '* * * * *';
      }
    }

    return cronExpression;
  };

   const handleDayToggle = (day: string) => {
    setRepeatSettings((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter((d) => d !== day)
        : [...prev.selectedDays, day],
    }));
  };

  return (
    <Container>
      <Caption>業務連絡の登録</Caption>
      <FlexContainer>
        <div>
      <InputField
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextAreaField
        placeholder="本文"
        value={body}
        onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
      <FrequencyContainer>
        <Label>開始時刻:</Label>
        <TimeInput
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
      </FrequencyContainer>
      <FrequencyContainer> 
        <FlexSetContainer>
        <Label>繰り返し間隔: 毎</Label>
        <SelectField
          value={repeatSettings.repeatType}
          onChange={(e) =>
            setRepeatSettings((prev) => ({
              ...prev,
              repeatType: e.target.value,
            }))
          }
        >
          <option value="daily">日</option>
          <option value="weekly">週</option>
          <option value="monthly">月</option>
          </SelectField>
        </FlexSetContainer>
        </FrequencyContainer>
      <FrequencyContainer>
        {repeatSettings.repeatType === 'weekly' && (
          <div>
            <Label>曜日を選択:</Label>
            {daysOfWeek.map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={repeatSettings.selectedDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />
                {day}
              </label>
            ))}
          </div>
        )}
        
        {repeatSettings.repeatType === 'monthly' && (
          <div>
            <Label>何日かを選択:</Label>
            <SelectField
              value={selectedDayOfMonth}
              onChange={(e) => setSelectedDayOfMonth(e.target.value)}
            >
              {[...Array(31).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </SelectField>
          </div>
        )}
      </FrequencyContainer>
      <Label>送信するグループチャット:</Label>
      <SelectField
        onLoad={() => {setGroupChatId(groupChats[0].id);}}
        onChange={(e) => {
          setGroupChatId(e.target.value)
        }}
      >
        <option value=''>選択してください</option>
        {groupChats.map((groupChat) => (
          <option value={groupChat.id}>{groupChat.name}</option>
        ))}
          </SelectField>
          </div>
        </FlexContainer>

      <ActionButtonContainer>
        <TextButton
          buttonType="primary"
          text="登録"
          onClick={() => {
            if(!groupChatId) {
              alert("送信先のグループチャットが選択されていません。");
              return;
            }

            console.log(groupChatId);

            onCreateRegisterMessage(
              title,
              body,
              groupChatId,
              buildCronExpression()
            );
            onClose();
          }}
        />
        <TextButton buttonType="danger" text="キャンセル" onClick={onClose} />
      </ActionButtonContainer>
    </Container>
  );
};
