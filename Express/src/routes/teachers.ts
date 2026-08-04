import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello from teacher route' });
});

router.post('/', (req, res) => {
    console.log('body proccessed for post req',req.body);
    res.status(200).json({ message: 'Teacher data received successfully' })
});


router.get('/:id', (req, res) => {
    res.json({ message: 'Hello from teacher id route' });
});

export default router;