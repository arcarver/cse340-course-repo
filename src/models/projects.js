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


const getProjectsByOrganizationId = async (organization_id) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date 
        FROM project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organization_id];
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
  project.project_id,
  project.project_date AS date
      FROM public.project
      INNER JOIN organization on project.organization_id = organization.organization_id
      WHERE project.project_date >= current_date
      
      ORDER BY date ASC
      LIMIT $1;
    `;
  
  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);
  return result.rows;
}

const getProjectDetails = async (project_id) => {
  const query = `
  SELECT
    project.project_id AS service_project_id,
    project.title,
    project.description,
    project.project_date AS date,
    project.location,
    project.organization_id,
    organization.name AS organization_name
    FROM project
    INNER JOIN organization on project.organization_id = organization.organization_id
    WHERE project.project_id = $1
  
    `;
  const queryParams = [project_id];
  const details = await db.query(query, queryParams);

  return details.rows;
}

  const createProject = async (title, description, location, date, organization_id) => {
    
    const query = `
    INSERT INTO project (title, description, location, date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
    `;
    const queryParams = [title, description, location, date, organization_id];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
      throw new Error("Failed to create project");
      
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
      console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}



// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, createProject };
  