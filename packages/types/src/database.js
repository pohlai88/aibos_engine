"use strict";
/**
 * Database System Types
 * Defines the interfaces for database management and data governance in AIBOS Engine
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupStatus = exports.MigrationStatus = void 0;
var MigrationStatus;
(function (MigrationStatus) {
    MigrationStatus["PENDING"] = "pending";
    MigrationStatus["APPLIED"] = "applied";
    MigrationStatus["FAILED"] = "failed";
    MigrationStatus["ROLLED_BACK"] = "rolled_back";
})(MigrationStatus || (exports.MigrationStatus = MigrationStatus = {}));
var BackupStatus;
(function (BackupStatus) {
    BackupStatus["PENDING"] = "pending";
    BackupStatus["IN_PROGRESS"] = "in_progress";
    BackupStatus["COMPLETED"] = "completed";
    BackupStatus["FAILED"] = "failed";
    BackupStatus["EXPIRED"] = "expired";
})(BackupStatus || (exports.BackupStatus = BackupStatus = {}));
