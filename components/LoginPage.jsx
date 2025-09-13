// FIX: Import React to use the useState hook.
import React from 'react';
import { LogoIcon } from './Icons.jsx';
import { Card, Button, Input } from './UI.jsx';

export const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = React.useState('alexia.grant@example.com');
    const [password, setPassword] = React.useState('password123');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (email) {
        onLogin(email);
      }
    };

    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <LogoIcon className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold text-gray-800 ml-2">ConnectSphere</h1>
          </div>
          <Card className="p-8 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Stay updated on your professional world</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input 
                label="Email"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input 
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" fullWidth>
                Sign In
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              New to ConnectSphere? <a href="#/signup" className="font-semibold text-primary hover:underline">Join now</a>
            </p>
          </Card>
        </div>
      </div>
    );
};