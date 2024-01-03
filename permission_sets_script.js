const { permission_setName, permissionName } = require("./permission_constant");


exports.permissionSet_Create = [
    {
        name: permission_setName.Agency_provider,
        description: "Agency Realted Access Permissions",
        company:"651ad43097b1786b654e9fa7",
        permission_name: [permissionName.create_agency, permissionName.single_fetch_agency, permissionName.fetch_all_agency, permissionName.delete_agency, permissionName.update_agency]
    },
    {
        name: permission_setName.Company_provider,
        description: "Company Realted Access Permissions",
        company:"651ad43097b1786b654e9fa7",
        permission_name: [permissionName.create_company, permissionName.single_fetch_company, permissionName.fetch_all_company, permissionName.delete_company, permissionName.update_company,]
    },
    {
        name: permission_setName.Punch_provider,
        description: "Punch Realted Access Permissions",
        company:"651ad43097b1786b654e9fa7",
        permission_name: [permissionName.create_puch_caregiver, permissionName.fetch_all_punch, permissionName.delete_punch, permissionName.update_punch]
    },
    {
        name: permission_setName.Punch_Readable_provider,
        description: "Punch Readable Realted Access Permissions",
        company:"651ad43097b1786b654e9fa7",
        permission_name: [permissionName.fetch_all_punch,permissionName.single_fetch_punch]
    },
    {
        name: permission_setName.Caregiver_provider,
        description: "Caregiver Realted Access Permissions",
        company:"651ad43097b1786b654e9fa7",
        permission_name: [permissionName.single_fetch_caregiver, permissionName.fetch_all_caregiver,
        permissionName.delete_caregiver, permissionName.update_caregiver]
    },
    {
        name: permission_setName.Permission_set_provider,
        description: "PermissionSet Realted Access Permissions",
        company:"651ad43097b1786b654e9fa7",
        permission_name: [permissionName.create_permission_set,
        permissionName.single_fetch_permission_set,
        permissionName.fetch_all_permission_set,
        permissionName.delete_permission_set, permissionName.update_permission_set]
    }
    ,
    {
        name: permission_setName.Permissions_provider,
        description: "Permissions Realted Access Permissions",
        company:"651ad43097b1786b654e9fa7",
        permission_name: [permissionName.create_permission,
            permissionName.single_fetch_permission,
            permissionName.fetch_all_permission,
            permissionName.delete_permission,
            permissionName.update_permission,]
    },
    {
        name: permission_setName.Roles_provider,
        description: "Roles Realted Access Permissions",
        company:"651ad43097b1786b654e9fa7",
        permission_name: [permissionName.create_role,
            permissionName.single_fetch_role,
            permissionName.fetch_all_role,
            permissionName.delete_role,
            permissionName.update_role]
    },
    {
        name: permission_setName.Facility_provider,
        description: "Facility Realted Access Permissions",
        company:"651ad43097b1786b654e9fa7",
        permission_name: [permissionName.create_facility,
            permissionName.single_fetch_facility,
            permissionName.fetch_all_facility,
            permissionName.delete_facility,
            permissionName.update_facility,
            permissionName.fetch_facility_by_company,
        ]
    }
]



