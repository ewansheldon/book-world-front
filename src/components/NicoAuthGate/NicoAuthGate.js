import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import { withCookies } from "react-cookie";
import * as PropTypes from 'prop-types';
import Nico from "../Nico/Nico.js";
import { isLoggedIn, setLoggedIn, logOut } from "../../services/AuthService.js"

const NicoAuthGate = ({cookies}) => {
    const [authorised, setAuthorised] = useState(isLoggedIn(cookies));

    const allowedUser = res => {
        const { email } = res.profileObj;
        return (email === process.env.EWAN || email === process.env.NICO)
    }

    const checkUser = res => {
        if (allowedUser(res)) {
            setAuthorised(true);
            setLoggedIn(cookies, res.tokenId);
        }
    }

    const failLogin = res => {
        logOut(cookies);
    }

    if (authorised) {
        return <Nico setAuthorised={setAuthorised} />
    }

    return (
        <GoogleLogin
            clientId={process.env.GOOGLE_AUTH_CLIENT_ID}
            buttonText="click here nico"
            onSuccess={checkUser}
            onFailure={failLogin}
            cookiePolicy="single_host_origin"
        />
    );
};

const cookies = PropTypes.shape({
    get: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired
});

NicoAuthGate.propTypes = {
    cookies: cookies.isRequired
};

export default withCookies(NicoAuthGate);