const fs = require("fs");

const addAlbum = (req, res) => {
  let albums = JSON.parse(fs.readFileSync("./discography.json", "utf-8"));
  var newAlbum = req.body;

  var filteredList = getFilteredByKey(albums, "album", newAlbum.album);

  if (filteredList.length != 0) {
    Object.keys(filteredList).map((key) => {
      var filteredListByArtist = getFilteredByKey(
        filteredList,
        "artist",
        newAlbum.artist
      );
      if (filteredListByArtist.length != 0) {
        res.status(400).send({
          message: "Record already exist.",
        });
      } else {
        albums.push(newAlbum);
        albums.sort((a, b) => a.id - b.id);
        fs.writeFileSync("./discography.json", JSON.stringify(albums), "utf-8");
        res.send(albums);
      }
    });
  } else {
    albums.push(newAlbum);
    albums.sort((a, b) => a.id - b.id);
    fs.writeFileSync("./discography.json", JSON.stringify(albums), "utf-8");
    res.send(albums);
  }
};

function getFilteredByKey(array, key, value) {
  return array.filter(function (e) {
    return e[key] == value;
  });
}

module.exports = [addAlbum];
