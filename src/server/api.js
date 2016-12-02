import {Router} from 'express';

const router = Router();

router.post('/foo', (req, res) => {
	setTimeout(_ => {
		res.json({data: 'got foo'});
	}, 5000);
});

router.post('/bar', (req, res) => {
	res.json({data: 'got bar'});
});

export default router;