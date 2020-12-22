"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
// Imports //
const express_1 = __importDefault(require("express"));
const handlebars_1 = __importDefault(require("handlebars"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const allow_prototype_access_1 = require("@handlebars/allow-prototype-access");
const mongoose_1 = __importDefault(require("mongoose"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// Import routes //
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const tasks_1 = __importDefault(require("./routes/tasks"));
// Class //
class Server {
    constructor() {
        this.server = express_1.default();
        this.config();
        this.routes();
    }
    ;
    config() {
        // Mongoose //
        let MONGO_URI = 'mongodb://localhost:27017/databasetscrud';
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
            .then(() => console.log('Database is connected'))
            .catch((err) => console.log('Database NOT connected', err));
        // Settings //
        this.server.set('port', process.env.PORT || 3000);
        this.server.set('views', path_1.default.join(__dirname, 'views'));
        // Engine //
        this.server.engine('.hbs', express_handlebars_1.default({
            handlebars: allow_prototype_access_1.allowInsecurePrototypeAccess(handlebars_1.default),
            layoutsDir: path_1.default.join(this.server.get('views'), 'layouts'),
            partialsDir: path_1.default.join(this.server.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.server.set('view engine', '.hbs');
        // Static files //
        this.server.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        // Middlewares //
        this.server.use(compression_1.default());
        this.server.use(helmet_1.default());
        this.server.use(morgan_1.default('dev'));
        this.server.use(cors_1.default());
        this.server.use(express_1.default.json());
        this.server.use(express_1.default.urlencoded({ extended: false }));
    }
    ;
    routes() {
        this.server.use(index_routes_1.default);
        this.server.use('/tasks', tasks_1.default);
    }
    ;
    start() {
        this.server.listen(this.server.get('port'), () => console.log(`Server works on port ${this.server.get('port')}`));
    }
    ;
}
exports.Server = Server;
;
