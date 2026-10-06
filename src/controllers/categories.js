// import 
import { getAllCategories, updateCategoryAssignments } from "../models/categories.js";
import { getCategoryByID } from "../models/categories.js";

import { getAllProjectsForCategory } from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";
import { getAllCategoriesForProject } from "../models/categories.js";

// define 
const showCategoriesPage = async (req, res) => {
  const category = await getAllCategories();
  // console.log(category);

    const title = 'Service Project Categories';
    res.render('categories', { title, category });
};

const showCategoryDetailsPage = async (req, res) => {
    const { category_id } = req.params;
    const projectList = await getAllProjectsForCategory(category_id);
    const categoryName = projectList.length > 0 ? projectList[0].category_name : "Category";

    console.log("Category is:", projectList);
    res.render('category.ejs', {projects: projectList, category_name: categoryName, title: 'Category Details' });
    
}

const showAssignCategoriesForm = async (req, res) => {
  const project_id = req.params.project_id;
  
  const projectDetails = await getProjectDetails(project_id);
  const categories = await getAllCategories();
  const assignedCategories = await getAllCategoriesForProject(project_id);

  const title = "Assign Categories to Project";

  res.render('assign-categories', { title, project_id, projectDetails, categories, assignedCategories });

};


const processAssignCategoriesForm = async (req, res) => {
  const project_id = req.params.project_id;
  const selectedCategoryIds = req.body.categoryIds || [];

  // make sure selectedCategoryIds is an array
  const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
  await updateCategoryAssignments(project_id, categoryIdsArray);
  req.flash('success', 'categories updated successfully.');
  res.redirect(`/project/${project_id}`);
};

// export 
export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };
