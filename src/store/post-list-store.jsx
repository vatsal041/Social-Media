import { createContext } from "react";
import { useReducer, useState, useEffect } from "react";



export const PostList = createContext({
    postList: [],
    addPost: () => {},
    deletePost: () => {},
    fetchok: false,
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
    else if(action.type === "ADD_INITIAL_POST") {
        newPostList = action.payload;
    }
    return newPostList;
}

const PostListProvider = ({ children }) => {

    const [postList,dispatchPostList] = useReducer(PostListReducer,[]);
    const [fetchok, setFetch] = useState(false);
    
    const addPost = (userId, title, body, views, tags) => {
        dispatchPostList({type: "ADD_POST", payload: {
            id: Date.now(),
            userId,
            title,
            body,
            reactions: {
                likes: 0,
                dislikes: 0
            },
            views,
            tags
        }});
    }

    const addInitialPosts = (posts) => {
        dispatchPostList({type: "ADD_INITIAL_POST", payload: posts});
    }

    const deletePost = (postId) => {
        dispatchPostList({type: "DELETE_POST", payload: postId});
    }


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPosts = async () => {
            try {
                setFetch(true);
                const response = await fetch('https://dummyjson.com/posts', { signal });
                const data = await response.json();
                addInitialPosts(data.posts);
                setFetch(false);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Fetch error:', error);
                }
                setFetch(false);
            }
        };

        fetchPosts();

        return () => {
            controller.abort();
        };
    },[])

    return <PostList.Provider value={{
        postList,
        addPost,
        deletePost,
        fetchok
    }}>
        {children}
    </PostList.Provider>
}

export default PostListProvider;