var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');
var mongo       = require('mongodb');
var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'microBlog';

//ESTABLECIMIENTO DE LA CONEXION CON LA BD
    db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log('FALLO CON LA BD (hace falta inicializarla): '+ e);
	}	else{
		console.log('connected to database :: ' + dbName);
	}
});

var PM= this;
var posts = db.collection('posts');

//METODO PARA AÑADIR UN NUEVO ARTICULO
exports.addNewPost = function(post, callback)
{
	posts.findOne({title:post.title}, function(e, o) {
		if (o){
			callback('title-taken');
		}	else{
			    
                //separamos las tags
                var tags = post.tags;
                var tagsSeparados = tags.split(" ");
                console.log("TAGS SEPARADOS: "+ tags);
                console.log("VideoBlobURL: "+ post.videoBlobURL);
				post.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                post.tags = tagsSeparados;
                post.comments = [];




                //Prueba para ver si puedo detectar el campo vacio
                if (post.videoBlob===""){
                    console.log("video BLOB VACIO");

                    }
              
                //post.videoBlob = post.videoBlob;
				post.videoBlob = post.videoBlob;
                post.videoBlobURL = post.videoBlobURL;
                post.audioBlob = post.audioBlob;
                post.audioBlobURL= post.audioBlobURL;

                
                posts.insert(post, {safe: true}, callback);
                console.log("POST INSERTADO ");
					
				}
			});
}
//METODO PARA AÑADIR NUEVO COMENTARIO
exports.newComment = function(commentData,callback){
    posts.findOne({title: commentData.title}, function(e, post){
        if (e) console.log('ERRORAZO  encontrando el post PM.newComment');
        var titlePost = commentData.title;
        var bodyComentario = commentData.commentBody;
        var authorComentario = commentData.author;
        var dateComentario = moment().format('MMMM Do YYYY, h:mm:ss a');
        var idPost = commentData.post_id;
        console.log('DATOS CAPTURADOS: '+ titlePost+" "+ bodyComentario+" "+ authorComentario+" "+ idPost+" ");

        posts.update({title: titlePost},
            {
              
               $push: {'comments': {'author':authorComentario,'body':bodyComentario,'date':dateComentario}}
            },callback)
                      
        });


        
}


exports.editPost = function(postData,callback){

        posts.findOne({title: postData.oldTitle}, function(e, post){

        if (e) console.log('ERROR');
        else{

            var tagsAux = postData.tags.split(" ");


            var oldTitle = postData.oldTitle;
            var titlePost = postData.title;
            var bodyPost = postData.body;
            var authorPost = postData.author;
            var dateEdit = moment().format('MMMM Do YYYY, h:mm:ss a');
            var idPost = post._id;
            var tags = tagsAux;
            var comments = post.comments;
            var videoBlob = post.videoBlob;
            var videoBlobURL= post.videoBlobURL;
            var isPrivateVideo = post.isPrivate

            //console.log('tags(split): '+ tagsAux+ ' tags(sin split):'+ post.tags);

            

           //COMPROBAMOS SI EL TITUO ES EL MISMO, SI NO LO ES BORRAMOS EL ARTICULO E INSERTAMOS UNO NUEVO
           if (oldTitle === titlePost){


       
                posts.update({title: titlePost},
                    {
                        title:titlePost,
                        body: bodyPost,
                        date: dateEdit,
                        author: authorPost,
                        comments: comments,
                        videoBlob: videoBlob,
                        videoBlobURL: videoBlobURL,
                        tags: tagsAux,
                        isPrivate: isPrivateVideo
                        
             
                    },callback)

            }else{
            
                posts.remove({title:oldTitle},callback);
            
                posts.insert({
                    title: titlePost,
                    body: bodyPost,
                    date: dateEdit,
                    author: authorPost,
                    tags: tagsAux,
                    comments: comments,
                    videoBlob: videoBlob,
                    videoBlobURL: videoBlobURL

                }, {safe: true}, callback);
            



            
            }
      }

        });
    
    
    }

exports.deletePost = function(id, callback)
{
	posts.remove({_id: getObjectId(id)}, callback);
}


//METODO PARA BUSCAR LOS ARTICULOS SEGUN AUTOR
exports.getAllPostsFromAuthor = function(author,callback)
{
	posts.find({author:author}).toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

//METODO PARA BUSCAR LOS ARTICULOS SEGUN UN TAG
exports.getAllPostsFromTag = function(tag,callback)
{
	posts.find({tags:tag}).toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
//METODO PARA OBTENER TODOS LOS ARTICULOS
exports.getAllPosts = function(callback)
{
	posts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};
//METODO PARA OBTENER TODOS LOS ARTICULOS NO PRIVADOS
exports.getAllNoPrivatePosts = function(author,callback)
{
    posts.find({$or: [{isPrivate:0},{author:author} ]}).toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
    
    
    }

//METODO PARA OBTENER UN ARTICULO EN BASE A UN ID
exports.findPostById=function(id, callback){

    console.log("el id dentro del findpostbyid es: "+ getObjectId(id));
    posts.findOne({_id: getObjectId(id)}, function(error, result) {
          if( error ){
              callback(error)
              }else{
                  if (result===null){
                      callback('ERROR: Post not found');
                      }else{ callback(null, result);}
                    }
            });

      };

exports.findPostByTitle=function(title, callback){
    posts.findOne({title: title}, function(error, result) {
          if( error ){
              callback(error)
              }else{
                  if (result===null){
                      callback('ERROR: Post not found');
                      }else{ callback(null, result);}
                    }
            });

      };
//METODO PARA OBTENER TODOS LOS ARTICULOS DE UN AUTOR
exports.findPostByAuthor=function(author, callback){
    posts.findOne({author: author}, function(error, result) {
          if( error ){
              callback(error)
              }else{
                  if (result===null){
                      callback('ERROR: Post not found');
                      }else{ callback(null, result);}
                    }
            });

      };

      
/* METODOS AUXILIARES */

var getObjectId = function(id)
{
	return posts.db.bson_serializer.ObjectID.createFromHexString(id)
}

var findById = function(id, callback)
{
	posts.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

exports.findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	posts.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}

      
   





	
  
    

