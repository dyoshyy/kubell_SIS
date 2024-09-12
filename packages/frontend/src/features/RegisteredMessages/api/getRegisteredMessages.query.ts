import { gql } from "__generated__/query";

export const GetRegtisteredMessagesQuery = gql(`
    query GetRegisteredMessagesQuery($ownerId: String!) {
        getRegisteredMessages(ownerId: $ownerId) {
            ...RegisteredMessagesFragment
        }   
    }
`);
