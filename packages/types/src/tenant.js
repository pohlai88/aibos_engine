"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantType = exports.TenantStatus = void 0;
var TenantStatus;
(function (TenantStatus) {
    TenantStatus["ACTIVE"] = "active";
    TenantStatus["SUSPENDED"] = "suspended";
    TenantStatus["CANCELLED"] = "cancelled";
    TenantStatus["PENDING"] = "pending";
    TenantStatus["TRIAL"] = "trial";
})(TenantStatus || (exports.TenantStatus = TenantStatus = {}));
var TenantType;
(function (TenantType) {
    TenantType["INDIVIDUAL"] = "individual";
    TenantType["BUSINESS"] = "business";
    TenantType["ENTERPRISE"] = "enterprise";
    TenantType["PARTNER"] = "partner";
})(TenantType || (exports.TenantType = TenantType = {}));
