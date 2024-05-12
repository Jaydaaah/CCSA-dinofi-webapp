"use server";

import ChatFeed from "@/components/ChatFeed";
import PromptArea from "@/components/PrompArea";
import { MessagesProvider } from "@/contexts/Messages";
import { StreamingMsgProvider } from "@/contexts/StreamMsg";
import { RetrieveMsg } from "@/lib/api_calls";
import { NextPage } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ChatNowPage: NextPage = async () => {
    const user_id = cookies().get("user_id")?.value;
    if (!user_id) {
        redirect("/login");
    }
    const data = await RetrieveMsg(user_id);

    return (
        <>
            <div className="max-w-[54em] min-w-[30em] px-2 py-[4px] ml-[10vw] mr-[80px] bg-white">
                <MessagesProvider datas={data?.reverse()}>
                    <StreamingMsgProvider>
                        <ChatFeed />
                        <PromptArea />
                    </StreamingMsgProvider>
                </MessagesProvider>
            </div>
        </>
    );
};

export default ChatNowPage;
