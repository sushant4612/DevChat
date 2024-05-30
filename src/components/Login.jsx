import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { auth, googleProvider } from "../firebase";
import { signInWithRedirect } from "firebase/auth";

const Login = () => {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to DevChat</h2>

                <div 
                    className="login-button google"
                    onClick={() => signInWithRedirect(auth, googleProvider)}
                >
                    <GoogleOutlined />
                    Sign in with Google
                </div>

                <br /><br />
                <div className="login-button facebook">
                    <FacebookOutlined />
                    Sign in with Facebook
                </div>
            </div>
        </div>
    );
}

export default Login;