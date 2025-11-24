const db = require('./src/db');

const events = [
    {
        title: 'Tech Summit 2024',
        description: 'A maior conferência de tecnologia do ano. Venha conhecer as novidades em IA, Web e Mobile. Palestrantes internacionais e networking de alto nível.',
        date: '2024-11-15',
        location: 'Lisboa, PT',
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Workshop React Avançado',
        description: 'Aprenda padrões avançados de React, Performance, Server Components e State Management com especialistas da indústria.',
        date: '2024-12-05',
        location: 'Online',
        image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Cybersecurity Bootcamp',
        description: 'Imersão total em segurança ofensiva e defensiva. Aprenda a proteger aplicações contra as ameaças mais recentes.',
        date: '2025-01-20',
        location: 'Porto, PT',
        image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'AI & Machine Learning Expo',
        description: 'Descubra como a Inteligência Artificial está transformando indústrias. Demos ao vivo e painéis de discussão.',
        date: '2025-02-10',
        location: 'São Paulo, BR',
        image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'DevOps Days',
        description: 'Automação, CI/CD, Kubernetes e cultura DevOps. O evento essencial para engenheiros de infraestrutura.',
        date: '2025-03-15',
        location: 'Rio de Janeiro, BR',
        image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'UX/UI Design Conference',
        description: 'Tendências de design, acessibilidade e user research. Workshops práticos para designers de todos os níveis.',
        date: '2025-04-05',
        location: 'Curitiba, BR',
        image_url: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Blockchain Revolution',
        description: 'Além das criptomoedas: Smart Contracts, DeFi e o futuro da Web3.',
        date: '2025-05-20',
        location: 'Florianópolis, BR',
        image_url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Startup Weekend',
        description: '54 horas para criar uma startup do zero. Mentoria, pitch e muita mão na massa.',
        date: '2025-06-12',
        location: 'Belo Horizonte, BR',
        image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Mobile World Congress Local',
        description: 'O futuro dos dispositivos móveis, 5G e desenvolvimento de apps nativos e cross-platform.',
        date: '2025-07-08',
        location: 'Brasília, BR',
        image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Data Science Summit',
        description: 'Big Data, Analytics e visualização de dados. Transforme dados em insights acionáveis.',
        date: '2025-08-22',
        location: 'Recife, BR',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Cloud Computing Forum',
        description: 'Estratégias de migração para nuvem, serverless e arquiteturas distribuídas.',
        date: '2025-09-14',
        location: 'Salvador, BR',
        image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Game Dev Gathering',
        description: 'Desenvolvimento de jogos, engines, arte e narrativa. O ponto de encontro para criadores de jogos.',
        date: '2025-10-30',
        location: 'Porto Alegre, BR',
        image_url: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1000&q=80'
    }
];

const stmt = db.prepare('INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?)');

events.forEach(event => {
    stmt.run(event.title, event.description, event.date, event.location, event.image_url);
});

console.log('Database seeded!');
