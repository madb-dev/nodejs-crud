const fs = require('fs');

const updateAlbum = (req, res) => {
  let albums = JSON.parse(fs.readFileSync('./discography.json', 'utf-8'));
  var albumToUpdate = req.body;

  var filteredList = getFilteredByKey(albums, 'id', albumToUpdate.id);

  if (filteredList.length != 0) {
    Object.keys(filteredList).map(key => {
      let value = filteredList[key];
      let albumsUpdated = [];

      let remainingAlbums = getFilteredDistinctByKey(albums, 'id', albumToUpdate.id);
      albumsUpdated = remainingAlbums;
      value = albumToUpdate;
      albumsUpdated.push(value);

      albumsUpdated.sort((a, b) => a.id - b.id);

      fs.writeFileSync('./discography.json', JSON.stringify(albumsUpdated), 'utf-8');
      res.send(albumsUpdated);

      console.log(albumsUpdated);
    })
  } else {
    res.status(404).send({
      message: "Record doesn't found, check the body fields."
    })
  }

}

function getFilteredByKey(array, key, value) {
  return array.filter(function (e) {
    return e[key] == value;
  });
}

function getFilteredDistinctByKey(array, key, value) {
  return array.filter(function (e) {
    return e[key] != value;
  });
}

module.exports = [updateAlbum]