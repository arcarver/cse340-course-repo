import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT organization.name, organization.organization_id, project.title, project.description, project.location, project.project_date
      FROM public.project
      INNER JOIN organization on project.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}



export { getAllProjects }  

// I will get back to this later 
// const getUpcomingProjects = async () => {
//   const number_of_projects = 5;
//   const query = ` SELECT organization.name, organization.organization_id, project.title, project.description, project.location, project.project_date
//       FROM public.project
//       INNER JOIN organization on project.organization_id = organization.organization_id
//       LIMIT  number_of_projects;
//     `;
  
// }