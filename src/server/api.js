import {Router} from 'express';

const router = Router();

function loggedIn(req, res, next) {
	console.log( req );
	if( !( 'user' in req ) ) {
		return res.json({error: 'not authorized'})
	}
	next();
}

router.post('/foo', (req, res) => {
	setTimeout(_ => {
		res.json({data: 'got foo'});
	}, 5000);
});

router.post('/bar', (req, res) => {
	res.json({data: 'got bar'});
});

router.post('/user/info', loggedIn, (req, res) => {
	res.json({data: req.user});
})

export default router;