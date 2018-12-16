import React, {Fragment} from 'react';
import {
    Button,
    Icon
} from 'semantic-ui-react';
import "semantic-ui-css/semantic.css";
import { Card, Avatar } from "antd";
import { connect } from 'react-redux'; 
import {bookMarkAction} from '../Redux/Actions/MainFeedAction';
import { updatePostInformation } from './UpdatePostActions';
import Snackbar from '@material-ui/core/Snackbar';
const { Meta } = Card;

/*
    Functional Component for displaying post Image.
*/
export const PostImage = (props) => {
    return (
        <img
            alt={props.userName}
            src={props.postImageURL}
            onClick={props.onClickEvent}
        />
    )
}

/*
    Functional component for poster information, e.g. User profile , user name, post description.
*/
export const PostInfo = (props) => {
    const description = props.isFeed === true && props.postDescription.length > 255 ? props.postDescription.substring(0,255)+"..." : props.postDescription;
    return (
        <Meta
            avatar={
                <Avatar src={props.userProfileURL} />
            }
            title={props.userName}
            description={description}
        />
    )
}

/*
    BookMarkOption - Maintaining bookmark posts and snackbar will popup whenever users click
    bookmark adding and removing.
*/
class BookMarkOption extends React.Component {

    state = {
        active: null,
        open: false,
        vertical: 'top',
        horizontal: 'center'
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    
    componentWillMount = () => {
        this.setState({
            active: this.props.active
        });
    }

    addBookMarkEvent = state => {
        this.setState({ open: true, ...state });
        let tempPostList = this.props.postLists.mainFeedPostLists[this.props.index];
        if(this.state.active === true) {
            tempPostList.bookMark = false;
        } else {
            tempPostList.bookMark = true;
        }
        this.setState({
            active: !this.state.active
        }, function() {
            updatePostInformation(tempPostList);
            this.props.bookMarkAction(this.state.active, this.props.index);
        });
    }

    render() {
        const { vertical, horizontal, open } = this.state;
        let bookMarkMsg = this.state.active === true ? "BookMark added!!!" : "BookMark removed!!!!";
        return (
            <Fragment>
                <Button circular toggle active={this.state.active} onClick={() => this.addBookMarkEvent({ vertical: 'top', horizontal: 'center' })}>
                    <Icon name="bookmark outline" />
                </Button>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={
                        <span id="message-id">{bookMarkMsg}</span>
                    }
                />
          </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postLists : state.mainFeedPostLists
    }
}

export default connect(mapStateToProps, {bookMarkAction})(BookMarkOption);
