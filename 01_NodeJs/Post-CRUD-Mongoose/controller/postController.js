var posts = require('../model/post');

module.exports = {
    create: ({title, content})=> {
        const postModel = new posts()
        postModel.title = title
        postModel.content = content
        return postModel.save()
    },
    

}
