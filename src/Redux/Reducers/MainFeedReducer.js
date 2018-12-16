import { 
    mainFeedPostListsData
} from '../Store/StoreConstants';

/*
    Reducer for updating local changing data into Redux store objects.
*/
export const postStatus = (state = mainFeedPostListsData, action) => {
    switch (action.type) {
        /*
            User post -> Initial post list assignment. These data are fetching from Dynamodb table.
        */
        case "USERPOST":
            state = {
                ...state,
                mainFeedPostLists: action.payload
            }
        break;
        /*
            Like -> updating like status of each post.
        */
        case "LIKE":
            let currentPostDetails = state.mainFeedPostLists[action.payload.index];
            if(action.payload.status === true) {
                currentPostDetails.likeStatus = false;
                currentPostDetails.likeCount = currentPostDetails.likeCount > 0 ? 
                    currentPostDetails.likeCount - 1 : currentPostDetails.likeCount
            } else {
                currentPostDetails.likeStatus = true;
                currentPostDetails.likeCount = currentPostDetails.likeCount + 1;
                currentPostDetails.disLikeStatus = false;
                currentPostDetails.disLikeCount = currentPostDetails.disLikeCount > 0 ?
                currentPostDetails.disLikeCount - 1 : currentPostDetails.disLikeCount
            }
            let changedPostDetailsList = state.mainFeedPostLists;
            changedPostDetailsList[action.payload.index] = currentPostDetails;
            state = {
                ...state,
                mainFeedPostLists: changedPostDetailsList
            }
        break;
        
        /*
            Dislike -> updating disLike status of each post.
        */
        case "DISLIKE":
            let disLikePost = state.mainFeedPostLists[action.payload.index];
            if(action.payload.status === true) {
                disLikePost.disLikeStatus = false;
                disLikePost.disLikeCount = disLikePost.disLikeCount > 0 ? 
                    disLikePost.disLikeCount - 1 : disLikePost.disLikeCount
            } else {
                disLikePost.disLikeStatus = true;
                disLikePost.disLikeCount = disLikePost.disLikeCount + 1;
                disLikePost.likeStatus = false;
                disLikePost.likeCount = disLikePost.likeCount > 0 ? 
                    disLikePost.likeCount - 1 : disLikePost.likeCount
            }
            let tempPostList = state.mainFeedPostLists;
            tempPostList[action.payload.index] = disLikePost;
            state = {
                ...state,
                mainFeedPostLists: tempPostList
            }
        break;
        
        /*
            Bookmark -> Maintaining the post book mark status.
        */
        case "BOOKMARK":
            let bookMarkOpt = state.mainFeedPostLists[action.payload.index];
            if(action.payload.status === true) {
                bookMarkOpt.bookMark = false;
            } else {
                bookMarkOpt.bookMark = true;
            }
            let tempList = state.mainFeedPostLists;
            tempList[action.payload.index] = bookMarkOpt;
            state = {
                ...state,
                mainFeedPostLists: tempList
            }
        break;
            
        default:
        break;
    }
    return state;
}