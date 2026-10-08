// import 
import { getAllCategories, updateCategoryAssignments } from "../models/categories.js";
import { getCategoryByID } from "../models/categories.js";

import { getAllProjectsForCategory } from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";
import { getAllCategoriesForProject } from "../models/categories.js";
import { body, validationResult } from "express-validator";
import { createCategory, updateCategory, getCategoryDetails } from "../models/categories.js"; 

//  validation
const categoryValidation = [
  body('category_name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Category name must be between 3 and 100 characters')
]

// define 
const showCategoriesPage = async (req, res) => {
  const category = await getAllCategories();
  // console.log(category);

    const title = 'Service Project Categories';
    res.render('categories', { title, category });
}

const showCategoryDetailsPage = async (req, res) => {
  const { category_id } = req.params;
  
  // new code to fix new empty categories
  const categoryInfo = await getCategoryDetails(category_id);
  const categoryName = categoryInfo ? categoryInfo.category_name : "Category";

  const projectList = await getAllProjectsForCategory(category_id);
    // const categoryName = projectList.length > 0 ? projectList[0].category_name : "Category";
console.log('--> categoryInfo object content is:', categoryInfo)
    console.log("Category is:", projectList);
    res.render('category.ejs', {projects: projectList, category_name: categoryName, title: 'Category Details', category_id: category_id });
    
}

const showAssignCategoriesForm = async (req, res) => {
  const project_id = req.params.project_id;
  
  // const projectDetails = await getProjectDetails(project_id);
  const dbRows = await getProjectDetails(project_id);
  const categories = await getAllCategories();
  const assignedCategories = await getAllCategoriesForProject(project_id);
  // try this
  const projectDetails = dbRows[0];
   
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
  return res.redirect(`/project/${project_id}`);
  // return res.redirect('/project/' + req.params.project_id);
  // might need a return.
}

const showNewCategoryForm = async (req, res) => {
  const title = 'Add New Category';
  res.render('new-category', { title });
}

const processNewCategoryForm = async (req, res) => {
  //check validation errors
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash('error', error.msg);
      console.log("Location2");
    });

    return res.redirect('/new-category');
  }
  const { category_name } = req.body;
  const categoryId = await createCategory(category_name);
  req.flash('success', 'Category added successfully!');
  res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.category_id;
  const categoryDetails = await getCategoryDetails(categoryId);
  console.log(categoryDetails);

  const title = 'Category: Edit Page';
  res.render('edit-category', { title, category: categoryDetails });
}

const processEditCategoryForm = async (req, res) => {
  const categoryDetails = req.params.category_id;
  //Validation
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash('error', error.msg);
      console.log("Location 4");
    });
    return res.redirect('/edit-category/' + req.params.category_id);
  }
  const { category_name } = req.body;
  await updateCategory(categoryDetails, category_name);

  req.flash('success', 'Category was updated successfully');
  res.redirect(`/category/${categoryDetails}`);
}
// export 
export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  categoryValidation,
  showEditCategoryForm,
  processEditCategoryForm
}
