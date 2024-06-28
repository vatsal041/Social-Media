import { AiFillDelete } from "react-icons/ai";
import "./Post.css";
import { useContext } from "react";
import { PostList } from "../store/post-list-store";

const Post = ({post}) => {

    const {deletePost} = useContext(PostList);

    return (
        <div className="card post-1">
            <div className="card-body">
                <h5 className="card-title">{post.title}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    onClick={() => {deletePost(post.id)}}
                >
                    <AiFillDelete/>
                </span>
                </h5>
                <p className="card-text">{post.body}</p>
                {
                    post.tags.map((tag) => {
                        return <span key={tag} className="badge text-bg-primary tags-class">{tag}</span>
                    })
                }
                <div className="alert alert-info reaction" role="alert">
                    This post has been reacted by {post.reactions} people
                </div>
            </div>
        </div>
    );
}

export default Post;