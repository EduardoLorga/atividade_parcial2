import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/events')
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 animate-fade-in-up">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-indigo-200">O Futuro da Tecnologia</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-200 tracking-tight">
                        ConectaTech Summit
                    </h1>

                    <p className="text-xl text-indigo-200/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Junte-se aos líderes da indústria, desenvolvedores e visionários para explorar as fronteiras da inovação tecnológica.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="glass-button px-8 py-4 rounded-xl text-lg flex items-center justify-center gap-2 group">
                            Garantir meu Lugar
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#events" className="glass-button-secondary px-8 py-4 rounded-xl text-lg">
                            Ver Programação
                        </a>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section id="events" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold text-white">Próximos Eventos</h2>
                        <div className="h-px flex-1 bg-white/10 ml-8"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map(event => (
                            <div key={event.id} className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group">
                                <div className="relative h-48 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent z-10"></div>
                                    <img
                                        src={event.image_url}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/80 text-white backdrop-blur-sm">
                                            Tech
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-1">
                                        {event.description}
                                    </p>

                                    <div className="space-y-3 pt-4 border-t border-white/5">
                                        <div className="flex items-center text-indigo-200/80 text-sm">
                                            <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
                                            {new Date(event.date).toLocaleDateString('pt-PT', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </div>

                                        <div className="flex items-center text-indigo-200/80 text-sm">
                                            <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
