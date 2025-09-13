// FIX: Import React to use hooks like useState, useRef, and useEffect.
import React from 'react';
import { Card, Button, Avatar } from './UI.jsx';
import { SendIcon, CheckCircleIcon, MessageIcon } from './Icons.jsx';

const ConversationListItem = ({ conversation, otherUser, lastMessage, isActive, onSelect }) => {
    return (
        <li onClick={() => onSelect(conversation.id)} className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${isActive ? 'bg-secondary' : ''}`}>
            <Avatar src={otherUser.avatarUrl} alt={otherUser.firstName} size="md" />
            <div className="ml-3 overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 truncate">{`${otherUser.firstName} ${otherUser.lastName}`}</p>
                <p className="text-xs text-gray-500 truncate">{lastMessage?.content}</p>
            </div>
        </li>
    );
};

const ConversationList = ({ conversations, messages, users, currentUser, activeConversationId, onSelectConversation }) => {
    const sortedConversations = [...conversations].sort((a, b) => new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp));

    return (
        <ul className="divide-y divide-gray-200">
            {sortedConversations.map(conv => {
                const otherUserId = conv.participants.find(pId => pId !== currentUser.id);
                const otherUser = users.find(u => u.id === otherUserId);
                const lastMessage = messages
                    .filter(m => m.conversationId === conv.id)
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

                if (!otherUser) return null;

                return (
                    <ConversationListItem
                        key={conv.id}
                        conversation={conv}
                        otherUser={otherUser}
                        lastMessage={lastMessage}
                        isActive={conv.id === activeConversationId}
                        onSelect={onSelectConversation}
                    />
                );
            })}
        </ul>
    );
};

const MessageBubble = ({ message, isSender, isRead }) => {
  const formatMessageTimestamp = (isoString) => {
      if (!isoString) return '';
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  return (
      <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isSender ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
              <p className="text-sm">{message.content}</p>
          </div>
          <div className="flex items-center mt-1 px-1">
              <p className="text-xs text-gray-400">{formatMessageTimestamp(message.timestamp)}</p>
              {isSender && isRead && (
                  <CheckCircleIcon className="h-4 w-4 text-secondary ml-1" />
              )}
          </div>
      </div>
  );
};

const ChatWindow = ({ conversation, messages, currentUser, otherUser, onSendMessage }) => {
    const [newMessage, setNewMessage] = React.useState('');
    const messagesEndRef = React.useRef(null);
    
    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!conversation || !otherUser) {
        return (
            <div className="flex flex-col h-full justify-center items-center text-center text-gray-500 p-4">
                <MessageIcon className="h-24 w-24 mb-4" />
                <h2 className="text-xl font-semibold">Your Messages</h2>
                <p>Select a conversation to start chatting, or find someone on the network page.</p>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            onSendMessage(otherUser.id, newMessage);
            setNewMessage('');
        }
    };

    const conversationMessages = messages
        .filter(m => m.conversationId === conversation.id)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const lastOtherUserMessageTimestamp = conversationMessages
        .filter(m => m.senderId === otherUser?.id)
        .map(m => new Date(m.timestamp))
        .pop() || new Date(0); 

    return (
        <div className="flex flex-col h-full">
            <header className="flex items-center p-4 border-b border-gray-200">
                <Avatar src={otherUser.avatarUrl} alt={otherUser.firstName} size="md" />
                <div className="ml-3">
                    <h3 className="font-semibold text-lg">{`${otherUser.firstName} ${otherUser.lastName}`}</h3>
                </div>
            </header>
            <main className="flex-1 p-4 overflow-y-auto space-y-2">
                {conversationMessages.map(msg => {
                    const isSender = msg.senderId === currentUser.id;
                    const isRead = isSender && new Date(msg.timestamp) <= lastOtherUserMessageTimestamp;
                    return (
                        <MessageBubble
                            key={msg.id}
                            message={msg}
                            isSender={isSender}
                            isRead={isRead}
                        />
                    );
                })}
                <div ref={messagesEndRef} />
            </main>
            <footer className="p-4 border-t border-gray-200">
                <form onSubmit={handleSubmit} className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full border-gray-300 rounded-full py-2 px-4 focus:ring-primary focus:border-primary"
                    />
                    <Button type="submit" className="rounded-full !p-3">
                        <SendIcon className="h-5 w-5"/>
                    </Button>
                </form>
            </footer>
        </div>
    );
};

export const MessagingPage = ({ targetUserId, users, currentUser, conversations, messages, onSendMessage }) => {
  const getActiveConversationDetails = () => {
      let activeConvId;

      if (targetUserId) {
          const conversation = conversations.find(c => c.participants.includes(currentUser.id) && c.participants.includes(targetUserId));
          activeConvId = conversation?.id || `new-${targetUserId}`;
      } else if (conversations.length > 0) {
          const sortedConversations = [...conversations].sort((a, b) => new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp));
          activeConvId = sortedConversations[0]?.id;
      } else {
          return { activeConversation: null, otherUser: null };
      }

      if (!activeConvId) {
          return { activeConversation: null, otherUser: null };
      }

      let activeConversation = conversations.find(c => c.id === activeConvId);
      let otherUser;

      if (activeConversation) {
          const otherUserId = activeConversation.participants.find(pId => pId !== currentUser.id);
          otherUser = users.find(u => u.id === otherUserId);
      } else if (activeConvId.startsWith('new-')) {
          const otherUserId = activeConvId.split('-')[1];
          otherUser = users.find(u => u.id === otherUserId);
          if (otherUser) {
              activeConversation = {
                  id: activeConvId,
                  participants: [currentUser.id, otherUserId],
              };
          }
      }
      
      return { activeConversation, otherUser };
  };

  const { activeConversation, otherUser } = getActiveConversationDetails();

  const handleSelectConversation = (conversationId) => {
      const conversation = conversations.find(c => c.id === conversationId);
      if (conversation) {
          const otherUserId = conversation.participants.find(id => id !== currentUser.id);
          window.location.hash = `#/messages/${otherUserId}`;
      }
  };

  return (
      <div className="h-[calc(100vh-80px)]">
        <Card className="flex h-full">
            <aside className="w-1/3 border-r border-gray-200 h-full overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Messages</h2>
                </div>
                <ConversationList
                    conversations={conversations}
                    messages={messages}
                    users={users}
                    currentUser={currentUser}
                    activeConversationId={activeConversation?.id}
                    onSelectConversation={handleSelectConversation}
                />
            </aside>
            <main className="w-2/3 h-full">
                <ChatWindow
                    conversation={activeConversation}
                    messages={messages}
                    currentUser={currentUser}
                    otherUser={otherUser}
                    onSendMessage={onSendMessage}
                />
            </main>
        </Card>
      </div>
  );
};