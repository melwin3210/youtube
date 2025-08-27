import React, { useState } from 'react'

const Comment = ({ avatar, name, time, text, likes, replies }) => {
    const [showReplies, setShowReplies] = useState(false)

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
                    <button className='flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded'>
                        <span>👍</span>
                        <span>{likes}</span>
                    </button>
                    <button className='flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded'>
                        <span>👎</span>
                    </button>
                    <button className='hover:bg-gray-100 px-2 py-1 rounded'>Reply</button>
                </div>
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
                                    <Comment key={index} {...reply} />
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
    const [comments] = useState([
        {
            avatar: 'https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj',
            name: 'John Doe',
            time: '2 hours ago',
            text: 'Great video! Really helpful content. Thanks for sharing this.',
            likes: 24,
            replies: [
                {
                    avatar: 'https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj',
                    name: 'Jane Smith',
                    time: '1 hour ago',
                    text: 'I agree! This was exactly what I was looking for.',
                    likes: 5,
                    replies: [
                        {
                            avatar: 'https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj',
                            name: 'Jane Smith',
                            time: '1 hour ago',
                            text: 'I agree! This was exactly what I was looking for.',
                            likes: 5
                        }
                    ]
                }
            ]
        },
        {
            avatar: 'https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj',
            name: 'Mike Johnson',
            time: '4 hours ago',
            text: 'Could you make a follow-up video on this topic? Would love to see more advanced techniques.',
            likes: 12
        },
        {
            avatar: 'https://yt3.ggpht.com/a/default-user=s28-c-k-c0x00ffffff-no-rj',
            name: 'Sarah Wilson',
            time: '6 hours ago',
            text: 'Amazing explanation! Finally understood this concept. Keep up the great work! 🔥',
            likes: 8
        }
    ])

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
                {comments.map((comment, index) => (
                    <Comment key={index} {...comment} />
                ))}
            </div>
        </div>
    )
}

export default Comments