import { SQL, executeQuery } from './sql';

let id = 123;

//returns a promise
executeQuery(SQL`
	SELECT *
	FROM Table
	WHERE id = ${id}
`);

// or build in parts and compose

let whereClause = SQL`WHERE id = ${id}`;

let query = SQL`SELECT * FROM Table ${whereClause}`;

executeQuery(query);
