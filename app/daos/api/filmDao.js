const con = require('../../config/dbconfig')

const filmDao = {
    table: 'film',

    create: (req, res)=> {
        if(Object.keys(req.body).length === 0) {
            res. json({
                "error": true,
                "message": "No fields to create."
            })
        } else {
            const field = Object.keys(req.body) // creates an array
            const values = Object.values(req.body) //creates an array
            //Insert Into film Set "release_year=2025", language_id= 1"
            con.execute(
                `INSERT INTO film SET ${fields.join('=?, ')} = ?`,
                values,
                (error, dbres)=> {
                    if(!error) {
                        res.send(`Last id: ${dnres.insertId}`)
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
            res.json({
                "error":true,
                "message": "Id must be a numder."
            })
        } else if(Object.keys(req.body) === 0) {
            res.json({
                "error": true,
                "message": "No fields no update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute (
                //String, Array, Callback
                `UPDATE film SET ${fields.join(' = ?, ')} = ? WHERE film_id = ?`,
                [...values, req.params.id], 
                (error, dbres)=> {
                    if(!error) {
                        res.send(`Changed ${dbres.changeRows} row(s)`)
                    } else {
                        console.log('DAO ERROR', error)
                        res.send('Error updating record')
                    }
                }
            )
        }
    },

    findByRating: (res, rating)=> {
        con.execute(
            'SELECT * FROM film WHERE rating = ?',
            [rating],
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

findCast: (req, res, id)=> {
    
    con.execute(
        `SELECT f.title, a.first_name, a.last_name FROM film AS a INNER JOIN actor AS a INNER JOIN film_actor AS fa ON f.film_id = fa,film_id AND a.actor_id = fa.actor_id WHERE f.film_id = ${id}`,
        [id],
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

module.exports = filmDao