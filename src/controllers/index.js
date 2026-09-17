// imports

// define functions 
const showHomePage = async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
};

// Exports 
export { showHomePage };