const fs = require('fs');

const getDiscById = (req, res) => {
  let discography = JSON.parse(fs.readFileSync('./discography.json', 'utf-8'));

  const rankingFiltered = getFilteredByKey(discography, 'id', req.params.id);

  if (rankingFiltered.length != 0) {
    Object.keys(rankingFiltered).map(key => {
      const value = rankingFiltered[key];
      console.log(value);
      res.send(value);
    });
  } else {
    res.status(404).send({
      message: "Record doesn't found, check the id"
    });
  }


}

function getFilteredByKey(array, key, value) {
  return array.filter(function (e) {
    return e[key] == value;
  });
}

module.exports = [getDiscById]