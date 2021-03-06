import React from 'react';
import {
    Button,
    Icon
} from 'semantic-ui-react';
import "semantic-ui-css/semantic.css";
import { 
    disLikeStatusAction
} from '../Redux/Actions/MainFeedAction';
import {connect} from 'react-redux';
import cookie from 'react-cookies';
import {updatePostInformation} from './UpdatePostActions';

/*
    DisLikeButton performs dislike opeartion when the users click dislike button.
    At the same time it will update the status into dynamoDB through API Post call.
    So that we can maintain dynamic status of each post status.
*/
class DisLikeButton extends React.Component {

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
        Checking the like and dislike status before performing the dislike action.
        Because if the like is enabled in that post, we cannot directly put dislike action.
    */
   
    disLikeOnClick = (e) => {
        let index = cookie.load("index");
        if(this.props.likeStatus === false || this.props.postLists.mainFeedPostLists[index].likeStatus === false) {
            this.state.active === true ?
            this.setState({
                count: this.state.count < 0 ? this.state.count : this.state.count-1,
                active: !this.state.active
            },function() {
                this.props.disLikeStatusAction(this.state.active, this.props.index); 
                let postInfo = this.props.postLists.mainFeedPostLists[this.props.index];
                postInfo.disLikeStatus = this.state.active;
                postInfo.disLikeCount = this.state.count;
                updatePostInformation(postInfo);
            }) : this.setState({
                count: this.state.count+1,
                active: !this.state.active
            }, function() {
                this.props.disLikeStatusAction(this.state.active, this.props.index);
                let postInfo = this.props.postLists.mainFeedPostLists[this.props.index];
                postInfo.disLikeStatus = this.state.active;
                postInfo.disLikeCount = this.state.count;
                updatePostInformation(postInfo);
            });
            this.props.disLikeStatusAction(this.state.active, this.props.index);
        }
    }

    render() {
        return (
            <Button circular toggle active={this.state.active} onClick={this.disLikeOnClick}>
                <Icon name="thumbs down outline" />
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

export default connect(mapStateToProps, {disLikeStatusAction})(DisLikeButton);
