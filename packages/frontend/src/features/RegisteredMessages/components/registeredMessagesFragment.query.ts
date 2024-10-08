import { FragmentType, gql } from "__generated__/query";

export const RegisteredMessagesFragment = gql(`
    fragment RegisteredMessagesFragment on RegisteredMessageOutput {
        id
        groupChatId
        title
        body
        cronFormular
    }
`);

export type MaskedRegisteredMessages = FragmentType<typeof RegisteredMessagesFragment>;
