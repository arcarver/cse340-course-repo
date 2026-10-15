import db from './db.js';


const addVolunteer = async (user_id, project_id, title) => {
    const query = `
    INSERT INTO volunteers (user_id, project_id)
    VALUES ($1, $2)
    RETURNING user_id, project_id
    `;
    const result = await db.query(query, [user_id, project_id]);
    if (result.rows.length === 0) {
        throw new Error('Failed to volunteer');
    }
    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('You volunteered for', title);
    }
    return result.rows[0];
};

const removeVolunteer = async (user_id, project_id, title) => {
    const query = `
    DELETE FROM volunteers
    WHERE user_id = $1 AND project_id = $2
    RETURNING user_id, project_id
    `;
    const result = await db.query(query, [user_id, project_id]);
    if (result.rows.length === 0) {
        
        return null;
    }
   
    return result.rows[0]
}

const getAllProjects = async (user_id) => {
    const query = `
    SELECT p.title, p.project_id
    FROM volunteers v
    INNER JOIN project p ON p.project_id = v.project_id
    WHERE v.user_id = $1
    `;
    const data = await db.query(query, [user_id])
    return data.rows
};

const isVolunteer = async (user_id, project_id) => {
    const query = `
    SELECT 1 FROM volunteers
    WHERE user_id = $1 AND project_id = $2
    `;
    const result = await db.query(query, [user_id, project_id]);
    return result.rows.length > 0;
};


    export { addVolunteer, removeVolunteer, getAllProjects, isVolunteer }