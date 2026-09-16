import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT organization.name, project.title, project.description, project.location, project.project_date
      FROM public.project
      INNER JOIN organization on project.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllProjects}  