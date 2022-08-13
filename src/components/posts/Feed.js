import Post from './Post';

function Feed({ posts }) {
    return (
        posts.map((post, index) => (
            <Post 
                key={index}
                authorName={post.authorName}
                authorPicture={post.authorPicture}
                description={post.description}
                liked={post.liked}
                likes={post.likes}
                metadata={post.metadata}
                postId={post.postId}
            />
        ))
    );
}

export default Feed;
