import cron, { ScheduledTask } from 'node-cron';
import { logger } from '.';
import { REGISTERED_USERS } from "./mocks/dummy-user";

// APIエンドポイントのURL
const readApiUrl = "http://localhost:38082/query";
const writeApiUrl = "http://localhost:38080/query";
// const EXECUTOR_BOT_ID = "UserAccountId-REGISTERED_MESSAGE_BOT";

// cronジョブのインターフェース
interface RegisteredMessageOutput {
  body: string;
  id: string;
  title: string;
  cronFormular: string;
  groupChatId: string;
}

// GraphQLのレスポンスの型
interface GraphQLResponse<T> {
  data: T;
  errors?: { message: string }[]; // エラーがある場合のフィールド
}

// GraphQLクエリ
const getRegisteredMessagesQuery = `
  query GetRegisteredMessages($ownerId: String!) {
    getRegisteredMessages(ownerId: $ownerId) {
      id
      title
      body
      cronFormular
      groupChatId
    }
  }
`;

// postMessage用のGraphQLミューテーション
const postMessageMutation = `
  mutation PostMessage($input: PostMessageInput!) {
    postMessage(input: $input) {
      groupChatId
      messageId
    }
  }
`;

// PostMessageInputのインターフェース
interface PostMessageInput {
  content: string;
  executorId: string;
  groupChatId: string;
}

// MessageOutputのインターフェース
interface MessageOutput {
  groupChatId: string;
  messageId: string;
}

// 登録されたcronジョブを保持するマップ (messageId -> cron job)
const cronJobMap: { [key: string]: ScheduledTask } = {};

// readAPIからcronジョブを取得する関数 (GraphQL)
async function fetchRegisteredMessages(ownerId: string): Promise<RegisteredMessageOutput[]> {
  const response = await fetch(readApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getRegisteredMessagesQuery,
      variables: { ownerId },
    }),
  }).catch((error) => {
    console.error("Failed to fetch registered messages", error);
    throw new Error("Failed to fetch registered messages");
  } );


  // GraphQLのレスポンスを明示的に型キャスト
  const result = await response.json() as GraphQLResponse<{ getRegisteredMessages: RegisteredMessageOutput[] }>;
  if (result.errors) {
    console.error("GraphQL query failed", result.errors);
    throw new Error("Failed to fetch registered messages");
  }

  return result.data.getRegisteredMessages;
}

// postMessageミューテーションを実行する関数
async function postMessage(input: PostMessageInput): Promise<MessageOutput> {
  const response = await fetch(writeApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: postMessageMutation,
      variables: { input },
    }),
  });

  // GraphQLレスポンスをパースして型キャスト
  const result = await response.json() as GraphQLResponse<{ postMessage: MessageOutput }>;

  if (result.errors) {
    console.error("GraphQL mutation failed", result.errors);
    
    throw new Error("Failed to post message");
  }

  return result.data.postMessage;
}

// 1分ごとにメッセージ取得とスケジューリングを行う関数
export async function schedulerMain() {
  // 1分ごとに実行
  setInterval(async () => {
    try {
      // メッセージを取得
      let registeredMessages : RegisteredMessageOutput[] = [];
      // REGISTERED_USERS.forEach(async (user) => {
      for (const user of REGISTERED_USERS) {
        const messages = await fetchRegisteredMessages(user.id);
        registeredMessages = [...registeredMessages, ...messages];
      }

      // 取得したメッセージごとにスケジューリング
      registeredMessages.forEach(message => {
        // 既に同じメッセージIDのジョブがスケジュールされているか確認
        if (cronJobMap[message.id]) {
          logger.info(`Message ID: ${message.id} is already scheduled. Skipping.`);
          return; // 既にスケジュールされている場合はスキップ
        }

        // message.cronFormularに基づいてスケジュールをセット
        const cronJob = cron.schedule(message.cronFormular, async () => {
          logger.info(`Executing job for message ID: ${message.id}`);

          // メッセージ送信処理
          const input: PostMessageInput = {
            content: message.body,
            executorId: REGISTERED_USERS[0].id,
            groupChatId: message.groupChatId,
          };

          try {
            const result = await postMessage(input);
            logger.info(`Message posted successfully: ${result.messageId} to group ${result.groupChatId}`);
          } catch (error) {
            console.error(`Failed to post message for ID: ${message.id}`, error);
          }
        }, {
          scheduled: true,
          timezone: "Asia/Tokyo" // Set timezone to Tokyo
        });

        // ジョブをマップに登録して重複を防止
        cronJobMap[message.id] = cronJob;
        logger.info("cronJobMap:", cronJobMap)

        logger.info(`Scheduled message ID: ${message.id} with cron: ${message.cronFormular}`);
      });
    } catch (error) {
      console.error("Error in schedulerMain:", error);
    }
  }, 30000); // 30秒ごとに実行
}
