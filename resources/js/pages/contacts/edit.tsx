import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

export default function EditContact({ contact }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        company: contact.company || '',
        address: contact.address || '',
        notes: contact.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('contacts.update', contact.id));
    };

    return (
        <>
            <Head title={`Edit ${contact.name}`} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-8 max-w-2xl">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Link href={route('contacts.show', contact.id)}>
                                <Button variant="outline">
                                    ← Back to Contact
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            ✏️ Edit Contact
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            Update the details for {contact.name}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="md:col-span-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1"
                                        placeholder="John Doe"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1"
                                        placeholder="john@example.com"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="mt-1"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Company */}
                                <div className="md:col-span-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Input
                                        id="company"
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        className="mt-1"
                                        placeholder="Acme Corp"
                                    />
                                    {errors.company && (
                                        <p className="text-red-600 text-sm mt-1">{errors.company}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="mt-1"
                                        placeholder="123 Main St, City, State 12345"
                                        rows={3}
                                    />
                                    {errors.address && (
                                        <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>

                                {/* Notes */}
                                <div className="md:col-span-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className="mt-1"
                                        placeholder="Additional information about this contact..."
                                        rows={4}
                                    />
                                    {errors.notes && (
                                        <p className="text-red-600 text-sm mt-1">{errors.notes}</p>
                                    )}
                                </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link href={route('contacts.show', contact.id)}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}