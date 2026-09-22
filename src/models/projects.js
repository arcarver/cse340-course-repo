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


const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId };
  
// I will get back to this later 
// const getUpcomingProjects = async () => {
//   const number_of_projects = 5;
//   const query = ` SELECT organization.name, organization.organization_id, project.title, project.description, project.location, project.project_date
//       FROM public.project
//       INNER JOIN organization on project.organization_id = organization.organization_id
//       LIMIT  number_of_projects;
//     `;
  
// }