"use client";

import { useMessages } from "@/contexts/Messages";

const ChatFeed: React.FC = () => {
    const { optiMessages } = useMessages();

    return (
        <>
            <ul className="scroller-h flex flex-col pt-3 px-2 overflow-y-scroll white bg-opacity-80">
                {optiMessages.map((msg) => (
                    <div
                        key={msg.timestamp}
                        title={msg.timestamp.toString()}
                        className={
                            "border rounded-xl py-1 px-2 m-1" +
                            (msg.isright
                                ? " self-end bg-slate-300"
                                : " self-start")
                        }
                    >
                        <li>{msg.text}</li>
                    </div>
                ))}
            </ul>
        </>
    );
};

export default ChatFeed;
