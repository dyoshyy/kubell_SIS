import { gql } from '@apollo/client';

export const GetRegtisteredMessagesQuery = gql(`
    query GetRegisteredMessagesQuery() {
        getRegisteredMessages() {
            ...RegisteredMessagesFragment
        }   
    }
`);
