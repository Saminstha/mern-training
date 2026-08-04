import Express from 'express';
import studentRoutes from './routes/students';
import teacherRoutes from './routes/teachers';
const app = Express();

app.use(Express.json());

app.get('/', (req, res) => {
    res.json({message:'Hello World'});
});

app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);

app.listen(3003, () => {
    console.log('Server is running on port http://localhost:3003');
});