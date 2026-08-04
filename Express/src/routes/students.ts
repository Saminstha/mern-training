import { Router } from "express";
import type { NewStudent } from "../types/studentTypes.ts";
const router = Router();

router.get('/', (req, res) => {
    
    res.json({ message: 'Hello from student route' });
    
});

router.post('/', (req, res) => {
    console.log('body proccessed for post req',req.body);
    res.status(201).json({ message: 'Student data received successfully' });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, role, avatar } = req.body as NewStudent;  
});

router.get('/:id', (req, res) => {
    res.json({ message: 'Hello from student id route' });
});

export default router;