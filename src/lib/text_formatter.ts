export const FormatBold = (text: string) => {
    return text.replace(/\*{2}(.*?)\*{2}/g, "<b>$1</b>");
};

export const FormatItalic = (text: string) => {
    return text.replace(/\*(.*?)*/g, "<i>$1</i>");
};

export const FormatStrikeThrough = (text: string) => {
    return text.replace(/\~{2}(.*?)~{2}/g, "<s>$1</s>");
};

const FormatText = (text: string) => {
    return FormatBold(FormatItalic(FormatStrikeThrough(text)));
};

export default FormatText;
