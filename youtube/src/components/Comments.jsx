import React, { useState } from 'react'
import commentsData from '../constants/comments'

const Comment = ({ avatar, name, time, text, likes, replies, commentId, onAddReply, like }) => {
    const [showReplies, setShowReplies] = useState(false)
    const [showReplyBox, setShowReplyBox] = useState(false)
    const [replyText, setReplyText] = useState('')

    const handleReply = () => {
        if (replyText.trim()) {
            const newReply = {
                id: Date.now(),
                avatar: 'https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj',
                name: 'You',
                time: 'now',
                text: replyText,
                likes: 0
            }
            onAddReply(commentId, newReply)
            setReplyText('')
            setShowReplyBox(false)
            setShowReplies(true)
        }
    }

    return (
        <div className='flex gap-3 mb-4'>
            <img src={avatar} alt='avatar' className='w-10 h-10 rounded-full flex-shrink-0' />
            <div className='flex-1'>
                <div className='flex items-center gap-2 mb-1'>
                    <span className='font-semibold text-sm'>{name}</span>
                    <span className='text-xs text-gray-500'>{time}</span>
                </div>
                <p className='text-sm mb-2'>{text}</p>
                <div className='flex items-center gap-4 text-xs text-gray-600'>
                    <button onClick={() => like(commentId)} className='flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer'>
                        <span>👍</span>
                        <span>{likes}</span>
                    </button>
                    <button className='flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer'>
                        <span>👎</span>
                    </button>
                    <button
                        onClick={() => setShowReplyBox(!showReplyBox)}
                        className='hover:bg-gray-100 px-2 py-1 rounded'
                    >
                        Reply
                    </button>
                </div>

                {showReplyBox && (
                    <div className='mt-3 flex gap-3'>
                        <img
                            src='https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj'
                            alt='Your avatar'
                            className='w-8 h-8 rounded-full flex-shrink-0'
                        />
                        <div className='flex-1'>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder='Add a reply...'
                                className='w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none resize-none p-2 text-sm'
                                rows='2'
                            />
                            <div className='flex justify-end gap-2 mt-2'>
                                <button
                                    onClick={() => {
                                        setShowReplyBox(false)
                                        setReplyText('')
                                    }}
                                    className='px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded'
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReply}
                                    className='px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700'
                                >
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {replies && replies.length > 0 && (
                    <div className='mt-2'>
                        <button
                            onClick={() => setShowReplies(!showReplies)}
                            className='text-blue-600 text-sm font-medium hover:bg-blue-50 px-2 py-1 rounded'
                        >
                            {showReplies ? 'Hide' : 'Show'} {replies.length} replies
                        </button>
                        {showReplies && (
                            <div className='mt-3 ml-4 border-l-2 border-gray-200 pl-4'>
                                {replies.map((reply, index) => (
                                    <Comment key={reply.id || index} {...reply} commentId={reply.id || index} onAddReply={onAddReply} like={like} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

const Comments = () => {
    const [newComment, setNewComment] = useState('')
    const [comments, setComments] = useState(commentsData)

    const updateComment = (commentId, updateFn) => {
        const updateRecursively = (comments) => {
            return comments.map(comment => {
                if (comment.id === commentId) {
                    return updateFn(comment)
                }
                if (comment.replies?.length > 0) {
                    return { ...comment, replies: updateRecursively(comment.replies) }
                }
                return comment
            })
        }
        setComments(updateRecursively(comments))
    }

    const addReplyToComment = (commentId, newReply) => {
        updateComment(commentId, (comment) => ({
            ...comment,
            replies: [...(comment.replies || []), { ...newReply, replies: [] }]
        }))
    }

    const addLikesToComment = (commentId) => {
        updateComment(commentId, (comment) => ({
            ...comment,
            likes: comment.likes + 1
        }))
    }

    return (
        <div className='max-w-4xl  p-4'>
            <div className='mb-6'>
                <h3 className='text-xl font-semibold mb-4'>{comments.length} Comments</h3>

                {/* Add Comment Section */}
                <div className='flex gap-3 mb-6'>
                    <img
                        src='https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj'
                        alt='Your avatar'
                        className='w-10 h-10 rounded-full flex-shrink-0'
                    />
                    <div className='flex-1'>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder='Add a comment...'
                            className='w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none resize-none p-2 text-sm'
                            rows='2'
                        />
                        {newComment && (
                            <div className='flex justify-end gap-2 mt-2'>
                                <button
                                    onClick={() => setNewComment('')}
                                    className='px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded'
                                >
                                    Cancel
                                </button>
                                <button className='px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700'>
                                    Comment
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div>
                {comments.map((comment) => (
                    <Comment key={comment?.id} {...comment} commentId={comment?.id} onAddReply={addReplyToComment} like={addLikesToComment} />
                ))}
            </div>
        </div>
    )
}

export default Comments