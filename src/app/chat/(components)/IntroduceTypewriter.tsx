"use client";

import TypewriterComponent from "typewriter-effect";

interface Props {
    animation_delay: number
}

export default function IntroduceTypeWriter({animation_delay}: Props) {
    return (
        <div
        className="pt-5 px-4">
            <TypewriterComponent
                options={{  
                    cursor: ""
                }}
                onInit={(typewriter) =>
                    typewriter
                        .start()
                        .pauseFor(animation_delay * 1000)
                        .changeDelay(50)
                        .typeString(
                            "Before you can proceed using Dino-fi chatbot. Please read our terms and condition first."
                        )
                }
            />
        </div>
    );
}
