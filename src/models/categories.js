import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, project_id 
      FROM public.category_project;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllCategories}  