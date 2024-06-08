"use client";

import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    chat_id: string;
    children?: ReactNode;
}

export default function ChatWindowLinks({ chat_id, children }: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 1,
                y: 10,
            }}
            whileInView={{
                opacity: 0.5,
                y: 0,
            }}
            whileHover={{
                opacity: 1.0,
                scale: 1.02,
            }}
            transition={{
                duration: 0.1,
            }}
            className="my-1 mx-10"
        >
            <Link href={`/chat/${chat_id}`}>
                <Card className="bg-opacity-30" shadow="sm">
                    <CardBody>{children}</CardBody>
                </Card>
            </Link>
        </motion.div>
    );
}
