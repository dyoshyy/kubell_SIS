import { gql } from "__generated__/command";

export const DeleteMessageMutation = gql(`
  mutation DeleteMessageMutation($input: DeleteMessageInput!) {
    deleteMessage(input: $input) {
      groupChatId
    }
  }
`);
