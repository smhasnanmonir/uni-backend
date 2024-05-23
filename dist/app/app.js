"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandle_1 = __importDefault(require("./middleware/globalErrorHandle"));
const noFound_1 = __importDefault(require("./middleware/noFound"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send("Server is running!!");
});
app.use(globalErrorHandle_1.default);
app.use(noFound_1.default);
exports.default = app;
