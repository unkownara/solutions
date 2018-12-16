import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cards from './Card';
import axios from 'axios';
import { Loader } from './Loader';
import { storeUserPostsInLocalStore } from '../Redux/Actions/MainFeedAction';
import history from '../history';

import "semantic-ui-css/semantic.css";
import '../Css/MainFeed.css';
import "antd/dist/antd.css";

/*
    MainFeed component contains all the card details and 
    making an API call for getting all the posts information from dynamoDB table
    through Aws API Gateway.
*/

class MainFeed extends Component {
    
    state = {
        listOfPosts : [],
        loading: true
    }

    /*
        GET API call for getting post lists from dynamodb table.
    */
    componentWillMount = () => {
        axios.get("https://0fadggmpo7.execute-api.us-east-2.amazonaws.com/beta/sample-api")
        .then(response => {
            console.log("response" ,response);
            this.setState({
                listOfPosts: response.data.Items,
                loading: false
            });
            this.props.storeUserPostsInLocalStore(response.data.Items);
        }).catch(error => console.log("error message ", error))
    }

    /*
        Page redirection to post details with current post card details.
    */
    imageOnClick = (index, e) => {
        history.push({
            pathname: '/post_details',
            state: {
                postData: this.state.listOfPosts[index],
                index: index
            }
        });
    }
    
    render() {
        if(this.state.listOfPosts !== undefined && this.state.listOfPosts.length > 0) {
            return (
                <div className="startingPost">
                {
                    this.state.listOfPosts.map((data, index) => {
                        return (
                            <Cards
                                data={data}
                                index={index}
                                isFeed = {true}
                            />
                        )
                    })
                }
                </div>
            );
        } else {
            return (
                <div className="startingPost">
                <Loader />
              </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        postLists : state.mainFeedPostLists
    }
}

export default connect(mapStateToProps, {storeUserPostsInLocalStore})(MainFeed);