var posts = require('../model/post');
const DatabaseError = require('../error/DatabaseError')

module.exports = {
    create: ({title, content})=> {
        const postModel = new posts()
        postModel.title = title
        postModel.content = content
        return postModel.save()
    },
    readAll: () => {
        return posts.find()
    },
    detail: (postIdx) => {
        return posts.findOne({_id: postIdx})
    },
    update: async ({title, content, postIdx}) => {
        let post = await posts.findById(postIdx)
        if(!post){
            throw new DatabaseError();
        }
        post.title = title
        post.content = content
        return post.save()
    }

}
