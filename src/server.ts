// Imports //
import express from 'express';
import hand from 'handlebars';
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

// Import routes //
import indexRoutes from './routes/index.routes';
import tasksRoutes from './routes/tasks';

// Class //
class Server {
    public server: express.Application;
    constructor() {
        this.server = express();
        this.config();
        this.routes();
    };
    config() {
        // Mongoose //
        let MONGO_URI = 'mongodb://localhost:27017/databasetscrud';
        mongoose.set('useFindAndModify', false);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => console.log('Database is connected'))
        .catch((err) => console.log('Database NOT connected', err));

        // Settings //
        this.server.set('port', process.env.PORT || 3000);
        this.server.set('views', path.join(__dirname, 'views'));

        // Engine //
        this.server.engine('.hbs', exphbs({
            handlebars: allowInsecurePrototypeAccess(hand),
            layoutsDir: path.join(this.server.get('views'), 'layouts'),
            partialsDir: path.join(this.server.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }));
        this.server.set('view engine', '.hbs');

        // Static files //
        this.server.use(express.static(path.join(__dirname, 'public')));

        // Middlewares //
        this.server.use(compression());
        this.server.use(helmet());
        this.server.use(morgan('dev'));
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
    };
    routes() {
        this.server.use(indexRoutes);
        this.server.use('/tasks', tasksRoutes);
    };
    start() {
        this.server.listen(this.server.get('port'), () => console.log(`Server works on port ${this.server.get('port')}`));
    };
};

// Exports //
export { Server };