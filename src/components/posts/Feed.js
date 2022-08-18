import { useContext } from 'react';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import Post from './Post';
import UserContext from '../../shared/userContext';

function Feed({ posts, loading, error, reloadFeed }) {
    const { user } = useContext(UserContext);

    return (
        <Container>
            <SpinnerWrapper loading={loading}>
                <ClipLoader
                    color={'var(--contrastcolor1)'}
                    size={150}
                />
            </SpinnerWrapper>
            {error ? (
                <ErrorContainer>
                    Failed to load!<br/>
                    Try refreshing.
                </ErrorContainer>
            ) : (<></>) }
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

const SpinnerWrapper = styled.div`
    margin-top: 64px;
    display: ${props => props.loading ? 'block' : 'none'};
`;

const ErrorContainer = styled.div`
    margin-top: 32px;
    font-family: var(--scriptfont);
    font-size: 20px;
    text-align: center;
    color: var(--contrastcolor2);
`;

export default Feed;
