import bcrypt from 'bcrypt';
import { createUser } from '../models/users';

const showUserRegistrationForm = (req, res) => { 
    res.render('register', { title: 'Register' });
};

const processUserRegistrationForm = async () => { 
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
        res.redirct('/register');
    }
};

export { showUserRegistrationForm, processUserRegistrationForm };