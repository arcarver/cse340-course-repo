import bcrypt from 'bcrypt';
import { createUser } from '../models/users.js';
import { authenticateUser } from '../models/users.js';
import { showHomePage } from './index.js';

const showUserRegistrationForm = (req, res) => { 
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async (req, res) => { 
    const { name, email, password } = req.body;

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // create user
        const userId = await createUser(name, email, passwordHash);

        // redirect to home
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/');
    } catch (error) {
        console.error('Error regoistering user:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
};

const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        if (user) {
            // store user info in session
            req.session.user = user;
            req.flash('success', 'Login was succesful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }
            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during login:', error);
        req.flash('error', 'An error occured during login. Please try to log in again');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'You are sucessfully logged out!');
    res.redirect('/login');
};

const requireLogin = async (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/login');
    }
    next();
};
   
const showDashboard = (req, res) => {
    const user = req.session.user;
    res.render('dashboard', {
        title: 'Dashboard',
        name: user.name,
        email: user.email
    });
};
export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard };