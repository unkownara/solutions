/*
    AWS Lambda Funtion
    updating user changes in posts.
    e.g. Post like, dislike, bookmark.
*/

const AWS = require('aws-sdk');

//Setting up a Dynamo DB region.
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2'
});


exports.handler = function (event, context, callback) {
    var dynamoDBParams = {
        Item: {
            PostId: event.postInfo.PostId,
            bookMark: event.postInfo.bookMark,
            description: event.postInfo.description,
            disLikeCount: event.postInfo.disLikeCount,
            disLikeStatus: event.postInfo.disLikeStatus,
            likeCount: event.postInfo.likeCount,
            likeStatus: event.postInfo.likeStatus,
            postImg: event.postInfo.postImg,
            profileImg: event.postInfo.profileImg,
            status: event.postInfo.status,
            userName: event.postInfo.userName
        },
        TableName: 'POSTS_TABLE'
    };

    /*
        Updating post information into table.
    */
    docClient.put(dynamoDBParams, function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, true);
        }
    });
}