const { permission_setName, permissionName, roles_Name } = require("./permission_constant");


exports.roles_Create = [
    {
        name: roles_Name.Admin,
        description: "Admin Realted All Permissions",
        company:"651ad43097b1786b654e9fa7",
        permissionSet_name: [permission_setName.Agency_provider,
            permission_setName.Company_provider,
            permission_setName.Punch_provider,
            permission_setName.Caregiver_provider,
            permission_setName.Permission_set_provider,
            permission_setName.Permissions_provider,
            permission_setName.Roles_provider,
            permission_setName.Facility_provider,]
    },

    {
        name: roles_Name.Company_manger,
        description: "Company Manger Realted All Permissions",
        company:"651ad43097b1786b654e9fa7",
        permissionSet_name: [
            permission_setName.Agency_provider,
            permission_setName.Company_provider,
            permission_setName.Punch_provider,
            permission_setName.Caregiver_provider,
            permission_setName.Facility_provider,
            ]
    },
    {
        name: roles_Name.Normal,
        description: "Admin Realted All Permissions",
        company:"651ad43097b1786b654e9fa7",
        permissionSet_name: [
            permission_setName.Company_provider,
            permission_setName.Punch_Readable_provider,
            permission_setName.Caregiver_provider,
            ]
    },
]