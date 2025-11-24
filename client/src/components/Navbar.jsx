import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-105 transition-transform">
                                C
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
                                ConectaTech
                            </span>
                        </Link>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Eventos</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Meus Eventos</Link>
                                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-semibold text-white">{user.name}</span>
                                        <span className="text-xs text-gray-400">{user.email}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-400 hover:text-red-400 p-2 rounded-full hover:bg-white/5 transition-all"
                                        title="Sair"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">Login</Link>
                                <Link to="/register" className="glass-button px-5 py-2.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                    Criar Conta
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden bg-gray-900/95 backdrop-blur-xl border-b border-white/10">
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Eventos</Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Meus Eventos</Link>
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <div className="flex items-center px-3 mb-3">
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-white">{user.name}</div>
                                            <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                    <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-white/5">
                                        <LogOut size={18} className="mr-2" />
                                        Sair
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col gap-2">
                                <Link to="/login" className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-white/5">Login</Link>
                                <Link to="/register" className="block w-full text-center px-3 py-2 rounded-md text-base font-medium glass-button">Criar Conta</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
