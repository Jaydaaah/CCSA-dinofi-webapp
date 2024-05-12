const BASE_URL = "http://localhost";
const SERVER_PORT = 8080;
const link = `${BASE_URL}:${SERVER_PORT}`;

function ServerLink(route: string, params?: Record<string, string>) {
    if (!route.startsWith("/"))
        throw Error("please input a valid route starting with /");
    return (
        `${link}${route}` + (params ? `?${new URLSearchParams(params)}` : "")
    );
}

export { ServerLink };
