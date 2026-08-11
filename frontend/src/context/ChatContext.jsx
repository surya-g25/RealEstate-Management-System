import React,{createContext} from "react";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {io} from 'socket.io-client'
import { useContext } from "react";
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

            newSocket.on("recieveMessage",(data)=>{
                if(activeChatRef.current?._id!==data.chatId)
                {
                    setNotifications((prev)=>[...prev,data]);
                }
            });
            return ()=>newSocket.close();
        }
    },[user]);

    // to join a chat
    const joinChat=(chatId)=>{
        if(socket)
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