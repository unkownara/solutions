export const likeStatusAction = (status, index) => {
    return dispatch => {
        dispatch({
            type: "LIKE",
            payload: {status, index}
        });
    }
}

export const disLikeStatusAction = (status, index) => {
    return dispatch => {
        dispatch({
            type: "DISLIKE",
            payload: {status, index}
        });
    }
}

export const bookMarkAction = (status, index) => {
    return dispatch => {
        dispatch({
            type: "BOOKMARK",
            payload: {status, index}
        });
    }
}

export const storeUserPostsInLocalStore = (userPost) => {
    return dispatch => {
        dispatch({
            type: "USERPOST",
            payload: userPost
        });
    }
}