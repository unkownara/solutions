/*
    AWS Lambda Function.
    Scanning all the posts from Dynamodb (Node.js)
*/

const AWS = require('aws-sdk');

//Setting up a Dynamo DB region.
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-2'
});

exports.handler = function (event, context, callback) {
    console.log("params ", event);
    var params = {
    TableName: "POSTS_TABLE",
    FilterExpression: "#status = :status",
    ExpressionAttributeNames: {
        "#status": "status",
    },
    ExpressionAttributeValues: { ":status": 'ok' }
};

/*
    Scanning all the posts and returning a response in JSON format.
*/
docClient.scan(params, function(err, data) {
    if(err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        callback(null, data);
    }
});
}