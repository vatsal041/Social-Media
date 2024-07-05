import Post from "./Post"
import { useContext } from "react";
import {PostList as PostListData} from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {

    const {postList, fetchok} = useContext(PostListData);
    

    return (
        <>
            {postList.length === 0 && !fetchok && <WelcomeMessage/>}
            <div style={{
                display: "flex", 
                justifyContent: "space-around",
                flexWrap: "wrap",
            }}>
                {fetchok && <LoadingSpinner/>}
                {
                    !fetchok && postList.map((post) => {
                        return <Post key={post.id} post={post} />
                        })
                }
            </div>
        </>
    )
}

export default PostList