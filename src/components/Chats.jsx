import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            navigate('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me',
            {
                headers: {
                    "project-id" : "591f84b2-ce49-4c95-86e9-b092958c77a0",
                    "user-name" : user.email,
                    "user-secret" : user.uid,

                }
            }
        ).then(() => {
            setLoading(false);
        }).catch(() => {
            let formData = new FormData();
            formData.append('email',user.email);
            formData.append('username', user.email);
            formData.append('secret', user.uid);

            getFile(user.photoURL).then((avatar) => {
                formData.append('avatar',avatar, avatar.name);

                axios.post('https://api.chatengine.io/users', 
                    formData,
                    { headers : {"private-key" : "e3d2d126-f7b2-40d1-ac6d-45bcbc5f7fae"}}
                )
                .then( () => {
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error);
                })
            })
        })
    },[user, navigate])

    if(!user && loading) return 'Loading....';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    DevChat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine 
                height = "calc(100vh - 66px)"
                projectID = "591f84b2-ce49-4c95-86e9-b092958c77a0"
                userName = {user.email}
                userSecret = {user.uid}
            />
        </div>
    );
}

export default Chats;