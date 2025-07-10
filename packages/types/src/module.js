"use strict";
/**
 * Module System Types
 * Defines the interfaces for plug-and-play modules in AIBOS Engine
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleCategory = exports.ModuleBase = void 0;
class ModuleBase {
}
exports.ModuleBase = ModuleBase;
var ModuleCategory;
(function (ModuleCategory) {
    ModuleCategory["CRM"] = "crm";
    ModuleCategory["ERP"] = "erp";
    ModuleCategory["HR"] = "hr";
    ModuleCategory["FINANCE"] = "finance";
    ModuleCategory["MARKETING"] = "marketing";
    ModuleCategory["SALES"] = "sales";
    ModuleCategory["PROJECT_MANAGEMENT"] = "project-management";
    ModuleCategory["COMMUNICATION"] = "communication";
    ModuleCategory["ANALYTICS"] = "analytics";
    ModuleCategory["INTEGRATION"] = "integration";
    ModuleCategory["SECURITY"] = "security";
    ModuleCategory["UTILITY"] = "utility";
    ModuleCategory["CUSTOM"] = "custom";
})(ModuleCategory || (exports.ModuleCategory = ModuleCategory = {}));
