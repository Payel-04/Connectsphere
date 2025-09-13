// FIX: Import React for JSX compilation.
import React from 'react';
import { Card, Button, Avatar } from './UI.jsx';

const UserCard = ({ user }) => (
    <Card className="text-center transition-shadow hover:shadow-xl">
        <div className="h-20 bg-cover bg-center" style={{ backgroundImage: `url(${user.bannerUrl})` }}></div>
        <div className="p-4">
            <a href={`#/profile/${user.id}`}>
                <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} size="lg" className="-mt-12 mx-auto border-4 border-white" />
            </a>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">{`${user.firstName} ${user.lastName}`}</h3>
            <p className="text-sm text-gray-500 h-10">{user.headline}</p>
            <Button variant="secondary" className="mt-4" fullWidth>Connect</Button>
        </div>
    </Card>
);

export const NetworkPage = ({ currentUser, users }) => {
    const otherUsers = users.filter(u => u.id !== currentUser.id);

    return (
        <div>
            <Card className="p-4 mb-6">
                <h1 className="text-xl font-semibold">People you may know</h1>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {otherUsers.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};