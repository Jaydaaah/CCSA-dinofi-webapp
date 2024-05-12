import { NextPage } from "next";
import Link from "next/link";

import { Montserrat } from "next/font/google";

import "./global.tw.css";
import { title } from "process";
const font = Montserrat({ subsets: ["latin"] });

export const metadata = {
    title: "Welcome to Dino-Fi bot",
    description: "Generated by Next.js",
};

interface Props {
    children: React.ReactNode;
}

const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Presentational", path: "/presentation" },
    { title: "Chat Now", path: "/chat-now" },
];

const RootLayout: NextPage<Props> = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`${font.className} pt-[68px] h-[100vh] bg-slate-50 bg-opacity-50`}
            >
                <header className="fixed top-0 w-full py-3 px-3 shadow-sm rounded-b-md bg-white">
                    <nav className="flex justify-end">
                        <h1 className="flex-grow font-bold text-3xl content-center px-3 z-[1]">
                            <Link href={"/"}>Dino-Fi bot</Link>
                        </h1>
                        {navLinks.map((item) => {
                            return (
                                <Link
                                    key={item.title}
                                    href={item.path}
                                    className="animated-links my-2 mx-4 "
                                >
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </header>
                {children}
            </body>
        </html>
    );
};

export default RootLayout;
