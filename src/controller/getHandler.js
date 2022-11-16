const fs = require('fs');

const getDiscography = (req, res) => {
    let discs = JSON.parse(fs.readFileSync('./discography.json', 'utf-8'));

    discs.sort((a, b) => a.id - b.id);

    console.log(discs);
    res.send(discs);
}

module.exports = [getDiscography]