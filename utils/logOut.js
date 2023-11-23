import { loginLink } from "../env.js";

export function logOut() {

    document.cookie = "myData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.open(loginLink, "_self");
}
