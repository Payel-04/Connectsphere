// FIX: Import React to use hooks like useState, useRef, and useEffect.
import React from 'react';
import { LogoIcon, HomeIcon, NetworkIcon, BriefcaseIcon, MessageIcon, SearchIcon } from './Icons.jsx';
import { Avatar } from './UI.jsx';

const Header = ({ currentUser, users }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);
    const searchContainerRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const results = users.filter(user =>
            user.id !== currentUser.id &&
            (
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(lowerCaseQuery) ||
                user.headline.toLowerCase().includes(lowerCaseQuery)
            )
        );
        setSearchResults(results);
    };
    
    const handleResultClick = () => {
        setSearchQuery('');
        setSearchResults([]);
        setIsSearchFocused(false);
    };

    return (
        <header className="bg-card shadow-sm fixed top-0 left-0 right-0 z-10">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="#/" className="flex-shrink-0">
                            <LogoIcon className="h-8 w-8 text-primary" />
                        </a>
                        <div className="relative ml-4" ref={searchContainerRef}>
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-background text-gray-900 placeholder-gray-500 block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 focus:outline-none focus:bg-white focus:border-gray-300 sm:text-sm"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => setIsSearchFocused(true)}
                            />
                            {isSearchFocused && searchQuery.trim() !== '' && (
                                <div className="absolute mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-20">
                                    {searchResults.length > 0 ? (
                                        <ul>
                                            {searchResults.map(user => (
                                                <li key={user.id}>
                                                    <a 
                                                        href={`#/profile/${user.id}`} 
                                                        onClick={handleResultClick}
                                                        className="flex items-center p-3 hover:bg-gray-100"
                                                    >
                                                        <Avatar src={user.avatarUrl} alt={user.firstName} size="sm" />
                                                        <div className="ml-3">
                                                            <p className="text-sm font-semibold text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                                                            <p className="text-xs text-gray-500">{user.headline}</p>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="p-3 text-sm text-gray-500">No results found.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                      <a href="#/" className="flex flex-col items-center text-gray-600 hover:text-primary">
                          <HomeIcon className="h-6 w-6" />
                          <span className="text-xs">Home</span>
                      </a>
                      <a href="#/network" className="flex flex-col items-center text-gray-600 hover:text-primary">
                          <NetworkIcon className="h-6 w-6" />
                          <span className="text-xs">My Network</span>
                      </a>
                       <a href="#/messages" className="flex flex-col items-center text-gray-600 hover:text-primary">
                          <MessageIcon className="h-6 w-6" />
                          <span className="text-xs">Messages</span>
                      </a>
                      <a href="#" className="flex flex-col items-center text-gray-600 hover:text-primary">
                          <BriefcaseIcon className="h-6 w-6" />
                          <span className="text-xs">Jobs</span>
                      </a>
                      <a href={`#/profile/${currentUser.id}`} className="flex flex-col items-center text-gray-600 hover:text-primary">
                        <Avatar src={currentUser.avatarUrl} alt={currentUser.firstName} size="sm" />
                        <span className="text-xs">Me</span>
                      </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export const MainLayout = ({ children, currentUser, users }) => {
    return (
        <div className="min-h-screen bg-background">
            <Header currentUser={currentUser} users={users} />
            <main className="pt-20 container mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
};