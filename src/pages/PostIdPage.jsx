import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPost, isPostLoading, postError] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (postId) => {
        const response = await PostService.getCommentsByPostId(postId);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPost(params.id);
        fetchComments(params.id);
    }, []);

    return (
        <div>
            <h1>Post Page</h1>
            {isPostLoading
                ? <Loader/>
                : <div>{post.id}. {post.body}</div>
            }
            <h1>Comments</h1>
            {isCommentsLoading
                ? <Loader/>
                : <div>
                    {comments.map(comment =>
                        <div key={comment.id} style={{marginTop: 15}}>
                            <h5>{comment.email}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;
