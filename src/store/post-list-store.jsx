import { createContext } from "react";
import { useReducer } from "react";



export const PostList = createContext({
    postList: [],
    addPost: () => {},
    deletePost: () => {}
});

const PostListReducer = (currPostList, action) => {
    let newPostList = currPostList;
    if(action.type === "DELETE_POST") {
        newPostList = currPostList.filter((post) => {
            return post.id !== action.payload;
        });
    }
    else if(action.type === "ADD_POST") {
        newPostList = [action.payload, ...currPostList];
    }
    return newPostList;
}

const PostListProvider = ({ children }) => {

    const [postList,dispatchPostList] = useReducer(PostListReducer,DEFAULT_POST_LIST);
    const addPost = (userId, title, body, reactions, tags) => {
        dispatchPostList({type: "ADD_POST", payload: {
            id: Date.now(),
            userId,
            title,
            body,
            reactions,
            tags
        }});
    }

    const deletePost = (postId) => {
        dispatchPostList({type: "DELETE_POST", payload: postId});
    }


    return <PostList.Provider value={{
        postList,
        addPost,
        deletePost
    }}>
        {children}
    </PostList.Provider>
}

const DEFAULT_POST_LIST = [
    {
        id: 1,
        title: "Going to Mumbai",
        body: "Hi Friends, I am going to mumbai for vecation",
        reactions: 2,
        userId: "user-1",
        tags: ["Vacation", "Mumbai","Enjoy"]
    },
    {
        id: 2,
        title: "B-Tech Pass",
        body: "Hi Friends, I successfully completed my B-Tech",
        reactions: 5,
        userId: "user-2",
        tags: ["Happy", "B-Tech","Enjoy"]
    }
]

export default PostListProvider;