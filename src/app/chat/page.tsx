import HelloAnimated from "./(components)/HelloAnimated";
import getUserServerAction from "../../actions/getUserServerAction";
import TermsCard from "./(components)/TermsCard";
import IntroduceTypeWriter from "./(components)/IntroduceTypewriter";
import { notFound } from "next/navigation";
import ChatWindowLinks from "./(components)/ChatWindowLinks";
import { v4 } from "uuid";
import ChatWindowContainer from "./(components)/ChatWindowContainer";
import StartConvoPrompt from "./(components)/StartConvoPrompt";
import { cookies } from "next/headers";

const sampleWindows = ["Hello World", "first introduction", "Nice 1"];

export default async function ChatPage() {
    const hour = new Date().getHours();
    const user = await getUserServerAction();

    if (!user) {
        const cookie = cookies();
        if (cookie.has("nickname")) {
            cookie.delete("nickname");
        }
        notFound();
    }

    return (
        <>
            <HelloAnimated delay={0} nickname={user.nickname} hour={hour} />
            {user.chat_ids.length == 0 ? (
                <>
                    <IntroduceTypeWriter animation_delay={1} />
                    <TermsCard animation_delay={7.5} />
                </>
            ) : (
                <>
                    <StartConvoPrompt className="py-9 mx-8" animation_delay={0.5}/>
                    <ChatWindowContainer chat_ids={sampleWindows} animation_delay={1}>
                        {user.chat_ids.map(({title, chat_id}) => (
                            <ChatWindowLinks key={v4()} chat_id={chat_id}>{title}</ChatWindowLinks>
                        ))}
                    </ChatWindowContainer>
                </>
            )}
        </>
    );
}
