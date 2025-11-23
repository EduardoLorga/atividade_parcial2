require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/utilizadores', authRoutes); // /utilizadores/registo, /utilizadores/login
app.use('/eventos', eventRoutes);     // /eventos, /eventos/:id/inscrever
app.use('/', userRoutes);             // /utilizador/inscricoes, /inscricoes/:id (Note: user routes are mixed in path structure, adjusting to match requirements)

// Adjusting user routes mounting to match requirements exactly:
// POST /utilizadores/registo -> authRoutes
// POST /utilizadores/login -> authRoutes
// GET /utilizador/inscricoes -> userRoutes (mounted at /utilizador for this one?)
// DELETE /inscricoes/:id -> userRoutes (mounted at / for this one?)

// Let's refine mounting:
// authRoutes handles /utilizadores/registo and /utilizadores/login. So mount at /utilizadores.
// eventRoutes handles /eventos... So mount at /eventos.
// userRoutes handles /utilizador/inscricoes and /inscricoes/:id.
// This is a bit split. I'll mount userRoutes at / to handle both paths defined in the router.

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
