import { useRef } from "react";
import "./CreatePost.css";
import { useContext } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

    const {addPost} = useContext(PostList);
    const navigate = useNavigate();

    const userIdElement = useRef();
    const titleElement = useRef();
    const bodyElement = useRef();
    const reactionsElement = useRef();
    const tagsElement = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = userIdElement.current.value;
        const title = titleElement.current.value;
        const body = bodyElement.current.value;
        const reactions = reactionsElement.current.value;
        const tags = tagsElement.current.value.split(" ");

        addPost(userId, title, body, reactions, tags);
        navigate("/");

        userIdElement.current.value = "";
        titleElement.current.value = "";
        bodyElement.current.value = "";
        reactionsElement.current.value = "";
        tagsElement.current.value = "";
    }

    return (
        <form className="create-post" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="userId" className="form-label">User Id</label>
                <input type="text" className="form-control" id="userId" placeholder="Enter your User Id" ref={userIdElement}/>
            </div>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Post Title</label>
                <input type="text" className="form-control" id="title" placeholder="How are you feeling today..." ref={titleElement}/>
            </div>
            <div className="mb-3">
                <label htmlFor="body" className="form-label">Post Content</label>
                <textarea rows="4" type="text" className="form-control" id="body" placeholder="Tell us more about it" ref={bodyElement}/>
            </div>
            <div className="mb-3">
                <label htmlFor="reactions" className="form-label">Number of users Reacted</label>
                <input type="number" className="form-control" id="reactions" placeholder="How many people reacted to this post" ref={reactionsElement}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input type="text" className="form-control" id="tags" placeholder="Enter your tags for the post using spaces" ref={tagsElement}/>
            </div>
            <button type="submit" className="btn btn-primary">Post</button>
        </form>
    );
}

export default CreatePost;