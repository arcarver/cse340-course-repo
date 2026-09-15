
-- create the inital table
CREATE TABLE organization (
    organization_id serial,
    name varchar(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

-- adding data
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),

('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),

('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- create a table describing the service opportunites available
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);


-- ai generated projects 
-- Projects for BrightFuture Builders (Org ID: 1)
INSERT INTO project (organization_id, title, description, location, project_date) VALUES
(1, 'Community Center Solar Installation', 'Help install modern solar panels on the roof of the community center to reduce energy costs and promote sustainable energy usage.', '456 Energy Way, Eco District', '2027-04-10'),
(1, 'Rainwater Harvesting System Build', 'Construct a sustainable rainwater collection and filtration system to support the local neighborhood garden.', 'Hope Community Garden, East Side', '2027-05-15'),
(1, 'Affordable Housing Insulation Upgrade', 'Volunteer to fit eco-friendly insulation in local homes, reducing thermal loss and cutting heating bills for low-income residents.', '789 Renewal Way, North Ward', '2027-06-22'),
(1, 'Public Park Recycled-Timber Gazebo', 'Assist our carpentry teams in assembling a community gathering space constructed completely from recycled local timber.', 'Riverview Park Civic Grounds', '2027-08-05'),
(1, 'Green Roof Installation Workshop', 'Learn and work alongside pros to build a structural green roof layout covered in local flora to mitigate city heat island effects.', 'Central Library Rooftop, Downtown', '2027-09-12');

-- Projects for GreenHarvest Growers (Org ID: 2)
INSERT INTO project (organization_id, title, description, location, project_date) VALUES
(2, 'Spring Soil Prep & Composting', 'Prepare the urban agricultural plots for the spring growing cycle by turning soil and layering nutrient-rich organic compost.', '101 Organic Acres, Urban Farm Plot', '2027-04-18'),
(2, 'Hydroponic System Set-Up', 'Assemble and plumb localized indoor vertical farming hydroponics kits to provide year-round greens to local food deserts.', 'Community Greenhouse, Ward 4', '2027-05-20'),
(2, 'Neighborhood Pollinator Row Planting', 'Help seed and plant wildflower boundary lines to attract native bees and improve local ecosystem health and crop yields.', '12 Spring Court Way, South Side', '2027-07-11'),
(2, 'Youth Food Sustainability Workshop', 'Lead hands-on educational farming workshops for neighborhood children, detailing seed growth cycles and nutrition.', 'Liberty Neighborhood Center', '2027-08-22'),
(2, 'Autumn Harvest and Packaging', 'Pick, sort, wash, and package seasonal fresh vegetables for immediate distribution to local food pantries.', 'Main Hub Distribution Warehouse', '2027-10-03');

-- Projects for UnityServe Volunteers (Org ID: 3)
INSERT INTO project (organization_id, title, description, location, project_date) VALUES
(3, 'Mobile Food Pantry Packing', 'Sort non-perishables and load regional delivery trucks heading out to distribute balanced food packages to rural neighborhoods.', 'Central Distribution Depot, Bay B', '2027-04-25'),
(3, 'Homeless Shelter Refurbishing', 'Clean, paint, and organize the residential quarters of our local shelter partner ahead of their seasonal intake cycle.', '555 Shelter Care Lane, Midtown', '2027-06-05'),
(3, 'Youth Mentorship Kickoff Gala', 'Help set up physical event spaces, coordinate registrations, and support logistics for the annual mentor matching launch.', 'Pioneer Civic Hall, Grand Ballroom', '2027-07-18'),
(3, 'Senior Citizen Center Supply Drive', 'Collect, bundle, and personally deliver lifestyle kits, reading materials, and medical supplies to resident elders.', 'Oak Ridge Retirement Village', '2027-09-04'),
(3, 'Winter Clothing Sort & Pack', 'Process winter coat and boot donations to ensure clean, correctly-sized outerwear is ready for the upcoming cold weather.', 'Unity Outreach Annex, Suite 200', '2027-11-14');
