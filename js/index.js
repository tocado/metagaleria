    var db = sqlitePlugin.openDatabase({
        name: 'MetaGaleria.db',
        location: 'default',
        androidDatabaseProvider: 'system'
    });

    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS imagen (id INTEGER PRIMARY KEY ASC AUTOINCREMENT, uri TEXT, nombre TEXT, hash TEXT)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS metadato (id INTEGER PRIMARY KEY ASC AUTOINCREMENT, id_imagen INTEGER, metadato TEXT)');
    }, function(error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function() {
        console.log('Populated database OK');
        alert("base de datos creada");
    });

document.addEventListener('deviceready', function()
{
    var $content = document.getElementById("content");

    $content.innerHTML = "Loading albums ...";

    galleryAPI.getAlbums(function(items)
    {
        //var html = "";
            //html += '<a href="javascript:loadAlbum(\'' + album.title + '\')" class="album"><span>' + escape(album.title) + '</span></a>';

        for(var i = 0; i < items.length; i++)
        {
            var album = items[i];

            //html += '<a href="javascript:loadAlbum(\'' + album.title + '\')" class="album"><span>' + escape(album.title) + '</span></a>';
            window.loadAlbum(album.title);
        }

        //$content.innerHTML = html;

    }, function(error){alert(error);});

    window.loadAlbum = function(albumName)
    {
        galleryAPI.getMedia(albumName, function(items)
        {
          //  var html = "";

            for(var i = 0; i < items.length; i++)
            {
                var media = items[i];
                alert(media.thumbnail);
            //    html += '<a href="javascript:void()" class="media"><img src="' + media.thumbnail + '" /></a>';
            }
//            document.getElementById("content").innerHTML = "";
  //          document.write(media.thumbnail);

            //$content.innerHTML = html;

        }, function(error){alert(error);});
    };

    function escape(v)
    {
        return v.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
            return '&#'+i.charCodeAt(0)+';';
        });
    }


}, false);