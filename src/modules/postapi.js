const express = require('express')
const { User } = require('../schemas/user')
const { Tag } = require('../schemas/tags')
const { Topic } = require('../schemas/topics')
const { Post } = require('../schemas/posts')

const router = express.Router()

// save tags
// TODO - save or update tag and it's count, async. For now I am inserting
function saveTags(tags) {
    if(tags !== undefined) {
        tags.forEach((tag) => {
            const newTag = new Tag({
                name: tag
            });
            newTag.save().then(() => {
                console.log('Tag inserted ', tag);
            }).catch(() => {
                console.error('Error while saving tag ', tag);
            })
        })
    }
}

function savePost(req, userId, topicId) {
    console.log('body ', req.body);
    let tags;
    if(req.body.tags !== undefined) {
        tags = req.body.tags.split(',');
    }

    // tags can be predefined or new
    // add tags to the post and then save it in tags db
    // topic is predefined
    let postObject = {
        title: req.body.title,
        body: req.body.body,
        created: Date(),
        comments: [],
        user: userId,
        topic: topicId,
        tags,
        upvotes: 0,
        downvotes: 0,
        views: 0
    }

    const newPost = new Post(postObject);
    newPost.save().then((doc) => {
        console.log('Post Saved ', doc);
        saveTags(tags)
    }).catch((error) => {
        console.error('Error while saving post', error);
    })
}

// Get Posts
// TODO - Add filters like most popular etc.
router.get('/', (req, res) => {
    Post.find({}).then((posts) => {
        res.json(posts);
    }).catch(() => {
        console.error('Error getting posts');
        res.status(500);
    })
});

// Add Post
router.post('/', (req, res) => {
    // user should be authenticated
    //if(req.isAuthenticated()) {
        let tempuser;
        // const user = req.user;
        User.findOne({email: 'a@a.com'}).then((user) => {
            Topic.findOne({name: 'tech'}).then((topic) => {
                console.log('user = ', user);
                console.log('topic = ', topic);
                savePost(req, user._id, topic._id);
                res.send({
                    message: 'Data is being saved'
                })
            }).catch((error) => {
                console.error('Error while fetching topic ', error);
                res.sendStatus(500);
            })
        }).catch((error) => {
            console.error('Error while fetching user ', error);
            res.sendStatus(500);
        })
    //}
})

module.exports = router
