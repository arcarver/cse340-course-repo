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


const getUpcomingProjects = async (number_of_projects) => {
  // const number_of_projects = 5;
  const query = ` SELECT 
  organization.name, 
  organization.organization_id,
  project.title,
  project.description,
  project.location,
  project.project_date
      FROM public.project
      INNER JOIN organization on project.organization_id = organization.organization_id
      WHERE date >= date.time.now
      
      ORDER BY date ASC
      LIMIT  number_of_projects = $5;
    `;
  
  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);
  return result.rows;
}

const getProjectDetails = async (project_id) => {
  const query = `
  SELECT
    p.project_id,
    p.title,
    p.description,
    p.project_date AS date,
    p.location,
    o.organization_id,
    o.organization_name
    FROM project p
    INNER JOIN organization o on project.organization_id = organization.organization_id
    WHERE service_project_id = project_id
  
    `;
  const queryParams = [project_id];
  const details = await db.query(query, queryParams);

  return details.rows;
  
}
// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };
  