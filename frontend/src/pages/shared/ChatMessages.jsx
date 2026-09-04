import { useAuth } from '../../context/AuthContext'
import { useChat } from '../../context/ChatContext'
import { useLocation } from 'react-router-dom'
import { useState, useRef } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import API_URL from '../../config'
import Navbar from '../../components/common/Navbar'
import { HiChevronLeft, HiOutlineChatAlt2, HiOutlineTrash, HiPaperAirplane } from 'react-icons/hi'

const ChatMessages = () => {
    const {user,token}=useAuth();
    const location=useLocation();
    const {socket,activeChat,setActiveChat,joinChat,sendMessage}=useChat();

    const [conversations,setConversations]=useState([]);
    const [messages,setMessages]=useState([]);
    const [newMessage,setNewMessage]=useState("");
    const [loading,setLoading]=useState(true);
    const messagesEndRef=useRef(null);

    // to scroll to bottom
    const scrollToBottom=()=>{
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
    }

    // to fetch the conversations (btw biyer and seller)
    useEffect(()=>{
        const fetchConversations=async()=>{
            try {
                const res=await axios.get(`${API_URL}/api/chat/user`,{
                    headers:{Authorization:`Bearer ${token}`}
                });
                const fetchedConversations=res.data;
                setConversations(fetchedConversations);
                if(location.state?.chat)
                {   
                    const existingChat=fetchedConversations.find((c)=>
                        c._id===location.state.chat._id,
                    );
                    if(existingChat)
                    {
                        setActiveChat(existingChat);
                    }
                    else
                    {
                        setActiveChat(location.state.chat);
                    }
                }
                setLoading(false);
            } 
            catch (err) {
                console.error("Error fetching conversations : ",err);
                setLoading(false);
            }
        };
        fetchConversations();
    },[user,location.state]);

    // to fetch messages
    useEffect(()=>{
        if(activeChat)
        {
            const fetchMessages=async()=>{
                try {
                    const res=await axios.get(`${API_URL}/api/chat/${activeChat._id}`,{
                        headers:{Authorization:`Bearer ${token}`}
                    });
                    setMessages(res.data.messages || []);
                    scrollToBottom();
                } 
                catch (err) {
                    console.error("Error fetching messages : ",err);
                }
            }
            fetchMessages();
        }
    },[activeChat]);

    // ensure socket joins the chat room whenever socket or activeChat changes
    useEffect(()=>{
        if(socket && activeChat?._id)
        {
            joinChat(activeChat._id);
        }
    },[socket, activeChat?._id]);

    // updating the chat when the new message is recieved
    useEffect(()=>{
        if(socket)
        {
            const handleIncoming = (data) => {
                if(activeChat && data.chatId === activeChat._id)
                {
                    setMessages((prev) => {
                        if (data._id && prev.some((m) => m._id === data._id)) {
                            return prev;
                        }
                        return [...prev, data];
                    });
                }
                setConversations((prev) =>
                    prev.map((c) => {
                        if (c._id === data.chatId) {
                            const updatedMessages = Array.isArray(c.messages) ? [...c.messages, data] : [data];
                            return { ...c, messages: updatedMessages };
                        }
                        return c;
                    })
                );
            };

            socket.on("receiveMessage", handleIncoming);

            return () => {
                socket.off("receiveMessage", handleIncoming);
            };
        }
    },[socket, activeChat]);

    useEffect(()=>{
        scrollToBottom();
    },[messages]);

    useEffect(()=>{
        if(activeChat)
        {
            const timer=setTimeout(()=>scrollToBottom,100);
            return ()=>clearTimeout(timer);
        }
    },[activeChat]);

    // to send messages
    const handleSendMessage=async (e)=>{
        e.preventDefault();
        if(!newMessage.trim() || !activeChat)
        {
            return;
        }
        const textToSend=newMessage;
        setNewMessage("");
        
        try {
            const res=await axios.post(`${API_URL}/api/chat/send`,
                {
                    chatId:activeChat._id,
                    text:textToSend,
                },
                {
                    headers:{Authorization:`Bearer ${token}`}
                }
            );
            if(res.data.newMessage)
            {
                const savedMsg = res.data.newMessage;
                // Instantly show sent message in active view
                setMessages((prev) => {
                    if (prev.some((m) => m._id === savedMsg._id)) return prev;
                    return [...prev, savedMsg];
                });
                setConversations((prev) =>
                    prev.map((c) => {
                        if (c._id === activeChat._id) {
                            const updatedMessages = Array.isArray(c.messages) ? [...c.messages, savedMsg] : [savedMsg];
                            return { ...c, messages: updatedMessages };
                        }
                        return c;
                    })
                );

                sendMessage(
                    activeChat._id,
                    textToSend,
                    savedMsg._id,
                    savedMsg.createdAt,
                    savedMsg.image
                );
            }   
            scrollToBottom(); 
        } 
        catch (err) {
            console.error("Error sending message:",err);
        }
    }

    // to delete a chat 
    const handleDeleteChat=async(e,chatId)=>{
        e.stopPropagation();
        if(!window.confirm("Are you sure you want to delete this conversation?"))
        {
            return;
        }
        try {
            await axios.delete(`${API_URL}/api/chat/${chatId}`,{
                headers:{Authorization:`Bearer ${token}`}
            });
            setConversations((prev)=>prev.filter((c)=>c._id!==chatId));
            if(activeChat?._id===chatId)
            {
                setActiveChat(null);
            }
        } 
        catch (err) {
            console.error("Error deleteing chat:",err);
        }
    }

    // to delete a message from chat 
    const handleDeleteMessage=async(chatId,messageId)=>{
        if(!window.confirm("Delete this message"))
        {
            return;
        }
        try {
            const res=await axios.delete(`${API_URL}/api/chat/${chatId}/message/${messageId}`,{
                headers:{Authorization:`Bearer ${token}`}
            });
            setMessages(res.data.chat.messages);
        } 
        catch (err) {
            console.error("Error deleting message:",err);
        }
    }

    // to get the partner
    const getChatPartner=(chat)=>{
        return user._id===chat.buyer._id ? chat.seller : chat.buyer;
    }

    if(loading)
    {
        return (
            <div className="loader-full-page">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col overflow-hidden ${user?.role==='seller' ? 'h-[calc(100vh-120px)]' : 'h-screen md:h-screen pt-32 max-lg:pt-28'}`}>
            {user?.role !== 'seller' && <Navbar/>}
            <div className="flex flex-1 bg-[#f8fafc] font-sans relative overflow-hidden mt-0 md:mt-0">
                <div className={`w-full absolute inset-0 z-10 transition-transform duration-300 lg:relative lg:w-[350px] shrink-0 bg-white border-r border-[#e2e8f0] flex flex-col lg:translate-x-0 ${activeChat ? "-translate-x-full lg:-translate-x-0 hidden lg:flex" : ""}`}>
                    <div className="p-5 border-b border-[#f1f5f9]">
                        <h2 className="m-0 text-xl font-bold text-[#1e293b]">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {conversations.length===0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-[#94a3b8] text-center p-10">
                                <HiOutlineChatAlt2 className="w-20 h-20 mb-5 opacity-50"/>
                                <p>No conversations yet</p>
                            </div>
                        ):(
                            conversations.map((chat)=>(
                                <div key={chat._id} className={`p-[15px_20px] flex items-center gap-3 cursor-pointer transition-colors duration-200 border-b border-[#f8fafc] hover:bg-[#f1f5f9] group 
                                ${activeChat?._id === chat._id ? "bg-[#f0f9ff] border-r-[3px] border-r-[#00b4d8]" : ""}`}
                                onClick={()=>setActiveChat(chat)}
                                >
                                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-[#00b4d8] text-white flex items-center justify-center font-bold text-[0.9rem] md:text-base overflow-hidden">
                                        {getChatPartner(chat)?.profilePic ? (
                                            <img src={getChatPartner(chat).profilePic} className="w-full h-full object-cover" alt=''/>
                                        ):(
                                            getChatPartner(chat)?.name?.charAt(0)
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-[#1e293b] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                                            {getChatPartner(chat)?.name}
                                        </div>
                                        <div className="text-[0.85rem] text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis">
                                            {chat.messages.at(-1)?.text || "Started a conversation"}
                                        </div>
                                    </div>
                                    <button onClick={(e)=>handleDeleteChat(e,chat._id)} className="bg-transparent border-none text-[#94a3b8] p-2 rounded-lg cursor-pointer opacity-100 md:opacity-0 transition-all duration-200 flex items-center justify-center hover:text-red-500 hover:bg-red-100 md:group-hover:opacity-100" title='Delete Conversation'>
                                        <HiOutlineTrash/>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                {/* main chat area */}

                <div className="absolute inset-0 z-[5] lg:relative lg:flex-1 lg:z-auto flex flex-col bg-white w-full">
                {activeChat ? (
                    <>
                    <div className="p-[10px_15px] md:p-[15px_25px] bg-white sticky md:relative top-0 z-20 border-b border-[#e2e8f0] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                        <button
                            className="flex lg:hidden mr-2.5 bg-[#f1f5f9] border-none p-1.5 rounded-full text-[#1e293b]"
                            onClick={() => setActiveChat(null)}
                        >
                            <HiChevronLeft size={24} />
                        </button>
                        <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-[#00b4d8] text-white flex items-center justify-center font-bold text-[0.9rem] md:text-base overflow-hidden">
                            {getChatPartner(activeChat)?.profilePic ? (
                            <img
                                className="w-full h-full object-cover"
                                src={getChatPartner(activeChat).profilePic}
                                alt=""
                            />
                            ) : (
                            getChatPartner(activeChat)?.name?.charAt(0)
                            )}
                        </div>
                        <div className="font-bold text-[#1e293b]">
                            {getChatPartner(activeChat)?.name}
                        </div>
                        </div>
                    </div>

                    <div className="p-[15px] pb-[80px] md:p-[25px] md:pb-[25px] overflow-y-auto flex-1 flex flex-col gap-[15px] bg-[#f8fafc]">
                        {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`max-w-[85%] md:max-w-[70%] p-[12px_18px] rounded-[20px] text-[0.95rem] leading-[1.5] relative ${(msg.sender?._id || msg.sender) === user._id ? "self-end bg-[#00b4d8] text-white rounded-br-[4px] shadow-[0_4px_12px_rgba(0,180,216,0.2)]" : "self-start bg-white text-[#334155] rounded-bl-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.05)]"}`}
                        >
                            <div className="flex items-start gap-2 break-all">
                            {msg.image && (
                                <div className="mb-2 rounded-lg overflow-hidden">
                                <img
                                    src={msg.image}
                                    alt="Property Reference"
                                    className="w-full max-h-[200px] object-cover block"
                                />
                                </div>
                            )}
                            <div className="break-all">{msg.text}</div>
                            {(msg.sender?._id || msg.sender) === user._id && (
                                <button
                                className="bg-transparent border-none text-white/60 cursor-pointer p-0.5 rounded transition-all duration-200 mt-0.5 hover:text-white hover:bg-white/20"
                                onClick={() =>
                                    handleDeleteMessage(activeChat._id, msg._id)
                                }
                                title="Delete Message"
                                >
                                <HiOutlineTrash size={14} />
                                </button>
                            )}
                            </div>
                            <span className="text-[0.75rem] mt-1.5 opacity-70 block">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                            </span>
                        </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="p-[12px_15px] md:p-[20px_25px] bg-white sticky md:relative bottom-0 border-t border-[#e2e8f0] flex gap-[15px] items-center" onSubmit={handleSendMessage}>
                        <input
                        type="text"
                        className="flex-1 min-w-0 border border-[#e2e8f0] rounded-[30px] p-[12px_25px] outline-none text-[0.95rem] transition-colors duration-200 focus:border-[#00b4d8]"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit" className="bg-[#00b4d8] text-white border-none w-[45px] h-[45px] rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 text-xl hover:bg-[#0077b6] hover:scale-105 active:scale-95 shrink-0">
                        <HiPaperAirplane className="rotate-90" />
                        </button>
                    </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-[#94a3b8] text-center p-10">
                    <HiOutlineChatAlt2 className="w-20 h-20 mb-5 opacity-50" />
                    <h3 className="font-bold">Your Messages</h3>
                    <p>Select a conversation to start chatting</p>
                    </div>
                )}
                </div>     
            </div>
        </div>
    )
}


export default ChatMessages