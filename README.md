## OverView ##

# Social App
    It contains mainfeed page for showing all the posts. It has some common events like post Like, DisLike, BookMark, Share (Static). When the user clicks a particular post it will redirect to another page and showing the particular post details with the same common events as I mentioned earlier. When the users makes any changes in any post like putting like it will be stored in the DynamoDb table through AWS API Call.
 
# Languages & Technologies used:
    => Front end
        -> React Js, (Redux)
    => Back end
        -> AWS Service
            . AWS Lambda Function (Serverless computing platform)
                Integrating with DynamoDb (Scan, put operation)
            . AWS Dynamo DB (Storing all the posts data)
            . AWS S3 (Storing post Images and user profiles)
            . AWS API Gateway (GET, POST calls)
            . AWS IAM (for authentication)
        -> Node.js (Lambda function)

# working flow
                        

    => Initial stage when the page is loading,
                        
                         Response
    Front end           <-------------    AWS Lambda Function <------------ DynamoDB
    (Web application)   -------------->    (Posts data)                      (Table)
                        (GET API CALL)
    
    => After getting successful response from server, the posts are displayed in the web page,
    
    => When the users click any events like post Like, DisLike, BookMark. It will be automatically calling a POST API call and updating into dynamodb through Lambda function.


                        (POST API CALL)    
    Front end           ------------->   AWS Lambda Function ------------> DynamoDB
    (Web application)                     (Posts data)                      (Table)
         |
         |
         | (Parallely updating the changed event in Redux store object)
         |
         v
    Redux store
     (Object)

# Open sources used:

    => Semantic UI React ("https://react.semantic-ui.com/")
    => Ant Design ("https://ant.design/docs/react/introduce")
    => Material Design ("https://material-ui.com/")

# Thank you!!
    I am developing this application with basic UI design and backend service. I am putting more
    concentrate in working functionality and reusable component. I am structured the code as much as reusable component. And I think, I covered almost all edge cases.
