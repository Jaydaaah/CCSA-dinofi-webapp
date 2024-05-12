"use client";

import { Message, defineNewMessage, useMessages } from "@/contexts/Messages";
import { useStreamingMsg } from "@/contexts/StreamMsg";
import FormatText, { FormatBold } from "@/lib/text_formatter";
import { useCallback, useRef } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 } from "uuid";

const ChatFeed: React.FC = () => {
    const { optiMessages } = useMessages();
    const { Stream } = useStreamingMsg();
    const bottomRef = useRef<HTMLDivElement>(null);

    const scroll = useCallback((behavior: "smooth" | "instant") => {
        bottomRef.current?.scrollIntoView({ behavior });
    }, []);

    // useEffect(() => {
    //     scroll("instant");
    // }, []);

    // useEffect(() => {
    //     scroll("smooth");
    // }, [Stream, optiMessages]);

    const formatHTMLtag = useCallback((msg: Message) => {
        const _date = new Date(msg.timestamp);
        return (
            <div
                key={msg.timestamp}
                title={_date.toString()}
                className={
                    "border rounded-xl py-1 px-2 m-2" +
                    (msg.isright
                        ? " self-end bg-slate-300 ml-20"
                        : " self-start mr-20")
                }
            >
                {msg.text.split("\n").map((paragraph) => {
                    var links = paragraph.match(/\bhttps?:\/\/\S+/gi);
                    return (
                        <Markdown
                            key={v4()}
                            className="reactMarkDown p-1"
                            remarkPlugins={[remarkGfm]}
                        >
                            {paragraph}
                        </Markdown>
                    );
                })}
            </div>
        );
    }, []);

    return (
        <>
            <ul className="scroller-h flex flex-col-reverse pt-3 px-2 overflow-y-scroll white bg-opacity-80">
                {Stream
                    ? formatHTMLtag(defineNewMessage(Stream, false, Date.now()))
                    : ""}
                {optiMessages.map((msg) => formatHTMLtag(msg))}
                <div ref={bottomRef} className="clear-both float-left" />
            </ul>
        </>
    );
};

export default ChatFeed;
