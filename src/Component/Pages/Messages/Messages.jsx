import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextArea from '../../../Component/Atom/TextArea/TextArea';
import image from '../../../Assets/thought.png';
import { useSelector } from 'react-redux';

import { db } from '../../../api/Firebase/ChatApi';
import { collection, addDoc, onSnapshot, query, orderBy, where, getDocs } from "firebase/firestore";

import { fetchUserData } from '../../../api/User/User';
import { selectTokens, selectIsAuthenticated } from '../../../store/user/userSlice';
import { RiSendPlaneFill } from "react-icons/ri";

import './styles.css'



const Messages = () => {
    const { userID } = useParams();
    const logedInUser = useSelector((state) => state.user.user);
    const tokens = useSelector(selectTokens);

    const [messages, setMessages] = useState([]);
    const [showMessages, setShowMessages] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        if (!userID) {
            setCurrentUser(null);
            return;
        }

        fetchUserData(tokens.access, userID)
            .then((data) => {
                setCurrentUser(data);
                setShowMessages(true);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, [userID, tokens.access]);

    useEffect(() => {
        // Fetch messages for the current chat
        if (!currentUser) return;

        const q = query(
            collection(db, "messages"),
            where("senderId", "in", [logedInUser.id, currentUser.id]),
            where("receiverId", "in", [logedInUser.id, currentUser.id]),
            orderBy("time", "asc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = [];
            try {
                querySnapshot.forEach((doc) => {
                    msgs.push(doc.data());
                });
                setMessages(msgs);
            }
            catch (e) {
                console.log("Error getting documents: ", e);
            }
        });

        return () => unsubscribe();
    }, [logedInUser.id, currentUser]);

    useEffect(() => {

        if (!logedInUser) return;
        const fetchContacts = async () => {
            try {
                const q = query(collection(db, "messages"), where("senderId", "==", logedInUser.id));
                const querySnapshot = await getDocs(q);
                const uniqueContacts = new Set();
                const contactDetails = [];

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const receiverId = data.receiverId;
                    if (!uniqueContacts.has(receiverId)) {
                        uniqueContacts.add(receiverId);
                        contactDetails.push({
                            id: receiverId,
                            avatar: data.contactAvatar || image,
                            name: data.contactName,
                            initials: data.contactInitials,
                            messagePreview: data.text,
                        });
                    }
                });

                setContacts(contactDetails);
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        };

        fetchContacts();
    }, [logedInUser.id, contacts]);

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        const message = {
            fromMe: true,
            avatar: logedInUser?.profile_pic_url || image,
            initials: `${logedInUser.first_name[0]}${logedInUser.last_name[0]}`,
            text: newMessage,
            time: new Date().toISOString(),
            senderId: logedInUser.id,
            userName: `${logedInUser.first_name} ${logedInUser.last_name}`,
            receiverId: currentUser.id,
            contactName: `${currentUser.first_name} ${currentUser.last_name}`,
            contactAvatar: currentUser?.profile_pic_url,
            contactInitials: `${currentUser.first_name[0]}${currentUser.last_name[0]}`
        };

        try {
            await addDoc(collection(db, "messages"), message);
            setNewMessage('');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleContactClick = (contact) => {
        setShowMessages(true);
        setCurrentUser(contact);
    };

    return (
        <div className='w-full flex justify-center items-start h-screen'>
            <div className='w-11/12 md:w-4/5 flex flex-row gap-8'>
                <div className="flex h-full w-[300px] flex-col border-r border-gray-200 bg-white">
                    <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                                <img
                                    src={logedInUser?.profile_pic_url}
                                    alt={"profile image"}
                                    className="rounded-full w-10 h-10 object-cover"
                                    style={{ objectPosition: 'center center' }}
                                />
                            </div>
                            <div className="grid gap-0.5">
                                <div className="font-medium">{logedInUser.first_name} {logedInUser.last_name}</div>
                                <div className="text-xs text-green-500">Online</div>
                            </div>
                        </div>
                    </header>
                    <div className="flex-1 overflow-auto p-4" style={{ maxHeight: '70vh', minHeight: '50vh', scrollbarWidth: 'thin', scrollbarColor: '#483BBF #E5E7EB' }}>
                        {contacts.map((contact, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3 rounded-lg p-3 hover:bg-gray-200 cursor-pointer ${contact?.id === currentUser?.id ? 'border-l-4 border-primary' : ''}`}
                                onClick={() => handleContactClick(contact)}
                            >
                                <div className="relative w-10 h-10">
                                    <img
                                        src={contact.avatar}
                                        alt={"profile image"}
                                        className="rounded-full w-10 h-10 object-cover"
                                        style={{ objectPosition: 'center center' }}
                                    />
                                </div>
                                <div className="grid gap-0.5">
                                    <div className="font-medium text-sm">{contact.name}</div>
                                    <div className="text-xs text-gray-500">
                                        {(contact.messagePreview).slice(0, 12)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
                <div className="flex w-full flex-col bg-gray-100 ">
                    {showMessages ? (
                        <>
                            <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10">
                                        <img
                                            src={currentUser?.avatar ? currentUser?.avatar : currentUser?.profile_pic_url}
                                            className="rounded-full w-10 h-10 object-cover"
                                            style={{ objectPosition: 'center center' }}
                                        />
                                    </div>
                                    <div className="grid gap-0.5">
                                        <div className="font-medium">{currentUser?.name ? currentUser?.name : currentUser?.first_name + ' ' + currentUser?.last_name}</div>
                                        <div className="text-xs text-green-500">Online</div>
                                    </div>
                                </div>
                            </header>
                            <div className="flex-1 overflow-auto p-4" style={{ maxHeight: '70vh', minHeight: '50vh' }}>
                                <div className="grid gap-6">
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`flex ${msg.senderId === logedInUser.id ? 'justify-end' : 'justify-start'} gap-3`}>
                                            <div className={`relative w-10 h-10 ${msg.senderId === logedInUser.id ? 'order-last' : ''}`}>
                                                <img
                                                    src={msg.avatar}
                                                    className="rounded-full w-10 h-10 object-cover"
                                                    style={{ objectPosition: 'center center' }}
                                                />
                                            </div>
                                            <div
                                                className={`grid gap-2 p-3 shadow-sm ${msg.senderId === logedInUser.id ? 'bg-primary text-white' : 'bg-gray-200'}`}
                                                style={{ maxWidth: '70%', minWidth: '15%', borderRadius: '15px 0 15px 15px' }}
                                            >
                                                {msg.senderId !== logedInUser.id && <div className="font-medium">{msg.userName}</div>}
                                                <p className='text-sm'>{msg.text}</p>
                                                <div className="text-xs text-gray-500">{new Date(msg.time).toLocaleTimeString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 border border-gray-200 rounded-lg shadow-md">
                                <div className="flex items-center justify-between px-4 py-2 bg-white rounded-t-lg">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="ml-2 p-2 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none"
                                    >
                                        <RiSendPlaneFill className="text-xl" />
                                        <span className="sr-only">Send</span>
                                    </button>
                                </div>
                            </div>

                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-xl text-gray-500">Select a contact to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
