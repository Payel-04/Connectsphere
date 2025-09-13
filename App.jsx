// FIX: Import React to use hooks like useState and useEffect.
import React from 'react';
import { INITIAL_USERS, CURRENT_USER_ID, INITIAL_POSTS, INITIAL_CONVERSATIONS, INITIAL_MESSAGES } from './constants.js';
import { LoginPage } from './components/LoginPage.jsx';
import { SignUpPage } from './components/SignUpPage.jsx';
import { MainLayout } from './components/MainLayout.jsx';
import { HomePage } from './components/HomePage.jsx';
import { ProfilePage, EditProfileModal, UploadCvModal, AddCertificateModal } from './components/ProfilePage.jsx';
import { NetworkPage } from './components/NetworkPage.jsx';
import { MessagingPage } from './components/MessagingPage.jsx';

export function App() {
    const [route, setRoute] = React.useState(window.location.hash);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [users, setUsers] = React.useState(INITIAL_USERS);
    const [posts, setPosts] = React.useState(INITIAL_POSTS);
    const [conversations, setConversations] = React.useState(INITIAL_CONVERSATIONS);
    const [messages, setMessages] = React.useState(INITIAL_MESSAGES);
    
    const [modalState, setModalState] = React.useState({
      isEditModalOpen: false,
      isUploadCvModalOpen: false,
      isAddCertificateModalOpen: false,
    });

    React.useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };
        window.addEventListener('hashchange', handleHashChange);
        // Initial check in case the app loads with a hash
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleLogin = (email) => {
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) { // Simplified login, just finds a user
            setCurrentUser(user);
            setIsAuthenticated(true);
            window.location.hash = '/';
        } else {
            alert("User not found. Please sign up or use a pre-existing email.");
        }
    };
    
    const handleSignUp = (newUserData) => {
        const existingUser = users.find(u => u.email.toLowerCase() === newUserData.email.toLowerCase());
        if (existingUser) {
            alert('An account with this email already exists.');
            return;
        }

        const newUser = {
            id: `${users.length + 1}`, // Simple ID generation
            ...newUserData,
            location: 'Not specified',
            avatarUrl: `https://picsum.photos/seed/user${users.length + 1}/200/200`,
            bannerUrl: `https://picsum.photos/seed/banner${users.length + 1}/1200/300`,
            about: `Welcome to ConnectSphere, ${newUserData.firstName}! Update your 'about' section to tell your professional story.`,
            connections: 0,
            experience: [],
            projects: [],
            cv: null,
            certificates: []
        };
        
        setUsers(prevUsers => [...prevUsers, newUser]);
        setCurrentUser(newUser);
        setIsAuthenticated(true);
        window.location.hash = '/';
    };


    const updateUserState = (updatedUser) => {
        const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
        setUsers(updatedUsers);
        if (currentUser && currentUser.id === updatedUser.id) {
            setCurrentUser(updatedUser);
        }
    };

    const handleProfileUpdate = (updatedData) => {
        const updatedUser = { ...currentUser, ...updatedData };
        updateUserState(updatedUser);
        setModalState({ ...modalState, isEditModalOpen: false });
    };

    const handleCvUpdate = (cvData) => {
        const updatedUser = { ...currentUser, cv: cvData };
        updateUserState(updatedUser);
        setModalState({ ...modalState, isUploadCvModalOpen: false });
    };
    
    const handleAddCertificate = (certData) => {
        const newCertificate = {
            ...certData,
            id: Date.now(), // simple unique id
            issueDate: new Date().toISOString().split('T')[0]
        };
        const updatedUser = { 
            ...currentUser, 
            certificates: [...(currentUser.certificates || []), newCertificate] 
        };
        updateUserState(updatedUser);
        setModalState({ ...modalState, isAddCertificateModalOpen: false });
    };

    const handleSendMessage = (recipientId, content) => {
        let conversation = conversations.find(c =>
            c.participants.includes(currentUser.id) && c.participants.includes(recipientId)
        );
    
        if (!conversation) {
            const newConversation = {
                id: `c${conversations.length + 1}`,
                participants: [currentUser.id, recipientId],
                lastMessageTimestamp: new Date().toISOString(),
            };
            setConversations(prev => [...prev, newConversation]);
            conversation = newConversation;
        }
    
        const newMessage = {
            id: `m${messages.length + 1}`,
            conversationId: conversation.id,
            senderId: currentUser.id,
            content,
            timestamp: new Date().toISOString(),
        };
    
        setMessages(prev => [...prev, newMessage]);
    
        setConversations(prev => prev.map(c =>
            c.id === conversation.id
                ? { ...c, lastMessageTimestamp: newMessage.timestamp }
                : c
        ));
    };

    const handleAddPost = (content) => {
        const newPost = {
            id: Date.now(),
            authorId: currentUser.id,
            content,
            timestamp: 'Just now',
            likedBy: [],
            comments: [],
        };
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    const handleToggleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                const isLiked = post.likedBy.includes(currentUser.id);
                if (isLiked) {
                    return { ...post, likedBy: post.likedBy.filter(id => id !== currentUser.id) };
                } else {
                    return { ...post, likedBy: [...post.likedBy, currentUser.id] };
                }
            }
            return post;
        }));
    };

    const handleAddComment = (postId, commentContent) => {
        const newComment = {
            id: `c${Date.now()}`,
            authorId: currentUser.id,
            content: commentContent,
        };
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return { ...post, comments: [...post.comments, newComment] };
            }
            return post;
        }));
    };

    const renderPage = () => {
        const path = route.replace(/^#\/?/, ''); // Normalizes hash to 'profile/1' or 'network' or ''
        const [page, ...params] = path.split('/');

        switch (page) {
            case 'profile':
                const userId = params[0];
                return <ProfilePage 
                    userId={userId} 
                    users={users} 
                    currentUser={currentUser}
                    onUpdateUser={setModalState}
                />;
            case 'network':
                return <NetworkPage currentUser={currentUser} users={users} />;
            case 'messages':
                const targetUserId = params[0] || null;
                return <MessagingPage
                    key={targetUserId} // Re-mount component when target user changes
                    targetUserId={targetUserId}
                    users={users}
                    currentUser={currentUser}
                    conversations={conversations}
                    messages={messages}
                    onSendMessage={handleSendMessage}
                />;
            case '':
            case 'home':
            default:
                return <HomePage 
                    currentUser={currentUser} 
                    users={users} 
                    posts={posts} 
                    onAddPost={handleAddPost}
                    onToggleLike={handleToggleLike}
                    onAddComment={handleAddComment}
                />;
        }
    };
    
    const renderContent = () => {
        const path = route.replace(/^#\/?/, '');

        if (path === 'signup') {
            return <SignUpPage onSignUp={handleSignUp} />;
        }

        if (!isAuthenticated || !currentUser) {
            return <LoginPage onLogin={handleLogin} />;
        }

        return (
          <>
            <MainLayout currentUser={currentUser} users={users}>
              {renderPage()}
            </MainLayout>
            
            {modalState.isEditModalOpen && (
              <EditProfileModal 
                user={currentUser} 
                onSave={handleProfileUpdate}
                onClose={() => setModalState({ ...modalState, isEditModalOpen: false })}
              />
            )}
            {modalState.isUploadCvModalOpen && (
              <UploadCvModal
                user={currentUser}
                onSave={handleCvUpdate}
                onClose={() => setModalState({ ...modalState, isUploadCvModalOpen: false })}
              />
            )}
            {modalState.isAddCertificateModalOpen && (
              <AddCertificateModal
                onSave={handleAddCertificate}
                onClose={() => setModalState({ ...modalState, isAddCertificateModalOpen: false })}
              />
            )}
          </>
        );
    };

    return (
      <div className="App">
        <h1>App Component Loaded (Named Export)</h1>
        <p>This confirms the component is loading.</p>
        {renderContent()}
      </div>
    );
};