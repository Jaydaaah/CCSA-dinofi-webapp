"use client";

import setNicknameServerAction from "@/actions/setNicknameServerAction";
import { Input } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    ChangeEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

// Icons
import { IoMdSend } from "react-icons/io";

export default function NicknameField() {
    const [nickname, setNickname] = useState("");
    const [accepting, setAccepting] = useState(true);
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const onTextChangeHandler = useCallback(
        ({ target }: ChangeEvent<HTMLInputElement>) => {
            if (accepting) {
                setNickname(target.value);
            }
        },
        []
    );

    return (
        <form
            className={`flex ${nickname ? "justify-end" : "justify-start"}`}
            ref={formRef}
            action={async (formData) => {
                await setNicknameServerAction(nickname);
                router.push("/chat");
                setAccepting(false);
            }}
        >
            <AnimatePresence>
                {accepting && (
                    <motion.div
                        layout
                        initial={{
                            width: "0%",
                            opacity: 0,
                        }}
                        animate={{
                            width: "100%",
                            opacity: 1,
                        }}
                        exit={{
                            width: "0%",
                            opacity: 0
                        }}
                    >
                        <Input
                            autoComplete="off"
                            placeholder="Your Nickname..."
                            onChange={onTextChangeHandler}
                            value={nickname}
                            size="lg"
                            endContent={
                                <AnimatePresence>
                                    {nickname.trim() != "" && (
                                        <motion.span
                                            initial={{
                                                opacity: 0,
                                                x: 10,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                x: 10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                duration: 0.05,
                                            }}
                                            whileHover={{
                                                scale: 1.2,
                                            }}
                                            whileTap={{
                                                scale: 1,
                                            }}
                                            className="text-primary cursor-pointer text-2xl"
                                            onClick={() =>
                                                formRef.current?.requestSubmit()
                                            }
                                        >
                                            <IoMdSend>Hello</IoMdSend>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            }
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}
