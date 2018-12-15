import React, { Component } from 'react';
import { connect } from 'react-redux';
import "semantic-ui-css/semantic.css";
import '../Css/MainFeed.css';
import "antd/dist/antd.css";
import Cards from './Card';
import axios from 'axios';
import { Loader } from './Loader';
import { storeUserPostsInLocalStore } from '../Redux/Actions/MainFeedAction';
import history from '../history';


class MainFeed extends Component {
    
    state = {
        listOfPosts : [],
        loading: true
    }

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