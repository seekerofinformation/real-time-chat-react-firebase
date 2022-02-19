import {CHAT_ROUTE, LOGIN_ROUTE} from "../utils/constants";
import Login from "./Login";
import Chat from "./Chat";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <Login />
    }
];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        element: <Chat />
    }
];