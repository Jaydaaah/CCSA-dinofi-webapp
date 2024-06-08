// Next UI
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";

// Custom Components
import NavigationBar from "@/components/NavigationBar";
import MotionBG from "@/components/MotionBG";

// Stylesheets
import "./global.tw.css";
import "./shooting.css";


// Font

export const metadata = {
    title: "Dino-Fi bot / CCSA",
    description: "CCSA Project Chatbot",
};

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/dino.ico"/>
            </head>
            <body
                className={`font-serif h-[100vh] flex`}
            >
                <NextUIProvider className="bg-background bg-opacity-0 text-foreground flex-grow flex flex-col">
                    <ThemeProvider attribute="class" defaultTheme="dark">
                        <MotionBG/>
                        <NavigationBar/>
                        <main className="flex-grow w-full max-w-7xl self-center flex flex-col">
                            {children}
                        </main>
                    </ThemeProvider>
                </NextUIProvider>
            </body>
        </html>
    );
};
