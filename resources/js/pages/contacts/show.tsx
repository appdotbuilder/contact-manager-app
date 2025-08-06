import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    address: string | null;
    notes: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    contact: Contact;
    [key: string]: unknown;
}

export default function ShowContact({ contact }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
            router.delete(route('contacts.destroy', contact.id));
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Head title={`${contact.name} - Contact Details`} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Link href={route('contacts.index')}>
                                <Button variant="outline">
                                    ← Back to Contacts
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="flex items-start gap-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                                {getInitials(contact.name)}
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    {contact.name}
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-400">
                                    {contact.email}
                                </p>
                                {contact.company && (
                                    <p className="text-lg text-gray-500 dark:text-gray-500 mt-1">
                                        🏢 {contact.company}
                                    </p>
                                )}
                            </div>
                            
                            <div className="flex gap-2">
                                <Link href={route('contacts.edit', contact.id)}>
                                    <Button>
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button variant="destructive" onClick={handleDelete}>
                                    🗑️ Delete
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Details */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                                    Contact Information
                                </h2>
                                
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            📧 Email
                                        </label>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            <a 
                                                href={`mailto:${contact.email}`}
                                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                {contact.email}
                                            </a>
                                        </div>
                                    </div>

                                    {contact.phone && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                📱 Phone
                                            </label>
                                            <div className="text-gray-900 dark:text-gray-100">
                                                <a 
                                                    href={`tel:${contact.phone}`}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    {contact.phone}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {contact.company && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                🏢 Company
                                            </label>
                                            <div className="text-gray-900 dark:text-gray-100">
                                                {contact.company}
                                            </div>
                                        </div>
                                    )}

                                    {contact.address && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                📍 Address
                                            </label>
                                            <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                                                {contact.address}
                                            </div>
                                        </div>
                                    )}

                                    {contact.notes && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                📝 Notes
                                            </label>
                                            <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                                {contact.notes}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Status */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Status
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        contact.status === 'active' 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                    }`}>
                                        {contact.status === 'active' ? '✅' : '⏸️'} {contact.status}
                                    </span>
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Timeline
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <div className="text-gray-600 dark:text-gray-400">Created</div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {formatDate(contact.created_at)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600 dark:text-gray-400">Last Updated</div>
                                        <div className="text-gray-900 dark:text-gray-100">
                                            {formatDate(contact.updated_at)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                    Quick Actions
                                </h3>
                                <div className="space-y-2">
                                    <a 
                                        href={`mailto:${contact.email}`}
                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        📧 Send Email
                                    </a>
                                    {contact.phone && (
                                        <a 
                                            href={`tel:${contact.phone}`}
                                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            📱 Call Phone
                                        </a>
                                    )}
                                    <Link 
                                        href={route('contacts.edit', contact.id)}
                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                    >
                                        ✏️ Edit Contact
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}