import createAuth0Client from "@auth0/auth0-spa-js";

let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

export { authGuard } from '@marketredesign/auth0-spa-vue';

if(typeof window == null || typeof window == 'undefined') { 

var window = {};

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
    window.history.replaceState({}, document.title, window.location.pathname);

}


class Auth0VueWrapper {
    constructor(Vue, {
        onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
        redirectUri = 'http://localhost:8080/',
        ...options
    }) {
        // Lets make a new instance to store the data
        this.storeVM = new Vue({
            data() {
                return {
                    loading: true,
                    isAuthenticated: false,
                    user: {},
                    auth0Client: null,
                    popupOpen: false,
                    error: null
                };
            },
            methods: {},
            /** Use this lifecycle method to instantiate the SDK client */
            async created() {
                // Create a new instance of the SDK client using members of the given options object
                this.auth0Client = await createAuth0Client({
                    domain: options.domain,
                    client_id: options.clientId,
                    audience: options.audience,
                    scope: options.scope,
                    redirect_uri: redirectUri
                });

                try {
                    // If the user is returning to the app after authentication..
                    if (
                        window.location.search.includes("code=") &&
                        window.location.search.includes("state=")
                    ) {
                        // handle the redirect and retrieve tokens
                        const { appState } = await this.auth0Client.handleRedirectCallback();

                        // Notify subscribers that the redirect callback has happened, passing the appState
                        // (useful for retrieving any pre-authentication state)
                        onRedirectCallback(appState);
                    }
                } catch (e) {
                    this.error = e;
                } finally {
                    // Initialize our internal authentication state
                    this.isAuthenticated = await this.auth0Client.isAuthenticated();
                    this.user = await this.auth0Client.getUser();
                    this.loading = false;
                }
            },
        });
    }

    /**
     * Gets the state of the data
     * @return {Object}
     */
    get state() {
        return this.storeVM.$data;
    }

    /** Authenticates the user using a popup window */
    async loginWithPopup(o) {
        this.state.popupOpen = true;

        try {
            await this.state.auth0Client.loginWithPopup(o);
        } catch (e) {
            // eslint-disable-next-line
            console.error(e);
        } finally {
            this.state.popupOpen = false;
        }

        this.state.user = await this.state.auth0Client.getUser();
        this.state.isAuthenticated = true;
    }

    /** Handles the callback when logging in using a redirect */
    async handleRedirectCallback() {
        this.state.loading = true;
        try {
            await this.state.auth0Client.handleRedirectCallback();
            this.state.user = await this.state.auth0Client.getUser();
            this.state.isAuthenticated = true;
        } catch (e) {
            this.error = e;
        } finally {
            this.state.loading = false;
        }
    }

    /** Authenticates the user using the redirect method */
    loginWithRedirect(o) {
        return this.state.auth0Client.loginWithRedirect(o);
    }

    /** Returns all the claims present in the ID token */
    getIdTokenClaims(o) {
        return this.state.auth0Client.getIdTokenClaims(o);
    }

    /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
    getTokenSilently(o) {
        return this.state.auth0Client.getTokenSilently(o);
    }

    /** Gets the access token using a popup window */

    getTokenWithPopup(o) {
        return this.state.auth0Client.getTokenWithPopup(o);
    }

    /** Logs the user out and removes their session on the authorization server */
    logout(o) {
        return this.state.auth0Client.logout(o);
    }
}

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = (Vue, options) => {
    if (instance) return instance;

    // The 'instance' is simply a Vue object
    instance = new Auth0VueWrapper(Vue, options);

    return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
    install(Vue, options) {
        Vue.prototype.$auth = useAuth0(Vue, options);
    }
};

