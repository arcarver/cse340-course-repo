import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_name,
        category_id 
      FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryByID = async (category_id) => {
  const query = `
  SELECT
  category_id,
  category_name
  FROM category
  WHERE category_id = $1`;

  const queryParams = [category_id];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getAllCategoriesForProject = async (project_id) => {
  const query = `
  SELECT
  cp.category_id,
  c.category_name,
  cp.project_id,
  p.title
  FROM public.category_project AS cp
  INNER JOIN category AS c on cp.category_id = c.category_id
  INNER JOIN project AS p on cp.project_id = p.project_id
  WHERE cp.project_id = $1`;
  const queryParams = [project_id];
  const result = await db.query(query, queryParams);
  return result.rows;
}

const getAllProjectsForCategory = async (category_id) => {
  const query = `SELECT
  cp.category_id,
  c.category_name,
  cp.project_id,
  p.title
  FROM public.category_project AS cp
  INNER JOIN category AS c on cp.category_id = c.category_id
  INNER JOIN project AS p on cp.project_id = p.project_id
  WHERE cp.category_id = $1`;
  const queryParams = [category_id];
  const result = await db.query(query, queryParams);
  return result.rows;
}
  
const assignCategoryToProject = async (category_id, project_id) => {
  const query = `
  INSERT INTO category_project (category_id, project_id)
  VALUES ($1, $2);
  `;
  await db.query(query, [category_id, project_id]);
}
  
const updateCategoryAssignments = async (project_id, category_id) => {
  // first remove assignments 
  const deleteQuery = `
  DELETE FROM category_project
  WHERE project_id = $1;
  `;
  await db.query(deleteQuery, [project_id]);

  //add new categories
  for (const category_id of category_ids) {
    await assignCategoryToProject(category_id, project_id);
  }
  
}

export {getAllCategories, getCategoryByID, getAllCategoriesForProject, getAllProjectsForCategory, updateCategoryAssignments}  