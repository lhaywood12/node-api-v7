const con = require('../../config/dbconfig')

const countryDao = {
    table: 'country',

    create: (req, res)=> {
        if(Object.keys(req.body).length === 0) {
            res. json({
                "error": true,
                "message": "No fields to create."
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `INSERT INTO rating SET ${fields.join('=?, ')} = ?`,
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
            "message": "Id must be a number"
        })
    } else if(Object.keys(req.body) === 0) {
        res.json({
            "error":true,
            "message": "No fields no update"
        })
    } else {
        const fields = Object.keys(req.body)
        const values = Object.values(req.body)

        con.execute (
            `UPDATE country SET ${fields.join(' = ?, ')} = ? WHERE country_id = ?`,
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

findCountry: (req, res, id)=> {

    con.execute(
        `SELECT f.title FROM country AS a INNER JOIN country AS A INNER JOIN country_name AS fa ON f.country_id = fa,film_id AND a.country_id = fa.country_id WHERE f.film_id = ${id}`,
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
    },

module.exports = countryDao