const handleHistoryPost = (db) => (req, res) => {
    const { userId, imageUrl } = req.body;
    db.transaction(trx => {
        trx.insert({
            user_id: parseInt(userId),
            url: imageUrl,
            uploaded_at: new Date()
        })
            .into('history').where({ user_id: parseInt(userId) })
            .returning('*')
            .then(searchHistory => {
                res.json(searchHistory[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to store history'))
}

module.exports = {
    handleHistoryPost: handleHistoryPost
}
