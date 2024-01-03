const Permission = require("./model/permission_model")
const { permissionName } = require('./permission_constant')
exports.permission_Create = [
    {
        name: permissionName.create_agency,
        description: "agency create",
        route: "/api/agency/create"
    },
    {
        name: permissionName.single_fetch_agency,
        description: "fetch singel agency",
        route: "/api/agency/single-fetch/{m}"
    }, {
        name: permissionName.fetch_all_agency,
        description: "fetch all agency",
        route: "/api/agency/fetch-all"
    }, {
        name: permissionName.delete_agency,
        description: "delete agency",
        route: "/api/agency/delete/{m}"
    }, {
        name: permissionName.update_agency,
        description: "update agency",
        route: "/api/agency/update"
    }, {
        name: permissionName.create_company,
        description: "create company",
        route: "/api/company/create"
    },
    {
        name: permissionName.single_fetch_company,
        description: "fetch singel company",
        route: "/api/company/single-fetch/{m}"
    }, {
        name: permissionName.fetch_all_company,
        description: "fetch all company",
        route: "/api/company/fetch-all"
    }, {
        name: permissionName.delete_company,
        description: "delete company",
        route: "/api/company/delete/{m}"
    }, {
        name: permissionName.update_company,
        description: "update company",
        route: "/api/company/update"
    }
    , {
        name: permissionName.create_punch_caregiver,
        description: "create punch and caregiver",
        route: "/api/caregiver/punch"
    },
    {
        name: permissionName.single_fetch_caregiver,
        description: "fetch singel caregiver",
        route: "/api/caregiver/single-fetch/{m}"
    }, {
        name: permissionName.fetch_all_caregiver,
        description: "fetch all caregiver",
        route: "/api/caregiver/fetch-all"
    }, {
        name: permissionName.delete_caregiver,
        description: "delete caregiver",
        route: "/api/caregiver/delete/{m}"
    }, {
        name: permissionName.update_caregiver,
        description: "update caregiver",
        route: "/api/caregiver/update"
    }
    , {
        name: permissionName.create_permission_set,
        description: "create permissionSet",
        route: "/api/permission/permission-set-create"
    },
    {
        name: permissionName.single_fetch_permission_set,
        description: "fetch singel permissionSet",
        route: "/api/permission/permission-set-single-fetch/{m}"
    }, {
        name: permissionName.fetch_all_permission_set,
        description: "fetch all permissionSet",
        route: "/api/permission/permission-set-fetch-all"
    }, {
        name: permissionName.delete_permission_set,
        description: "delete permissionSet",
        route: "/api/permission/permission-set-delete/{m}"
    }, {
        name: permissionName.update_permission_set,
        description: "update permissionSet",
        route: "/api/permission/permission-set-update"
    }

    , {
        name: permissionName.create_permission,
        description: "create permission",
        route: "/api/permission/permission-create"
    },
    {
        name: permissionName.single_fetch_permission,
        description: "fetch singel permission",
        route: "/api/permission/permission-single-fetch/{m}"
    }, {
        name: permissionName.fetch_all_permission,
        description: "fetch all permission",
        route: "/api/permission/permission-fetch-all"
    }, {
        name: permissionName.delete_permission,
        description: "delete permission",
        route: "/api/permission/permission-delete/{m}"
    }, {
        name: permissionName.update_permission,
        description: "update permission",
        route: "/api/permission/permission-update"
    }
    , {
        name: permissionName.create_role,
        description: "create role",
        route: "/api/role/create"
    },
    {
        name: permissionName.single_fetch_role,
        description: "fetch singel role",
        route: "/api/role/single-fetch/{m}"
    }, {
        name: permissionName.fetch_all_role,
        description: "fetch all role",
        route: "/api/role/fetch-all"
    }, {
        name: permissionName.delete_role,
        description: "delete role",
        route: "/api/role/delete/{m}"
    }, {
        name: permissionName.update_role,
        description: "update role",
        route: "/api/role/update"
    }

    , {
        name: permissionName.create_facility,
        description: "create facility",
        route: "/api/facility/create"
    },
    {
        name: permissionName.single_fetch_facility,
        description: "fetch singel facility",
        route: "/api/facility/single-fetch/{m}"
    }, {
        name: permissionName.fetch_all_facility,
        description: "fetch all facility",
        route: "/api/facility/fetch-all"
    }, {
        name: permissionName.delete_facility,
        description: "delete facility",
        route: "/api/facility/delete/{m}"
    },
    {
        name: permissionName.fetch_facility_by_company,
        description: "fetch facility by company",
        route: "/fetch_facilityby_compay/:{m}"
    },
    {
        name: permissionName.update_facility,
        description: "update facility",
        route: "/api/facility/update"
    },

    {
        name: permissionName.fetch_all_punch,
        description: "fetch all punch",
        route: "/api/punch/fetch-all"
    },
    {
        name: permissionName.single_fetch_punch,
        description: "fetch single punch",
        route: "/single-fetch/{m}"
    },
    {
        name: permissionName.delete_punch,
        description: "delete punch",
        route: "/api/punch/delete/{m}"
    }, {
        name: permissionName.update_punch,
        description: "update punch",
        route: "/api/punch/update"
    },

]



