import Link from "next/link";

export default function HomePage() {
    return (
        <>
            <div className="flex h-full flex-col items-center justify-start pt-[11rem]">
                <h1 className="text-[8rem] font-semibold">Welcome!</h1>
                <h2 className="text-4xl">Students of CCSA</h2>
                <div className="flex items-center p-5 text-lg">
                    <Link
                        href="/chat-now"
                        className="border-[2px] px-2 py-1 rounded-xl hover:outline outline-1"
                    >
                        Chat now
                    </Link>
                    <p className="px-2">with Dino-Fi</p>
                </div>
            </div>
        </>
    );
}
