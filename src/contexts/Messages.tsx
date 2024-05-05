"use client";

import axios from "axios";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useOptimistic,
    useState,
} from "react";

export interface Message {
    text: string;
    isright: boolean;
    timestamp: number;
}

const emptyMessages: Message[] = [];

const MessagesContext = createContext(emptyMessages);
const setMessagesContext = createContext<((msg: Message) => void) | undefined>(
    undefined
);

interface Props {
    datas: Message[] | undefined | null;
    children: React.ReactNode;
}

const MessagesProvider: React.FC<Props> = ({ datas, children }) => {
    const [optiMessages, addMessages] = useOptimistic<Message[], Message>(
        datas ?? emptyMessages,
        (state, newMsg) => [...state, newMsg]
    );

    return (
        <MessagesContext.Provider value={optiMessages}>
            <setMessagesContext.Provider value={addMessages}>
                {children}
            </setMessagesContext.Provider>
        </MessagesContext.Provider>
    );
};

interface MSGResponse {
    data: Message[];
}

const SERVER_PORT = 8080;

const useMessages = () => {
    const optiMessages = useContext(MessagesContext);
    const addMessages = useContext(setMessagesContext);

    return {
        optiMessages,
        addMessages,
    };
};

export { MessagesProvider, useMessages };
