"use strict";
/**
 * Billing System Types
 * Defines the interfaces for billing, subscription, and payment management in AIBOS Engine
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingEventType = exports.PaymentStatus = exports.InvoiceStatus = exports.SubscriptionStatus = void 0;
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["CANCELED"] = "canceled";
    SubscriptionStatus["PAST_DUE"] = "past_due";
    SubscriptionStatus["UNPAID"] = "unpaid";
    SubscriptionStatus["TRIAL"] = "trial";
    SubscriptionStatus["PAUSED"] = "paused";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus["DRAFT"] = "draft";
    InvoiceStatus["OPEN"] = "open";
    InvoiceStatus["PAID"] = "paid";
    InvoiceStatus["VOID"] = "void";
    InvoiceStatus["UNCOLLECTIBLE"] = "uncollectible";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["PROCESSING"] = "processing";
    PaymentStatus["SUCCEEDED"] = "succeeded";
    PaymentStatus["FAILED"] = "failed";
    PaymentStatus["CANCELED"] = "canceled";
    PaymentStatus["REFUNDED"] = "refunded";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var BillingEventType;
(function (BillingEventType) {
    BillingEventType["SUBSCRIPTION_CREATED"] = "subscription_created";
    BillingEventType["SUBSCRIPTION_UPDATED"] = "subscription_updated";
    BillingEventType["SUBSCRIPTION_CANCELED"] = "subscription_canceled";
    BillingEventType["INVOICE_CREATED"] = "invoice_created";
    BillingEventType["INVOICE_PAID"] = "invoice_paid";
    BillingEventType["INVOICE_FAILED"] = "invoice_failed";
    BillingEventType["PAYMENT_SUCCEEDED"] = "payment_succeeded";
    BillingEventType["PAYMENT_FAILED"] = "payment_failed";
    BillingEventType["USAGE_RECORDED"] = "usage_recorded";
    BillingEventType["LIMIT_EXCEEDED"] = "limit_exceeded";
})(BillingEventType || (exports.BillingEventType = BillingEventType = {}));
