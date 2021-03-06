import React from 'react';
import {
    Button,
    Icon
} from 'semantic-ui-react';
import "semantic-ui-css/semantic.css";
import { 
    likeStatusAction
} from '../Redux/Actions/MainFeedAction';
import {connect} from 'react-redux';
import cookie from 'react-cookies';
import {updatePostInformation} from './UpdatePostActions';

/*
    LikeButton performs like opeartion when the users click like button.
    At the same time it will update the status into dynamoDB through API Post call.
    So that we can maintain dynamic status of each post status.
*/

class LikeButton extends React.Component {

    state = {
        active: null,
        count: 0
    };

    componentWillMount = () => {
        this.setState({
            active: this.props.active,
            count: this.props.count
        });
    }

    /*
        Checking the like and dislike status before performing the like action.
        Because if the dislike is enabled in that post, we cannot directly put like action.
    */

    LikeOnClick = (e) => {
        let index = cookie.load("index");
        if(this.props.disLikeStatus === false || this.props.postLists.mainFeedPostLists[index].disLikeStatus === false) {
            this.state.active === true ?
            this.setState({
                count: this.state.count < 0 ? this.state.count : this.state.count-1,
                active: !this.state.active
            },function() {
                this.props.likeStatusAction(this.state.active, this.props.index); 
                let postInfo = this.props.postLists.mainFeedPostLists[this.props.index];
                postInfo.likeStatus = this.state.active;
                postInfo.likeCount = this.state.count;
                updatePostInformation(postInfo);
            }) : this.setState({
                count: this.state.count+1,
                active: !this.state.active
            }, function() {
                this.props.likeStatusAction(this.state.active, this.props.index);
                let postInfo = this.props.postLists.mainFeedPostLists[this.props.index];
                postInfo.likeStatus = this.state.active;
                postInfo.likeCount = this.state.count;
                updatePostInformation(postInfo);
            });
            this.props.likeStatusAction(this.state.active, this.props.index);
        }
    }

    render() {
        return (
            <Button circular toggle active={this.state.active} onClick={this.LikeOnClick}>
                <Icon name="thumbs up outline" />
                {this.state.count}
            </Button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postLists : state.mainFeedPostLists
    }
}

export default connect(mapStateToProps, {likeStatusAction})(LikeButton);
