import React, { useEffect, useState } from 'react'

const Message = ({ name, text, color }) => {
  return (
    <div className='flex items-start py-1 px-2 hover:bg-gray-50'>
      <span className='text-xs font-semibold mr-2 flex-shrink-0' style={{color}}>
        {name}:
      </span>
      <span className='text-xs text-gray-800 break-words'>{text}</span>
    </div>
  )
}

const Chat = () => {
    const [chatMessages, setChatMessages] = useState([
        { id: 1, name: 'John', text: 'Hello everyone!', color: '#ff6b6b' },
        { id: 2, name: 'Sarah', text: 'Great stream!', color: '#4ecdc4' },
    ]);
    const [userEnteredMessage, setUserEnteredMessage] = useState('');

    const names = ['Alex', 'Emma', 'Mike', 'Lisa', 'Tom', 'Anna', 'Chris', 'Maya']
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']

  useEffect(() => {
    const latestChatFetchInterval = setInterval(() => {
        const randomName = names[Math.floor(Math.random() * names.length)]
        const randomColor = colors[Math.floor(Math.random() * colors.length)]
        const messages = ['Amazing!', 'Love this!', 'So cool!', 'Great content!', 'Awesome!', '🔥🔥🔥', 'Keep it up!', 'Nice!']
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        
        setChatMessages((prevMessages) => {
            const newMessage = { 
                id: new Date().toISOString(), 
                name: randomName,
                text: randomMessage,
                color: randomColor
            };
            const updatedMessages = [...prevMessages, newMessage];
            return updatedMessages.length > 50 ? updatedMessages.slice(10) : updatedMessages;
        });
    }, 2000);
    return () => clearInterval(latestChatFetchInterval);
  }, []);

  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-sm w-90 h-[72%]'>
      <div className='bg-gray-50 px-3 py-2 border-b border-gray-200'>
        <h3 className='text-sm font-semibold text-gray-700'>Live chat</h3>
      </div>
      <div className='h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300'>
        {chatMessages.map((message) => (
          <Message key={message.id} name={message.name} text={message.text} color={message.color} />
        ))}
      </div>
      <div className='border-t border-gray-200 p-2'>
        <form action="" onSubmit={(e) => {
          e.preventDefault();
          if (userEnteredMessage.trim()) {
            setChatMessages((prevMessages) => [
              ...prevMessages,
              {
                id: new Date().toISOString(),
                name: 'You',
                text: userEnteredMessage,
                color: '#000000',
              },
            ]);
            setUserEnteredMessage('');
          }
        }}>
          <input
            type='text'
            placeholder='Say something...'
            className='w-full text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-400'
            value={userEnteredMessage}
            onChange={(e) => setUserEnteredMessage(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}

export default Chat