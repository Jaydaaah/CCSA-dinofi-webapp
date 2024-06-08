"use client";

import {
    Avatar,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link as NLink,
    Switch,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Image resources
import ccsalogo from "@/resources/ccsalogo.png";

// Icons
import { PiSunBold } from "react-icons/pi";
import { IoIosMoon } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";

const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Chat Room", path: "/chat" },
];

export default function NavigationBar() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!mounted) setMounted(true);
    }, [mounted]);

    return (
        <Navbar className="bg-transparent" maxWidth="full" isBlurred>
            <NavbarBrand>
                <NavbarItem className="mr-3 w-8 h-8">
                    {pathname.startsWith("/chat/") && (
                        <span
                            onClick={router.back}
                            className="flex items-center cursor-pointer p-2 rounded-xl hover:bg-default-100"
                            aria-label="back"
                            title="Back"
                        >
                            <IoChevronBack />
                        </span>
                    )}
                </NavbarItem>
                <Link href={"/"} className="flex items-center">
                    <motion.h1
                        animate={{
                            y: [0, -10, 0],
                            opacity: [1, 0, 1],
                        }}
                        transition={{
                            ease: "easeInOut",
                            duration: 1,
                            repeat: Infinity,
                            delay: 5,
                            repeatDelay: 10,
                        }}
                        className="text-2xl font-bold p-1 rounded-lg hover:bg-opacity-50 hover:bg-default-100 transition-background"
                    >
                        Dino-fi
                    </motion.h1>
                </Link>
                <span>/ CCSA</span>
            </NavbarBrand>
            <NavbarContent className="gap-5 hidden sm:flex" justify="center">
                {navLinks.map(({ title, path }) => (
                    <NavbarItem key={title}>
                        <NLink
                            className="animated-links text-foreground"
                            href={path}
                        >
                            {title}
                        </NLink>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                {!mounted ? (
                    <></>
                ) : (
                    <Switch
                        size="md"
                        color="warning"
                        startContent={<PiSunBold />}
                        endContent={<IoIosMoon />}
                        onValueChange={(val) =>
                            setTheme(val ? "light" : "dark")
                        }
                        defaultSelected={theme == "light"}
                    />
                )}
                <Avatar size="md" src={ccsalogo.src} className="p-[2px]"/>
            </NavbarContent>
        </Navbar>
    );
}
