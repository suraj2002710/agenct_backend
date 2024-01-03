# Agency Tracking

## Installation

Provide instructions on how to install and set up your Node.js project locally. Include any prerequisites and step-by-step instructions.

create .env for local setup and have the below content in the file (.env)
```
MONGODB_URL="mongodb+srv://steven:9G3IJIi6fc595bzX@striv.q7xohbb.mongodb.net/agency_tracking?retryWrites=true&w=majority"
# mongodb+srv://steven:9G3IJIi6fc595bzX@striv.q7xohbb.mongodb.net/?retryWrites=true&w=majority
PORT=4000
GOOGLE_CLIENT_ID="1023078286147-h8ornsjhchrjiag1t9p3bkfcdu79emu9.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"

# PORT=4000
# GOOGLE_CLIENT_ID="1023078286147-h8ornsjhchrjiag1t9p3bkfcdu79emu9.apps.googleusercontent.com"
# GOOGLE_CLIENT_SECRET="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"
FACEBOOK_APP_ID="1279221662796760"
FACEBOOK_APP_SECRET="6972f2d7c16abc1c9ca9fd8d600d172e"
JWT_SCRETE_KEY="agency_tracking_agency_trackingagency_tracking_agency_tracking"
FAILUREURL='http://localhost:3007/' 
SUCCESSURL='https://v4.mui.com/components/buttons/'
```

```shell

npm install
npm start
```

# TESTING:
### Data
#### User
    username : admin@test.com
    password: admin

#### Agencies
    * Shift MED;
        "Id": 1
        "name": Shift Med
        "contactEmail": user@shiftmed.com

    * Shift Key:
        "Id": 2
        "name": Shift Key
        "contactEmail": user@shiftkey.com
    
    * Nurse Dash:
        "Id": 12
        "name": Nurse Dash
        "contactEmail": user@nursedash.com

## Table of Contents

- [User Model](#user-model)
- [Company Model](#company-model)
- [Facility Model](#facility-model)
- [Agency Model](#agency-model)
- [Caregiver Model](#caregiver-model)
- [Permission Model](#permission-model)
- [Permission Set Model](#permission-set-model)   
- [Role Model](#role-model)
- [Punch Model](#punch-model)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## User Model

- **Password (Hashed):** Securely store user passwords.
- **First Name:** User's first name.
- **Last Name:** User's last name.
- **Phone Number:** User's contact phone number.
- **Email:** User's email address.
- **Company (FK to company):** Relationship to the Company model.
- **All Facility Access (Boolean):** Access to all facilities.
- **Facilities (specific facilities):** Specific facilities they can access.
- **Permissions Assigned (Boolean):** Whether they have permissions assigned.
- **Roles:** User roles.
- **Additional Permissions:** Additional permissions.
- **Revoked Permissions:** Permissions that have been revoked.

## Company Model

- **Name:** Company name.
- **Address (Not Required):** Company address.
- **City (Not Required):** City where the company is located.
- **State (Not Required):** State where the company is located.
- **Zip (Not Required):** Zip code of the company's location.

## Facility Model

- **Company (Foreign Key/Relation):** Relationship to the Company model.
- **Name:** Facility name.
- **Timezone (Dropdown):** Facility timezone.
- **Phone (Not Required):** Facility contact phone number.
- **Address (Not Required):** Facility address.
- **City (Not Required):** City where the facility is located.
- **State (Not Required):** State where the facility is located.
- **Zip (Not Required):** Zip code of the facility's location.

## Agency Model

- **String ID:** Custom ID for the agency.
- **Name:** Agency name.
- **Contact Email:** Contact email for the agency.

## Caregiver Model

- **Agency (Foreign Key):** Relationship to the Agency model.
- **Agency Employee Id:** ID from the QR code.
- **First Name (Not Required):** Caregiver's first name.
- **Last Name (Not Required):** Caregiver's last name.

## Permission Model

- **Name:** Permission name.

## Permission Set Model

- **Name:** Permission set name.
- **Company (FK to company):** Relationship to the Company model.
- **Permissions:** Permissions assigned to the set.

## Role Model

- **Name:** Role name (e.g., "scheduler", "payroll processor").
- **Company (FK to company):** Relationship to the Company model.
- **Permission Sets:** Permission sets assigned to the role.

## Punch Model

- **Caregiver (FK to Caregiver):** Relationship to the Caregiver model.
- **Agency (FK to Agency):** Relationship to the Agency model.
- **Position:** Text describing the position.
- **Type:** Type of punch (e.g., "In" or "Out").
- **UTC Time (Datetime):** Timestamp of the punch in UTC.
