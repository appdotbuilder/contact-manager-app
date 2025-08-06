import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

interface PaginationData {
    data: Contact[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    contacts: PaginationData;
    search: string;
    [key: string]: unknown;
}

export default function ContactsIndex({ contacts, search }: Props) {
    const [searchQuery, setSearchQuery] = useState(search);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('contacts.index'), { search: searchQuery }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (contact: Contact) => {
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

    return (
        <>
            <Head title="Contacts" />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    📇 Contacts
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    Manage your contact list - {contacts.total} total contacts
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Link href={route('home')}>
                                    <Button variant="outline">
                                        ← Back to Home
                                    </Button>
                                </Link>
                                <Link href={route('contacts.create')}>
                                    <Button>
                                        + Add Contact
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Search contacts by name, email, company, or phone..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit">
                                🔍 Search
                            </Button>
                        </form>
                    </div>

                    {/* Contacts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contacts.data.map((contact) => (
                            <div
                                key={contact.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                                        {getInitials(contact.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">
                                            {contact.name}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                                            {contact.email}
                                        </p>
                                        {contact.company && (
                                            <p className="text-gray-500 dark:text-gray-500 text-sm truncate mt-1">
                                                🏢 {contact.company}
                                            </p>
                                        )}
                                        {contact.phone && (
                                            <p className="text-gray-500 dark:text-gray-500 text-sm truncate">
                                                📱 {contact.phone}
                                            </p>
                                        )}
                                        
                                        <div className="flex items-center gap-2 mt-4">
                                            <Link href={route('contacts.show', contact.id)}>
                                                <Button size="sm" variant="outline">
                                                    View
                                                </Button>
                                            </Link>
                                            <Link href={route('contacts.edit', contact.id)}>
                                                <Button size="sm" variant="outline">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(contact)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No contacts message */}
                    {contacts.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📭</div>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                {search ? 'No contacts found' : 'No contacts yet'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-6">
                                {search 
                                    ? `No contacts match "${search}". Try a different search term.`
                                    : 'Get started by adding your first contact!'
                                }
                            </p>
                            {search ? (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchQuery('');
                                        router.get(route('contacts.index'));
                                    }}
                                >
                                    Clear Search
                                </Button>
                            ) : (
                                <Link href={route('contacts.create')}>
                                    <Button>
                                        Add Your First Contact
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {contacts.last_page > 1 && (
                        <div className="flex justify-center mt-8">
                            <div className="flex gap-1">
                                {contacts.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (link.url) {
                                                router.get(link.url);
                                            }
                                        }}
                                        disabled={!link.url}
                                        className={`px-3 py-2 text-sm rounded-md ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}