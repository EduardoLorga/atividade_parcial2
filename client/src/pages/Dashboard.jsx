import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const res = await axios.get('/utilizador/inscricoes');
            if (Array.isArray(res.data)) {
                setRegistrations(res.data);
            } else {
                setRegistrations([]);
                console.error("Unexpected response format for registrations:", res.data);
            }
        } catch (error) {
            console.error('Error fetching registrations:', error);
            setRegistrations([]);
        }
    };

    const handleCancel = async (registrationId) => {
        if (!confirm('Tem a certeza que deseja cancelar esta inscrição?')) return;
        try {
            await axios.delete(`/inscricoes/${registrationId}`);
            setRegistrations(registrations.filter(reg => reg.registration_id !== registrationId));
        } catch (error) {
            console.error('Error cancelling registration:', error);
            alert('Erro ao cancelar inscrição');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Eventos</h1>
            {registrations.length === 0 ? (
                <p className="text-gray-500 text-lg">Ainda não está inscrito em nenhum evento.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {registrations.map((event) => (
                        <div key={event.registration_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border-l-4 border-indigo-500">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h2>
                                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                                <div className="flex items-center text-gray-500 mb-2">
                                    <Calendar size={18} className="mr-2" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center text-gray-500 mb-6">
                                    <MapPin size={18} className="mr-2" />
                                    <span>{event.location}</span>
                                </div>

                                <button
                                    onClick={() => handleCancel(event.registration_id)}
                                    className="w-full flex items-center justify-center bg-red-50 text-red-600 py-2 px-4 rounded-md hover:bg-red-100 transition-colors font-medium"
                                >
                                    <Trash2 size={18} className="mr-2" />
                                    Cancelar Inscrição
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
