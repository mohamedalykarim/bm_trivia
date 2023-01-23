import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
/**
 * Renders a button which, when selected, will redirect the page to the logout prompt
 */
export const SignOutButtonRedirect = () => {
    const { instance } = useMsal();
    
    const handleLogout = (logoutType) => {
        if (logoutType === "redirect") {
           instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }

    return (
        <Button 
        color="secondary"
        size="small"
        endIcon={<LogoutIcon />}
        onClick={() => handleLogout("redirect")}
        
        >
            SignOut
        </Button>
    );
}
