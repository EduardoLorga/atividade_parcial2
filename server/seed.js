const db = require('./src/db');

const events = [
    {
        title: 'Tech Summit 2024',
        description: 'A maior conferência de tecnologia do ano. Venha conhecer as novidades em IA, Web e Mobile.',
        date: '2024-11-15',
        location: 'Lisboa, PT',
        image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Workshop React Avançado',
        description: 'Aprenda padrões avançados de React, Performance e State Management.',
        date: '2024-12-05',
        location: 'Online',
        image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=80'
    },
    {
        title: 'Cybersecurity Bootcamp',
        description: 'Imersão total em segurança ofensiva e defensiva.',
        date: '2025-01-20',
        location: 'Porto, PT',
        image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80'
    }
];

const stmt = db.prepare('INSERT INTO events (title, description, date, location, image_url) VALUES (?, ?, ?, ?, ?)');

events.forEach(event => {
    stmt.run(event.title, event.description, event.date, event.location, event.image_url);
});

console.log('Database seeded!');
