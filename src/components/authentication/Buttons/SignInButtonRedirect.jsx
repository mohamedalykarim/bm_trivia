import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../authConfig";

import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';


/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButtonRedirect = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    return (
      <Button variant="contained" endIcon={<LoginIcon />} onClick={() => handleLogin("redirect")}>
        SignIn
      </Button>
    );
}
