import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Trash2, Ticket } from 'lucide-react';

const Dashboard = () => {
    const [myEvents, setMyEvents] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchMyEvents();
        }
    }, [user]);

    const fetchMyEvents = async () => {
        try {
            const res = await axios.get('/eventos/meus-eventos');
            setMyEvents(res.data);
        } catch (error) {
            console.error('Error fetching my events:', error);
        }
    };

    const handleCancel = async (eventId) => {
        if (!confirm('Tem a certeza que deseja cancelar a inscrição?')) return;
        try {
            await axios.delete(`/eventos/${eventId}/cancelar`);
            fetchMyEvents();
            alert('Inscrição cancelada.');
        } catch (error) {
            console.error('Error canceling subscription:', error);
            alert('Erro ao cancelar inscrição.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Meus Eventos</h1>
                    <p className="text-indigo-200/60">Gerencie suas inscrições e certificados</p>
                </div>
                <div className="glass-panel px-6 py-3 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-white font-medium text-sm">{user?.name}</p>
                        <p className="text-indigo-200/60 text-xs">{user?.email}</p>
                    </div>
                </div>
            </div>

            {myEvents.length === 0 ? (
                <div className="glass-panel rounded-2xl p-12 text-center">
                    <Ticket className="w-16 h-16 text-indigo-300/20 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">Nenhuma inscrição encontrada</h3>
                    <p className="text-indigo-200/60 mb-6">Você ainda não se inscreveu em nenhum evento.</p>
                    <a href="/" className="glass-button inline-flex px-6 py-2 rounded-lg">
                        Explorar Eventos
                    </a>
                </div>
            ) : (
                <div className="grid gap-6">
                    {myEvents.map((event) => (
                        <div key={event.id} className="glass-card rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 group">
                            <img
                                src={event.image_url}
                                alt={event.title}
                                className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />

                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                <div className="flex flex-col md:flex-row items-center gap-4 text-indigo-200/80 text-sm">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
                                        {new Date(event.date).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                                        {event.location}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleCancel(event.id)}
                                className="glass-button-secondary px-4 py-2 rounded-lg text-red-300 hover:bg-red-500/20 hover:text-red-200 hover:border-red-500/30 flex items-center gap-2 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Cancelar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
