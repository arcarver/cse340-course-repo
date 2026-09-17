// import 
import { getAllProjects } from "../models/projects";

// define 
const showProjectsPage = async (req, res) => {
  const project = await getAllProjects();
  // console.log(project);
  
  const title = 'Service Projects';
    res.render('projects', { title, project });
};

// export 
export { showProjectsPage };
