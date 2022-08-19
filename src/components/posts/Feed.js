import { useContext } from 'react';
import styled from 'styled-components';
import Post from './Post';
import UserContext from '../../shared/userContext';
import InfiniteScroll from 'react-infinite-scroll-component';

function Feed({ posts, error, reloadFeed, scrollMore }) {
    const { user } = useContext(UserContext);

    return (
        <Container>
            <InfiniteScroll
                dataLength={posts.length}
                next={() => reloadFeed(true)}
                hasMore={scrollMore}
                loader={
                    <EndMessageContainer>
                        <p>Loading...</p>
                    </EndMessageContainer>
                }
                scrollableTarget='scrollable'
                endMessage={
                    <EndMessageContainer>
                        <p>That's all for now!</p>
                    </EndMessageContainer>
                }
            >
                {posts.map((post, index) => (
                <Post 
                    key={index}
                    userId={user.id}
                    authorName={post.authorName}
                    authorPicture={post.authorPicture}
                    description={post.description}
                    liked={post.liked}
                    likes={post.likes}
                    metadata={post.metadata}
                    postId={post.postId}
                    authorId={post.authorId}
                    reposterName={post.reposterId===user.id? "You" : post.reposterName}    
                    reposterId={post.reposterId}
                    reposts={post.repostCount ? post.repostCount : 0}                
                    reloadFeed={reloadFeed}
                    commentCount={post.commentCount}
                />
            ))}
            </InfiniteScroll>
            {error ? (
                <ErrorContainer>
                    Failed to load!<br/>
                    Try refreshing.
                </ErrorContainer>
            ) : (<></>) }
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 612px) {
        width: 100%;
    }
`;

const ErrorContainer = styled.div`
    margin-top: 32px;
    font-family: var(--scriptfont);
    font-size: 20px;
    text-align: center;
    color: var(--contrastcolor2);
`;

const EndMessageContainer = styled.div`
    padding: 4px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    > p {
        font-family: var(--scriptfont);
        font-size: 18px;
        color: var(--textcolor3);
    }
`;

export default Feed;
