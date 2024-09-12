import { gql } from "__generated__/command";

export const CreateRegisteredMessageMutation = gql(`
  mutation createRegisteredMessageMutation($input: CreateRegisteredMessageInput!) {
    createRegisteredMessage(input: $input) {
      registeredMessageId
    }
  }
`);
