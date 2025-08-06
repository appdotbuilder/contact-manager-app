import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Contact Manager - Organize Your Network">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:from-slate-900 dark:to-slate-800">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-indigo-200 bg-indigo-50 px-6 py-2.5 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-900/70"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white/50 dark:text-slate-300 dark:hover:bg-white/5"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow">
                    <main className="flex w-full max-w-6xl flex-col lg:flex-row lg:gap-12 lg:items-center">
                        {/* Main Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="mb-8">
                                <h1 className="mb-6 text-4xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    📇 Contact Manager
                                </h1>
                                <p className="text-xl lg:text-2xl text-slate-600 mb-8 dark:text-slate-300">
                                    Organize your network and never lose touch with important connections
                                </p>
                            </div>

                            {/* Feature Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:bg-slate-800/50 dark:border-slate-700/50">
                                    <div className="text-3xl mb-4">🔍</div>
                                    <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">Smart Search</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Find contacts instantly by name, email, company, or phone number</p>
                                </div>
                                
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:bg-slate-800/50 dark:border-slate-700/50">
                                    <div className="text-3xl mb-4">✏️</div>
                                    <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">Full CRUD</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Create, read, update, and delete contacts with ease</p>
                                </div>
                                
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:bg-slate-800/50 dark:border-slate-700/50">
                                    <div className="text-3xl mb-4">📊</div>
                                    <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">Rich Details</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Store notes, addresses, company info, and more for each contact</p>
                                </div>
                                
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:bg-slate-800/50 dark:border-slate-700/50">
                                    <div className="text-3xl mb-4">🎯</div>
                                    <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">Modern UI</h3>
                                    <p className="text-slate-600 dark:text-slate-400">Beautiful, responsive interface that works on all devices</p>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    href={route('contacts.index')}
                                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-indigo-700 shadow-lg hover:shadow-xl dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                    View All Contacts
                                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                
                                <Link
                                    href={route('contacts.create')}
                                    className="inline-flex items-center justify-center rounded-lg border-2 border-indigo-600 bg-transparent px-8 py-4 text-lg font-semibold text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-400 dark:hover:text-slate-900"
                                >
                                    Add New Contact
                                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Preview/Mockup */}
                        <div className="flex-1 mt-12 lg:mt-0">
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 dark:bg-slate-800/90 dark:border-slate-700/50">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
                                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Recent Contacts</h3>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">50 total</span>
                                    </div>
                                    
                                    {/* Mock contact items */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                JS
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-800 dark:text-slate-200">John Smith</div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400">john@company.com</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold">
                                                MJ
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-800 dark:text-slate-200">Mary Johnson</div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400">mary.j@startup.io</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-semibold">
                                                DB
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-800 dark:text-slate-200">David Brown</div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400">david@agency.com</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="mt-12 text-sm text-slate-500 dark:text-slate-400">
                    Built with ❤️ by{" "}
                    <a 
                        href="https://app.build" 
                        target="_blank" 
                        className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                        app.build
                    </a>
                </footer>
            </div>
        </>
    );
}