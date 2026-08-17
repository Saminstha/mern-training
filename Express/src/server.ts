import Express from 'express';
import studentRoutes from './routes/students';
import teacherRoutes from './routes/teachers';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import { connectDB } from './config/mongoose';
const app = Express();
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

async function startServer(): Promise<void> {
    await connectDB();
    app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000');});
}
app.use(Express.json());
app.use(requestLogger);
// app.get('/', (req, res) => {
//     res.json({message:'Hello World'});
// });

app.use('/students', studentRoutes);
// app.use('/teachers', teacherRoutes);
app.use(errorHandler);

startServer();
