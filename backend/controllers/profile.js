const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(user => {
            if (user.length) {
                db.select('*').from('history').where({ user_id: id })
                    .then(history => {
                        res.json({ user: user[0], history });
                    })
                    .catch(err => res.status(400).json('error getting search history'))
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}
