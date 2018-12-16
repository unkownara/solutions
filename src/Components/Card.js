import React, { Component } from 'react';
import "semantic-ui-css/semantic.css";
import '../Css/MainFeed.css';
import "antd/dist/antd.css";
import cookie from 'react-cookies';
import { Card } from "antd";
import BookMarkOption, {
    PostImage,
    PostInfo
} from './MainFeedComponents';
import LikeButton from './LikeStatus';
import { TwitterIcon } from 'react-share';
import DisLikeButton from './DisLikeStatus';
import history from '../history';


/*
    Card component ->   Post Image,
                        Poster profile,
                        Post description,
                        Like,
                        Dislike,
                        Bookmark,
                        Share (Only static)
*/
class Cards extends Component {

    state = {
        data: null,
        index : null
    }

    componentWillMount = () => {
        this.setState({
            data: this.props.data,
            index: this.props.index
        });
        cookie.save("index", this.props.index, { path: '/'});
    }

    /*
        Page redirection to post details with current post card details.
    */
    imageOnClick = (index, e) => {
        if(this.props.isFeed === true) {
            history.push({
                pathname: '/post_details',
                state: { 
                    postData: this.state.data,
                    index: index
                }
            });
        }
    }

    render() {
        let {
            data,
            index
        } = this.state;
        return (
            <div>
                <Card
                    style={{ width: '40%', marginTop: '30px' }}
                    cover={
                        <PostImage
                            userName={data.userName}
                            postImageURL={data.postImg}
                            index={index}
                            onClickEvent={() => this.imageOnClick(index)}
                        />
                    }
                    actions={[
                        <LikeButton
                            active={data.likeStatus}
                            count={data.likeCount}
                            disLikeStatus={data.disLikeStatus}
                            index={index}
                            isFeed={this.props.isFeed}
                        />,
                        <DisLikeButton
                            active={data.disLikeStatus}
                            count={data.disLikeCount}
                            likeStatus={data.likeStatus}
                            index={index}
                            isFeed={this.props.isFeed}
                        />,
                        <BookMarkOption
                            active={data.bookMark}
                            index={index}
                        />,
                        <TwitterIcon size={32} round={true}/>
                    ]}>
                    <PostInfo
                        userProfileURL={data.profileImg}
                        userName={data.userName}
                        postDescription={data.description}
                        isFeed={this.props.isFeed}
                    />
                </Card>
            </div>
        );
    }
}

export default Cards;