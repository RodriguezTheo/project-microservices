"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./environment/config");
const app = (0, express_1.default)();
// Middleware CORS
app.use((0, cors_1.default)());
// Middleware Helmet
app.use((0, helmet_1.default)());
// Middleware format JSON
app.use(express_1.default.json());
// Exemple de route
app.get("/", (req, res) => {
    res.send("Coucou from your dsqdsfsdfsdfqsdffqsdqsdsqsdqsddfervfdfer!");
});
app.get("/auth", (req, res) => {
    res.send("Autqsdsqdh!");
});
app.get("/autha", (req, res) => {
    res.send("Authaaqfq!");
});
const { port, startedMessage } = config_1.config;
app.listen(port, () => {
    console.log(startedMessage);
});
//# sourceMappingURL=server.js.map