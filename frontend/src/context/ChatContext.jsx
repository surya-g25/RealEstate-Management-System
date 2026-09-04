import { createContext, useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { io } from 'socket.io-client';
import API_URL from "../config";


const ChatContext=createContext();

export const ChatProvider=({children})=>{
    const {user}=useAuth();
    const [socket,setSocket]=useState(null);
    const [activeChat,setActiveChat]=useState(null);
    const [notifications,setNotifications]=useState([]);
    const activeChatRef=useRef();

    useEffect(()=>{
        activeChatRef.current=activeChat;
    },[activeChat]);

    useEffect(()=>{
        setActiveChat(null);
        setNotifications([]);
    },[user]);

    useEffect(()=>{
        if(user)
        {
            const newSocket=io(API_URL);
            setSocket(newSocket);

            newSocket.on("connect", () => {
                if(activeChatRef.current?._id)
                {
                    newSocket.emit("joinChat", activeChatRef.current._id);
                }
            });

            const handleIncomingNotification = (data) => {
                if(activeChatRef.current?._id!==data.chatId)
                {
                    setNotifications((prev)=>[...prev,data]);
                }
            };

            newSocket.on("receiveMessage", handleIncomingNotification);

            return ()=>newSocket.close();
        }
    },[user]);

    // to join a chat
    const joinChat=(chatId)=>{
        if(socket && chatId)
        {
            socket.emit("joinChat",chatId);
        }
    }

    const sendMessage=(
        chatId,
        text,
        messaageId=null,
        createdAt=new Date(),
        image=null
    )=>{
        if(socket && user)
        {
            const messageData={
                chatId,
                sender:user._id,
                text,
                image,
                createdAt,
                _id:messaageId
            };
            socket.emit("sendMessage",messageData);
            return messageData;
        }
        return null;
    }

    return (
        <ChatContext.Provider value={{
            socket,
            activeChat,
            setActiveChat,
            joinChat,
            sendMessage,
            notifications,
            setNotifications
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat=()=>useContext(ChatContext);