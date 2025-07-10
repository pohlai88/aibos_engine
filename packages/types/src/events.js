"use strict";
/**
 * Event System Types
 * Defines the interfaces for event-driven communication in AIBOS Engine
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPriority = void 0;
var EventPriority;
(function (EventPriority) {
    EventPriority["LOW"] = "low";
    EventPriority["NORMAL"] = "normal";
    EventPriority["HIGH"] = "high";
    EventPriority["CRITICAL"] = "critical";
})(EventPriority || (exports.EventPriority = EventPriority = {}));
