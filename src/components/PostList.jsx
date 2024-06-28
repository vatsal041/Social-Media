import Post from "./Post"
import { useContext } from "react";
import {PostList as PostListData} from "../store/post-list-store";

const PostList = () => {

    const {postList} = useContext(PostListData);
    console.log("PostList: ", postList);

    return (
        <>
            {
                postList.map((post) => {
                    return <Post key={post.id} post={post} />
                })
            }
        </>
    )
}

export default PostList