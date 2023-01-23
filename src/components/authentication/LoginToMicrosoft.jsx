import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButtonRedirect } from "./Buttons/SignInButtonRedirect";
import { SignOutButtonRedirect } from "./Buttons/SignOutButtonRedirect";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export  const LoginToMicrosoft = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            { isAuthenticated ? <SignOutButtonRedirect /> : <SignInButtonRedirect /> }
            {props.children}
        </>
    );
};
