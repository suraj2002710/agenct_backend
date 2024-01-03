/**
 * @swagger

* /api/user/signup:
  *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     description: Creates a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The user's first name.
 *               last_name:
 *                 type: string
 *                 description: The user's last name.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *               phone:
 *                 type: string
 *                 description: The user's phone number.
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error


* /api/user/login:
  *   post:
 *     summary: user login by email and password
 *     tags:
 *       - Users
 *     description: user login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error


* /api/user/role-assign:
 *   post:
 *     summary: assign role to user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *                 description: user id
 *               roleid:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of role ids
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error


* /api/user/facility-assign:
 *   post:
 *     summary: assign Facility to user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *                 description: user id
 *               facility:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of role ids
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
  



 * /api/user/get-single-user:
 *   get:
 *     summary: Get single user
 *     description: Get single user by userToken
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

 



* /api/agency/create:
  *   post:
 *     summary: Agency Create
 *     description: Agency Create
 *     tags:
 *       - Agency
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 description: The Agency's email address.
 *               Id:
 *                 type: string
 *                 description: Agency ID .
 *               name:
 *                 type: string
 *                 description: The Agency's name.
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


 * /api/agency/single-fetch/{id}:
 *   get:
 *     summary: Get a Agency
 *     description: get agency by agency Id
 *     tags:
 *       - Agency
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/agency/fetch-all:
 *   get:
 *     summary: Get all agency
 *     description: get all agency.
 *     tags:
 *       - Agency
  *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/agency/delete/{id}:
 *   delete:
 *     summary: Agency delete by AgencyId
 *     description: Delete agency by agency Id.
 *     tags:
 *       - Agency
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/agency/update:
 *   put:
 *     summary: Agency data Update
 *     description: Agency data Update
 *     tags:
 *       - Agency
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The unique ID of the agency (optional, will be generated if not provided).
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 description: The Agency's email address.
 *               name:
 *                 type: string
 *                 description: The Agency's name.
  *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error


 * /api/punch/fetch-all:
  *   get:
 *     summary: Get all punchs
 *     description: Get All punchs.
 *     tags:
 *       - Caregivers
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: position
 *         description: employee postion
 *         required: false  # Set to true if it's a required parameter
 *       - in: query
 *         name: agency
 *         description: agency
 *         required: false  # Set to true if it's a required parameter
 *       - in: query
 *         name: startdate
 *         description: startdate
 *         required: false  # Set to true if it's a required parameter
 *       - in: query
 *         name: enddate
 *         description: enddate
 *         required: false  # Set to true if it's a required parameter
 *         schema:
 *           type: string  # Define the data type of the parameter (e.g., string, number, boolean, etc.)
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/caregiver/punch:
 *   post:
 *     summary: Create a new Punch.
 *     tags:
 *       - Caregivers
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Caregiver data to be created. (eg.12-34456-2-In-202309270857am)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               punch:
 *                 type: string
 *               facility_id:
 *                 type: string
 *               scanResult:
 *                 type: string
 *               locationId:
 *                 type: string
 *               kioskId:
 *                 type: string
 *               timestamp:
 *                 type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/caregiver/fetch-all:
 *   get:
 *     summary: Get all Caregivers
 *     description: Get All Caregivers.
 *     tags:
 *       - Caregivers
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: position
 *         description: employee postion
 *         required: false  # Set to true if it's a required parameter
 *       - in: query
 *         name: agency
 *         description: agency
 *         required: false  # Set to true if it's a required parameter
 *       - in: query
 *         name: startdate
 *         description: startdate
 *         required: false  # Set to true if it's a required parameter
 *       - in: query
 *         name: enddate
 *         description: enddate
 *         required: false  # Set to true if it's a required parameter
 *         schema:
 *           type: string  # Define the data type of the parameter (e.g., string, number, boolean, etc.)
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/caregiver/delete/{id}:
 *   delete:
 *     summary: Delete caregiver
 *     description: delete caregiver by caregiverId
 *     tags:
 *       - Caregivers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

 * /api/caregiver/single-fetch/{id}:
 *   get:
 *     summary: Get single caregiver
 *     description: get caregiver by caregiverId
 *     tags:
 *       - Caregivers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
*       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/permission/permission-set-create:
 *   post:
 *     summary: Create a new permissionSet.
 *     tags:
 *       - PermissionSet
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the resource.
 *               company:
 *                 type: string
 *                 description: The company associated with the resource.
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of permissions for the resource.
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/permission/permission-set-fetch-all:
 *   get:
 *     summary: Get all permissionsSets
 *     description: Get All permissionsSets.
 *     tags:
 *       - PermissionSet
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/permission/permission-set-delete/{id}:
 *   delete:
 *     summary: delete permissionSet
 *     description: delete permissionSet by permissionSetId
 *     tags:
 *       - PermissionSet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

 * /api/permission/permission-set-single-fetch/{id}:
 *   get:
 *     summary: Get single permissionSet
 *     description: Get single permissionSet by permissionSetId
 *     tags:
 *       - PermissionSet
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/permission/permission-create:
 *   post:
 *     summary: Create a new permissionSet.
 *     tags:
 *       - Permission
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
*               route:
 *                 type: string
 *                 description: The name of the resource.
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/permission/permission-fetch-all:
 *   get:
 *     summary: Get all permissions
 *     description: Get All permissions.
 *     tags:
 *       - Permission
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/permission/permission-delete/{id}:
 *   delete:
 *     summary: Permission delete
 *     description: permission delete by permissionId
 *     tags:
 *       - Permission
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/permission/permission-create-all/{pass}:
  *   get:
 *     summary: Create all Permissions
 *     description: create all permissions
 *     tags:
 *       - Permission
 *     parameters:
 *       - in: path
 *         name: pass
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/permission/permissionsets-create-all/{pass}:
  *   get:
 *     summary: Create all permissionSets
 *     description: Create all permissionSets.
 *     tags:
 *       - PermissionSet
 *     parameters:
 *       - in: path
 *         name: pass
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/permission/role-create-all/{pass}:
  *   get:
 *     summary: Create all Roles
 *     description: Create all roles
 *     tags:
 *       - Role
 *     parameters:
 *       - in: path
 *         name: pass
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

 * /api/permission/permission-single-fetch/{id}:
 *   get:
 *     summary: Get single permission
 *     description: get permission by permissionId
 *     tags:
 *       - Permission
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

 * /api/company/create:
 *   post:
 *     summary: Create a new Company.
 *     tags:
 *       - Company
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the resource (required).
 *               address:
 *                 type: string
 *                 description: The address of the resource.
 *               city:
 *                 type: string
 *                 description: The city of the resource.
 *               state:
 *                 type: string
 *                 description: The state of the resource.
 *               zip:
 *                 type: string
 *                 description: The ZIP code of the resource.
  *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/company/fetch-all:
 *   get:
 *     summary: Get all Company
 *     description: Get All Company.
 *     tags:
 *       - Company
   *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/company/delete/{id}:
 *   delete:
 *     summary: Company delete
 *     description: company delete by companyID
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

 * /api/company/single-fetch/{id}:
 *   get:
 *     summary: Get single Company
 *     description: get company by companyId
 *     tags:
 *       - Company
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/role/create:
 *   post:
 *     summary: Create a new Role.
 *     tags:
 *       - Role
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the resource.
 *               company:
 *                 type: string
 *                 description: The company associated with the resource.
 *               permissionSets:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of permissions for the resource.
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/role/fetch-all:
 *   get:
 *     summary: Get all roles
 *     description: Get All role.
 *     tags:
 *       - Role
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/role/delete/{id}:
 *   delete:
 *     summary: delete role
 *     description: delete role by roleId
 *     tags:
 *       - Role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

 * /api/role/single-fetch/{id}:
 *   get:
 *     summary: Get single role
 *     description: Get single role by roleId
 *     tags:
 *       - Role
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/facility/create:
 *   post:
 *     summary: Create a new Facility.
 *     tags:
 *       - Facility
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the facility.
 *               company:
 *                 type: string
 *                 description: The company associated with the facility.
 *               phone:
 *                 type: string
 *                 description: phone no.
 *               address:
 *                 type: string
 *                 description: The address of the company
 *               timezone:
 *                 type: string
 *                 description: The timezone of the company
 *               city:
 *                 type: string
 *                 description: The city of the company
 *               state:
 *                 type: string
 *                 description: The state of the company
 *               locationId:
 *                 type: string
 *                 description: The state of the company
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

* /api/facility/fetch-all:
 *   get:
 *     summary: Get all facility
 *     description: Get All facility.
 *     tags:
 *       - Facility
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/facility/delete/{id}:
 *   delete:
 *     summary: delete facility
 *     description: delete facility by facilityId
 *     tags:
 *       - Facility
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 
 

* /api/facility/fetch-by-company:
 *   post:
 *     summary: get facility by company
 *     description: get facility by companyId and company name
 *     tags:
 *       - Facility
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Company Name
 *               company_id:
 *                 type: string
 *                 description: Company Id
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 



 * /api/facility/single-fetch/{id}:
 *   get:
 *     summary: get single facility
 *     description: get single facility
 *     tags:
 *       - Facility
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user.
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 

 


   
* /api/patient/create:
 *   post:
 *     summary: Create a new Patient.
 *     tags:
 *       - Patient
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The first_name of the patient.
 *               last_name:
 *                 type: string
 *                 description: The last_name of the patient.
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error



* /api/patient/patient_contact/create:
 *   post:
 *     summary: Create a new Patient Contact.
 *     tags:
 *       - Patient Contact
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: first_name
 *               last_name:
 *                 type: string
 *                 description: last_name
 *               phone:
 *                 type: string
 *                 description: phone no.
 *               email:
 *                 type: string
 *                 description: email.
 *               patient_id:
 *                 type: string
 *                 description: patient_id.
 *               relationship:
 *                 type: string
 *                 description: relationship
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


* /api/message/create:
 *   post:
 *     summary: Create a new Messages.
 *     tags:
 *       - Messages
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Type:
 *                 type: string
 *                 description: The name of the facility.
 *               Method:
 *                 type: string
 *                 description: Method.
 *               Patient_contact:
 *                 type: string
 *                 description: Patient_contact
 *               messages:
 *                 type: string
 *                 description: messages
 *               chatType:
 *                 type: string
 *                 description: chatType
 *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error
 


 

* /api/message/fetch-messages-tiwlio:
 *   post:
 *     summary: Create a new Messages.
 *     tags:
 *       - Messages
 *     requestBody:
 *       description: JSON object containing resource information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 description: patient_id.
 *               message:
 *                 type: string
 *                 description: members
  *     responses:
 *       200:
 *         description: api response get successfully
 *       500:
 *         description: throw error



 */