"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const process = __importStar(require("process"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ silent: true });
const config = {
    name: process.env.SERVICE_NAME,
    baseAPIRoute: process.env.BASE_API_ROUTE,
    port: process.env.PORT || 8080,
    db: {
        uri: process.env.DB_URI || "",
        username: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
    },
    jwtSecret: process.env.JWT_SECRET || "",
    startedMessage: `⚡️[${process.env.SERVICE_NAME}] : running at ${process.env.BASE_API_ROUTE}`,
};
exports.config = config;
//# sourceMappingURL=config.js.map