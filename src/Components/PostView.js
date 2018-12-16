import React from 'react';
import "semantic-ui-css/semantic.css";
import "antd/dist/antd.css";
import "../Css/PostView.css";
import Cards from './Card';

/*
    PostView component -> Separate view of each posts.
        It contains similar options what are exactly shown in the Feed page.
*/
export default class PostView extends React.Component {

    state = {
        postData: null,
        index: null
    };

    componentWillMount = () => {
        this.setState({
            postData: this.props.location.state.postData,
            index: this.props.location.state.index
        });
    }

    render() {
        return (
            <div className="postView">
                <div>
                    <h1>{this.state.postData.userName} Post</h1>
                    <Cards
                        data={this.state.postData}
                        index={this.state.index}
                        isFeed={false}
                    />
                </div>
            </div>
        );
    }
}