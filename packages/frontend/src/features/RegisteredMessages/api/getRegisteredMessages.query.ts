import { gql } from "__generated__/query";

export const GetRegisteredMessagesQuery = gql(`
    query GetRegisteredMessagesQuery($ownerId: String!) {
        getRegisteredMessages(ownerId: $ownerId) {
            ...RegisteredMessagesFragment
        }   
    }
`);
