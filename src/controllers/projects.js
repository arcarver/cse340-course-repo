app.get('/projects', async (req, res) => {
  const project = await getAllProjects();
  // console.log(project);
  
  const title = 'Service Projects';
    res.render('projects', { title, project });
});
