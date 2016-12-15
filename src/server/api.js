import {Router} from 'express';
import query from './modules/db-promise';

const router = Router();

function loggedIn(req, res, next) {
	if( !( 'user' in req ) ) {
		return res.json({error: 'not authorized'})
	}
	next();
}

router.post('/user/info', loggedIn, (req, res) => {
	res.json({data: req.user});
});

router.post('/gist/add', loggedIn, (req, res) => {
	// this is all terrible.
	
	const { name = '', url = '', matching = '', description = '' } = req.body;
	const { userid } = req.user[0];
	const [,gistid] = url.match(/https:\/\/gist\.github\.com\/.*\/(\w+)/) || '';
	const values = [userid].concat([gistid, name, description, matching].map( str => str.replace(/</g, '&lt;') ));
	console.log(values);
	const params = {
		text: `
			INSERT INTO gist_store 
				( userid, gistid, name, description, matches )
			VALUES 
				( $1, $2, $3, $4, $5 )
		`,
		values: values
	};
	query(params).then(rows => res.json(rows))
		.catch(err => res.json({error: err}));
});

router.get('/gist/list', (req, res) => {
	const {offset = 0, limit = 10} = req.query;
	const params = {
		text: `
			SELECT 
				store.*,
				profile.login as username
			FROM gist_store as store
			LEFT OUTER JOIN profile_details as profile
			ON (CAST(profile.userid AS VARCHAR(255)) = store.userid)
			ORDER BY store.id ASC LIMIT $2 OFFSET $1
		`,
		values: [offset, limit]
	};
	query(params).then(rows => res.json({rows}))
		.catch(err => res.json({error: err}));
});

router.get('/gist/count', (req, res) => {
	const params = {
		text: `
			SELECT 
				COUNT(*)
			FROM gist_store
		`
	};
	query(params).then(rows => res.json({rows}))
		.catch(err => res.json({error: err}));
});

export default router;