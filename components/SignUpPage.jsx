import React from 'react';
import { LogoIcon } from './Icons.jsx';
import { Card, Button, Input } from './UI.jsx';

export const SignUpPage = ({ onSignUp }) => {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        headline: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const { confirmPassword, ...userData } = formData;
        onSignUp(userData);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full">
                <div className="flex items-center justify-center mb-6">
                    <LogoIcon className="h-10 w-10 text-primary" />
                    <h1 className="text-3xl font-bold text-gray-800 ml-2">ConnectSphere</h1>
                </div>
                <Card className="p-8 shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Join ConnectSphere</h2>
                    <p className="text-gray-600 mb-6">Create your professional profile</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="First Name" id="firstName" name="firstName"
                                placeholder="First Name" value={formData.firstName}
                                onChange={handleChange} required
                            />
                            <Input
                                label="Last Name" id="lastName" name="lastName"
                                placeholder="Last Name" value={formData.lastName}
                                onChange={handleChange} required
                            />
                        </div>
                         <Input
                            label="Headline" id="headline" name="headline"
                            placeholder="Your professional headline (e.g., Software Engineer)"
                            value={formData.headline} onChange={handleChange} required
                        />
                        <Input
                            label="Email" id="email" name="email" type="email"
                            placeholder="Email" value={formData.email}
                            onChange={handleChange} required
                        />
                        <Input
                            label="Password" id="password" name="password" type="password"
                            placeholder="Password" value={formData.password}
                            onChange={handleChange} required
                        />
                        <Input
                            label="Confirm Password" id="confirmPassword" name="confirmPassword" type="password"
                            placeholder="Confirm Password" value={formData.confirmPassword}
                            onChange={handleChange} required
                        />
                        <Button type="submit" fullWidth>
                            Agree & Join
                        </Button>
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already on ConnectSphere? <a href="#/" className="font-semibold text-primary hover:underline">Sign in</a>
                    </p>
                </Card>
            </div>
        </div>
    );
};