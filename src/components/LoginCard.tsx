"use client";

import { RegisterFromFormHandler } from "@/actions/RegisterAction";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const prefixes = ["Mr.", "Ms.", "Dr.", "Engr."];

const LoginCard: React.FC = () => {
    const [text, setText] = useState("");

    const onTextChangeHandler = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setText(event.target.value);
        },
        [text]
    );

    return (
        <>
            <div className="fixed top-0 flex justify-center items-center h-full w-full bg-opacity-80 bg-white">
                <div className="flex flex-col items-center border rounded-md w-[25rem] shadow-md p-5">
                    <h1 className="text-3xl font-semibold">Hi, there</h1>
                    <h2 className="text-sm my-2">
                        Before we proceed fill up this form:
                    </h2>
                    <form
                        action={async (formdata) => {
                            await RegisterFromFormHandler(formdata);
                        }}
                        className="flex flex-col mt-5"
                    >
                        <div>
                            <select
                                name="prefixfield"
                                className="border shadow-mg rounded-lg p-[0.9rem] text-l font-semibold mr-2"
                            >
                                {prefixes.map((prefix) => (
                                    <option key={prefix} value={prefix}>
                                        {prefix}
                                    </option>
                                ))}
                            </select>
                            <input
                                name="nicknamefield"
                                type="text"
                                className="border shadow-mg rounded-lg p-3 text-l font-semibold focus:outline-none capitalize"
                                placeholder="Nickname..."
                                onChange={onTextChangeHandler}
                                value={text}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-400 text-white rounded-md my-4 p-2 hover:bg-green-300 disabled:bg-gray-300"
                            disabled={text.trim() == ""}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginCard;
