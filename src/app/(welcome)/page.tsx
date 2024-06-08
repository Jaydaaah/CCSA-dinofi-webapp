import DinofiAnimated from "@/app/(welcome)/(components)/DinofiAnimated";
import NicknameField from "./(components)/NicknameField";
import WelcomeAnimated from "./(components)/WelcomeAnimated";

export default function HomePage() {
    return (
        <div className="flex-grow flex flex-row-reverse flex-wrap content-start sm:content-normal items-center justify-evenly translate-y-10 sm:-translate-y-10 gap-x-0 md:gap-x-10 lg:gap-x-24">
            <div className="">
                <DinofiAnimated />
            </div>
            <div className="flex flex-col gap-2">
                <WelcomeAnimated/>
                <br />
                <NicknameField/>
            </div>
        </div>
    );
}
