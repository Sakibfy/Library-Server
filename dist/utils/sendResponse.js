"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, payload) => {
    res.status(200).json(payload);
};
exports.default = sendResponse;
