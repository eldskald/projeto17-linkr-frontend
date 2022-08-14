import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';
import Post from './Post';

function Feed({ posts, loading, error }) {
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
                    authorName={post.authorName}
                    authorPicture={post.authorPicture}
                    description={post.description}
                    liked={post.liked}
                    likes={post.likes}
                    metadata={post.metadata}
                    postId={post.postId}
                    authorId={post.authorId}
                />
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 612px) {
        min-width: 100%;
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
    text-alignment: center;
    color: var(--contrastcolor2);
`;

export default Feed;
