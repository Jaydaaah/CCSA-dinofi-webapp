"use client";
// Components
import {
    Accordion,
    AccordionItem,
    Divider,
    Checkbox,
    Button,
    Selection,
} from "@nextui-org/react";
import { motion, useAnimationControls } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Terms and Condition text
import { termsandcondition } from "@/resources/termscondition";
import { Key, useCallback, useEffect, useState } from "react";
import StartMessage from "./StartMessage";

interface Props {
    animation_delay: number;
}

export default function TermsCard({ animation_delay }: Props) {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>( new Set([]) );
    const setAccordionOpen = useCallback((isOpen: boolean) => {
        setSelectedKeys(isOpen ? new Set(["1"]) : new Set([]));
    }, [setSelectedKeys])

    const [showterms, setShowterms] = useState(true);
    const [acceptterms, setAcceptterms] = useState(false);

    return (
        <>
            <motion.div
                initial={{
                    opacity: 0.0,
                    z: 2,
                    y: 10,
                }}
                animate={{
                    z: 2,
                    opacity: 1.0,
                    y: 0
                }}
                transition={{
                    delay: animation_delay ?? 1,
                    duration: 1,    
                }}
                className="w-full"
            >
                <Divider className="mt-10" />
                <Accordion
                    className="my-2"
                    variant="bordered"
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={(keys) => {
                        if (showterms)
                            setSelectedKeys(keys as Set<string>)
                    }}
                >
                    <AccordionItem
                        className={showterms ? "" : "cursor-default"}
                        key="1"
                        aria-label="Accordion 1"
                        title="Terms and Conditions"
                    >
                        <Markdown
                            className="markdown text-sm text-justify leading-6 pr-4"
                            remarkPlugins={[remarkGfm]}
                        >
                            {termsandcondition}
                        </Markdown>
                        <motion.div
                            className="px-4 mb-2 flex flex-col gap-2"
                            initial={{
                                opacity: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                            }}
                            transition={{
                                delay: 0.3,
                            }}
                        >
                            <Checkbox
                                color="default"
                                isSelected={acceptterms}
                                onValueChange={setAcceptterms}
                            >
                                By using Dino-fi, you agree to these terms and
                                conditions.
                            </Checkbox>
                            <Button
                                className="self-center"
                                color={acceptterms ? "success" : "default"}
                                disabled={!acceptterms}
                                onClick={() => {
                                    setAccordionOpen(false);
                                    setShowterms(false);
                                }}
                            >
                                Confirm
                            </Button>
                        </motion.div>
                    </AccordionItem>
                </Accordion>
                <Divider className="mb-10" />
            </motion.div>
            <StartMessage show={acceptterms && !showterms} />
        </>
    );
}
