const con = require('../../config/dbconfig')

const actorDao = {
    table: 'actor',

    create: (req, res)=> {
        if(Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "no fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `INSERT INTO actor SET ${fields.join(' = ?, ')} =?`,
                values,
                (error, dbres)=> {
                    if(!error) {
                        res.send(`Last idL ${dbres.insertId}`)
                    } else {
                        console.log('DAO ERROR', error)
                        res.send('Error creating record')
                    }
                }
            )
        }
    },

    update: (req, res)=> {
        if(isNaN(req.params.id)) {
            res.json ({
                "error":true,
                "message": "Id must ba a number."
            })
        } else if (Object.keys(req.body).lengtth === 0) {
            res.json ({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute (
                `UPDATE actor SET ${fields.join(' = ? ')} =? WHERE actor_id = ?`,
                [...values, req]
                )
            }
        },

        sort: (req, res)=> {
            
            con.query (
                'SELECT * FROM actor ORDER BY ${req.params.last_name}',
                [req.params.last_name, req.params.first_name],
                (error, rows)=> {
                    if(!error) {
                        if(rows.length === 1) {
                            res.json(...rows)
                        } else {
                            res.json(rows)
                        }
                    } else {
                        console.log('DAO ERROR', error)
                    }
                }
            )
        }

}

module.exports = actorDao