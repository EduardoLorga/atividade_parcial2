import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [events, setEvents] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('/eventos');
            setEvents(res.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleSubscribe = async (eventId) => {
        console.log('Attempting to subscribe to event:', eventId);
        console.log('Current user:', user);
        if (!user) {
            console.log('No user, redirecting to login');
            navigate('/login');
            return;
        }
        try {
            console.log('Sending request to server...');
            const res = await axios.post(`/eventos/${eventId}/inscrever`);
            console.log('Subscription response:', res.data);
            alert('Inscrição realizada com sucesso!');
        } catch (error) {
            console.error('Subscription error:', error);
            alert(error.response?.data?.error || 'Erro ao inscrever');
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Eventos Disponíveis</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        {event.image_url && (
                            <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />
                        )}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>

                            <div className="flex items-center text-gray-500 mb-2">
                                <Calendar size={18} className="mr-2" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center text-gray-500 mb-6">
                                <MapPin size={18} className="mr-2" />
                                <span>{event.location}</span>
                            </div>

                            <button
                                onClick={() => handleSubscribe(event.id)}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                            >
                                Inscrever-se
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
