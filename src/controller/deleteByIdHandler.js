const fs = require('fs');

  const deleteById = (req, res) => {
    let albums = JSON.parse(fs.readFileSync('./discography.json', 'utf-8'));     
    var filteredList = getFilteredByKey(albums, 'id', req.params.id);
  
    if(filteredList.length!=0){
      Object.keys(filteredList).map(key => {
        let albumFiltered = [];
  
        let remainingAlbums = getFilteredDistinctByKey(albums, 'id', req.params.id);
        albumFiltered = remainingAlbums;
        
        albumFiltered.sort((a,b) => a.id-b.id);
  
        fs.writeFileSync('./discography.json', JSON.stringify(albumFiltered), 'utf-8');
        res.send(albumFiltered);
        console.log(albumFiltered);
      })
    }else{
      res.status(404).send({
        message: "Record doesn't found, check the id"
      })
    }
  
      
    }

    function getFilteredByKey(array, key, value) {
      return array.filter(function(e) {
        return e[key] == value;
      });
    }

    function getFilteredDistinctByKey(array, key, value) {
      return array.filter(function(e) {
        return e[key] != value;
      });
    }

  module.exports = [deleteById]