export default function TypingIndicator() {
    return (<svg height="40" width="40" className="loader light:loader-black dark:loader-white">
    <circle className="dot fill-foreground" cx="10" cy="20" r="3"/>
    <circle className="dot fill-foreground" cx="20" cy="20" r="3"/>
    <circle className="dot fill-foreground" cx="30" cy="20" r="3" />
    </svg>)
}