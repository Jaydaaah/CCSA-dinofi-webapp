import { ScrollShadow, Spacer } from "@nextui-org/react";
import { ReactNode } from "react";


export default function ChatLayout({children}: {children: ReactNode}) {
    return (
        <div className="w-full max-w-2xl self-center">
            {children}
        </div>
    )
}