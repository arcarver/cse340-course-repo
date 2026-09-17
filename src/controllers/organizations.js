app.get('/organizations', async (req, res) => {
    const organization = await getAllOrganizations();
    // console.log(organization);
      
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organization });
});