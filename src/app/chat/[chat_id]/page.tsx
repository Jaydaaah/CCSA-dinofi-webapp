import { MessageProvider } from "@/hooks/Message/Message";
import { RetrieveMsg } from "@/lib/api_calls";
import ChatFeed from "./(components)/ChatFeed";
import { notFound } from "next/navigation";
import ChatPromptArea from "./(components)/ChatPromptArea";
import { cookies } from "next/headers";

export default async function ChatPage({
    params,
}: {
    params: { chat_id: string };
}) {
    const serverFetch = await RetrieveMsg(params.chat_id);

    if (!serverFetch) {
        notFound();
    }

    return (
        <MessageProvider
            path="/api/chat-stream"
            chat_id={serverFetch._id}
            data={serverFetch.data.reverse()}
        >
            <div className="fixed w-full left-0 bottom-0 flex flex-col">
                <ChatFeed />
                <ChatPromptArea className=""/>
            </div>
        </MessageProvider>
    );
}
