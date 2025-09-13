// FIX: Import React for JSX compilation.
import React from 'react';
import { Card, Button, Avatar } from './UI.jsx';
import { ThumbsUpIcon, CommentIcon, ShareIcon, PlusIcon } from './Icons.jsx';

const UserProfileCard = ({ user }) => (
    <Card className="text-center">
        <div className="h-16 bg-cover bg-center" style={{ backgroundImage: `url(${user.bannerUrl})` }}></div>
        <div className="p-4">
            <a href={`#/profile/${user.id}`}>
                <Avatar src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} size="lg" className="-mt-16 mx-auto border-4 border-white" />
            </a>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">{`${user.firstName} ${user.lastName}`}</h3>
            <p className="text-sm text-gray-500">{user.headline}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-3">
            <div className="flex justify-between text-sm text-gray-500">
                <span>Connections</span>
                <span className="font-semibold text-primary">{user.connections}</span>
            </div>
            <p className="text-sm font-semibold text-gray-900 mt-1">Grow your network</p>
        </div>
    </Card>
);

const CreatePost = ({ user, onAddPost }) => {
    const [content, setContent] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onAddPost(content);
            setContent('');
        }
    };

    return (
        <Card className="p-4">
            <form onSubmit={handleSubmit}>
                <div className="flex items-start space-x-4">
                    <Avatar src={user.avatarUrl} alt={user.firstName} />
                    <div className="w-full">
                        <textarea
                            rows={2}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2"
                            placeholder="Start a post"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button type="submit" disabled={!content.trim()}>Post</Button>
                </div>
            </form>
        </Card>
    );
};

const FeedPost = ({ post, users, currentUser, onToggleLike, onAddComment }) => {
    const [commentsVisible, setCommentsVisible] = React.useState(false);
    const [newComment, setNewComment] = React.useState('');
    
    const author = users.find(u => u.id === post.authorId);
    if (!author) return null;

    const isLiked = post.likedBy.includes(currentUser.id);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(post.id, newComment);
            setNewComment('');
        }
    };
    
    const Comment = ({ comment, users }) => {
        const commentAuthor = users.find(u => u.id === comment.authorId);
        if(!commentAuthor) return null;
        return (
            <div className="flex items-start space-x-3 py-3">
                <Avatar src={commentAuthor.avatarUrl} alt={commentAuthor.firstName} size="sm" />
                <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2">
                    <p className="text-sm font-semibold">{`${commentAuthor.firstName} ${commentAuthor.lastName}`}</p>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
            </div>
        );
    };

    return (
        <Card className="mb-4">
            <div className="p-4">
                <div className="flex items-center">
                    <a href={`#/profile/${author.id}`} className="flex items-center">
                        <Avatar src={author.avatarUrl} alt={author.firstName} size="md" />
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-gray-900 hover:underline">{`${author.firstName} ${author.lastName}`}</p>
                            <p className="text-xs text-gray-500">{author.headline}</p>
                            <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                    </a>
                </div>
                <p className="mt-4 text-sm text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>
            {(post.likedBy.length > 0 || post.comments.length > 0) && (
                <div className="px-4 pb-2 flex justify-between items-center text-xs text-gray-500">
                  <div>
                    {post.likedBy.length > 0 && <span className="flex items-center"><ThumbsUpIcon className="h-4 w-4 text-primary mr-1" /> {post.likedBy.length}</span>}
                  </div>
                  <div>
                    {post.comments.length > 0 && <span className="cursor-pointer hover:underline" onClick={() => setCommentsVisible(!commentsVisible)}>{post.comments.length} Comments</span>}
                  </div>
                </div>
            )}
            <div className="px-4 py-2 border-t border-gray-200">
                <div className="flex justify-around">
                    <Button variant="ghost" onClick={() => onToggleLike(post.id)} className={isLiked ? 'text-primary' : 'text-gray-600'}>
                        <ThumbsUpIcon className="h-5 w-5 mr-2"/>Like
                    </Button>
                    <Button variant="ghost" onClick={() => setCommentsVisible(!commentsVisible)} className="text-gray-600">
                        <CommentIcon className="h-5 w-5 mr-2"/>Comment
                    </Button>
                    <Button variant="ghost" className="text-gray-600">
                        <ShareIcon className="h-5 w-5 mr-2"/>Share
                    </Button>
                </div>
            </div>
            {commentsVisible && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="space-y-2">
                        {post.comments.map(comment => <Comment key={comment.id} comment={comment} users={users} />)}
                    </div>
                     <form onSubmit={handleCommentSubmit} className="flex items-start space-x-3 pt-4">
                        <Avatar src={currentUser.avatarUrl} alt={currentUser.firstName} size="sm" />
                        <div className="w-full">
                            <input
                                type="text"
                                className="w-full border-gray-300 rounded-full shadow-sm focus:ring-primary focus:border-primary sm:text-sm py-2 px-3"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </div>
                     </form>
                </div>
            )}
        </Card>
    );
};

const Suggestions = ({ users, currentUser }) => (
    <Card>
        <div className="p-4">
            <h3 className="font-semibold text-md text-gray-900">Add to your feed</h3>
        </div>
        <ul className="divide-y divide-gray-200">
            {users.filter(u => u.id !== currentUser.id).slice(0, 3).map(user => (
                <li key={user.id} className="p-4 flex items-start space-x-3 hover:bg-gray-50">
                    <Avatar src={user.avatarUrl} alt={user.firstName} />
                    <div className="flex-1">
                        <p className="text-sm font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                        <p className="text-xs text-gray-500">{user.headline}</p>
                        <Button variant="secondary" className="mt-2 text-sm px-3 py-1">
                            <PlusIcon className="h-4 w-4 mr-1"/> Follow
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    </Card>
);

export const HomePage = ({ currentUser, users, posts, onAddPost, onToggleLike, onAddComment }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <aside className="hidden md:block md:col-span-1 lg:col-span-1">
                <UserProfileCard user={currentUser} />
            </aside>
            <main className="md:col-span-3 lg:col-span-3 space-y-4">
                <CreatePost user={currentUser} onAddPost={onAddPost} />
                {posts.map(post => 
                    <FeedPost 
                        key={post.id} 
                        post={post} 
                        users={users} 
                        currentUser={currentUser}
                        onToggleLike={onToggleLike}
                        onAddComment={onAddComment}
                    />
                )}
            </main>
            <aside className="hidden lg:block lg:col-span-1">
              <Suggestions users={users} currentUser={currentUser} />
            </aside>
        </div>
    );
};