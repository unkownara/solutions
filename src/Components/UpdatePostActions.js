import axios from 'axios';

/*
    Post data updation is performed through AWS API gateway. And updating the post information in DynamoDb table.
*/
export const updatePostInformation = (postInfo) => {
    axios({
        method: "POST",
        url: "https://0fadggmpo7.execute-api.us-east-2.amazonaws.com/beta/sample-api",
        data: JSON.stringify({
            postInfo: postInfo
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log("success response from server ", response);
    }).catch(error => {
        console.log("Faliure response from server ", error);
    });
}