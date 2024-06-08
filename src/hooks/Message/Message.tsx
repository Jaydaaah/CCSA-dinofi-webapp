"use client";

import { popCookiePromptServerAction } from "@/actions/cookiePromptServerActions";
import {
    FetchPromptStream,
    MyContextPairDefaultValue,
    MyContextPairType,
    SetStateWrapper,
} from "@/lib/extra_function";
import {
    ReactNode,
    RefObject,
    createContext,
    createRef,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

export interface Message {
    text: string;
    isright: boolean;
    timestamp: number;
}

function toMessage(text: string, isright: boolean, timestamp: number) {
    const new_msg: Message = { text, isright, timestamp };
    return new_msg;
}

export interface RenderableMessage {
    type?: "Stream" | "Static";
    stream?: AsyncGenerator<string, void, unknown>;
    message?: Message;
    timestamp?: number;
}

type options = {
    stream?: AsyncGenerator<string, void, unknown>;
    message?: Message;
};

function toRenderable({ stream, message }: options): RenderableMessage {
    return {
        type: message ? "Static" : "Stream",
        timestamp: stream ? Date.now() : undefined,
        stream,
        message,
    };
}

function MessagesToRenderable(data: Message[]): RenderableMessage[] {
    return data.map((msg) => {
        return {
            type: "Static",
            message: msg,
        };
    });
}

const defaultMessage: RenderableMessage[] = [];

const MessageContext = createContext<MyContextPairType<RenderableMessage[]>>(
    MyContextPairDefaultValue(defaultMessage)
);
const FormRefContext = createContext<RefObject<HTMLFormElement>>(
    createRef<HTMLFormElement>()
);

interface Prop {
    children?: ReactNode;
    data: Message[];
    path: string;
    chat_id: string;
}

export function MessageProvider({
    children,
    chat_id,
    data,
    path
}: Prop) {
    const [messages, setMessages] = useState(MessagesToRenderable(data));
    const formRef = useRef<HTMLFormElement>(null);

    const streamCount = useMemo(() => {
        return messages.filter((value) => value.type == "Stream").length;
    }, [messages]);

    const addMessage = useCallback(
        (option: options) => {
            setMessages((prev) => {
                return [toRenderable(option), ...prev];
            });
        },
        [setMessages]
    );

    const submitMessage = useCallback(
        (prompt: string) => {
            if (prompt && streamCount <= 0) {
                addMessage({
                    message: toMessage(prompt, true, Date.now()),
                });
                setTimeout(() => {
                    const streamObj = FetchPromptStream(path, prompt, chat_id);
                    addMessage({
                        stream: streamObj
                    });
                }, 500);
            }
        },
        [addMessage, streamCount]
    );

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        popCookiePromptServerAction(chat_id).then((cookie_prompt) => {
            if (messages.length == 0 && cookie_prompt) {
                timeout = setTimeout(() => {
                    submitMessage(cookie_prompt);
                }, 200);
            }
        })
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    return (
        <form
            ref={formRef}
            action={(formData) => {
                const prompt = formData.get("prompt")?.toString();
                if (prompt) submitMessage(prompt);
            }}
        >
            <FormRefContext.Provider value={formRef}>
                <MessageContext.Provider value={[messages, setMessages]}>
                    {children}
                </MessageContext.Provider>
            </FormRefContext.Provider>
        </form>
    );
}

export function useMessage() {
    const [messages] = useContext(MessageContext);
    const formRef = useContext(FormRefContext);

    const submit = useCallback((prompt?: string) => {
        if (prompt) {
            formRef.current?.setAttribute("prompt", prompt);
        }
        formRef.current?.requestSubmit();
    }, []);

    return {
        messages,
        submit,
    };
}

export function useStreamable() {
    const [messages, usetMessages] = useContext(MessageContext);
    const setMessages = SetStateWrapper(usetMessages);

    const convertToStatic = useCallback(
        (
            streamObj: AsyncGenerator<string, void, unknown>,
            timestamp: number,
            final_text: string
        ) => {
            setMessages((prev) => {
                return prev.map((rmsg) => {
                    if (rmsg.stream == streamObj) {
                        return toRenderable({
                            message: toMessage(final_text, false, timestamp),
                        });
                    } else {
                        return rmsg;
                    }
                });
            });
        },
        [usetMessages]
    );

    const streamCount = useMemo(() => {
        return messages.filter((value) => value.type == "Stream").length;
    }, [messages]);

    return {
        streamCount,
        convertToStatic,
    };
}
