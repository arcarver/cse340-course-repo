import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT title, description, location, project_date
      FROM public.project;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllProjects}  