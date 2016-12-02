import query from '../modules/db-promise';

const SQL_SYMBOL = Symbol('SQL');
const SQL_RESOLVED_SYMBOL = Symbol('SQL - Ready To Run');

// The tagged template string function just stores the parts for later.
// We resolve this into a { text, values } object for postgres with resolveQuery
export function SQL(parts, ...values) {
    return {
        type: SQL_SYMBOL,
        parts,
        values
    };
}

// resolve a SQL`` object into { text, values } from postgres.
export function resolveQuery(sql) {
    if (!sql || !(sql.type === SQL_SYMBOL)) throw new Error("Not an SQL query object.");

    return sql.parts.reduce((prev, next, i) => {

        if (i > 0) { // for every 'part' after the first (which is special)
            let value = sql.values[i - 1];

            if (value && value.type === SQL_SYMBOL) {
                // If we are adding a sub-query, resolve it, them merge it.
                let innerQuery = resolveQuery(value);

                return {
                    type: SQL_RESOLVED_SYMBOL,
                    text: prev.text + innerQuery.text + next,
                    values: prev.values.concat(innerQuery.values)
                };
            }
            else {
                // this is just a normal query param.
                return {
                    type: SQL_RESOLVED_SYMBOL,
                    text: prev.text + '?' + next,
                    values: [ ...prev.values, value ]
                };
            }
        }
        else { // the first query part. No arguments, yet. They'll be added in subsequent parts
            return {
                type: SQL_RESOLVED_SYMBOL,
                text: next,
                values: []
            };
        }

    }, { type: SQL_RESOLVED_SYMBOL, values: [], text: '' });
}

//resolve and execute a query.
// will barf if you forgot to use SQL`` (to prevent accidental sql-injection vulnerabilities)
export function executeQuery(sql) {
    let resolved = resolveQuery(sql);

    return query(resolved);
}
