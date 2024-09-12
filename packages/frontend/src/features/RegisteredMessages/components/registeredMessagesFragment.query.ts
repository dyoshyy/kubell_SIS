import { FragmentType, gql } from "__generated__/query";

export const RegisteredMessagesFragment = gql(`
    fragment RegisteredMessagesFragment on RegisteredMessageOutput {
        id
        title
        body
    }
`);

export type MaskedRegisteredMessage = FragmentType<typeof RegisteredMessagesFragment>;
