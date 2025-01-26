import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
    error: ServerError | null = null
    token: string | null | undefined = localStorage.getItem('jwt')
    appLoaded = false

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.token,
            token => {
                if (token) {
                    if (token.startsWith("eyJ")) { // Typical JWT token starts with "eyJ"
                        localStorage.setItem('jwt', token);
                    } else {
                        localStorage.setItem('fb_access_token', token); // Store Facebook token separately
                    }
                }
                else{
                    localStorage.removeItem('jwt')
                }
            },
        )
    }

    setServerError(error: ServerError) {
        this.error = error
    }

    setToken = (token: string | null) => {
        this.token = token
    }

    setAppLoaded = () => {
        this.appLoaded = true
    }

}