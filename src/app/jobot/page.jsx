'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton, SignOutButton, useUser } from '@clerk/nextjs';

function App() {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState([]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const chatEndRef = useRef(null);
    const buttonRef = useRef(null);
    const apiKey = 'AIzaSyAXtVT_rV3-Nh-FvM6-m6ma9wuf1mJzO7U';

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            buttonRef.current.click();
        }
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [conversation, generatingAnswer]);

    async function generateAnswer(e) {
        e.preventDefault();
        setGeneratingAnswer(true);
        const newConversation = [
            ...conversation,
            { type: 'question', text: question, timestamp: new Date() },
        ];
        setConversation(newConversation);
        setQuestion('');

        const isJobRelated = checkIfJobRelated(question);
        const isGreeting = checkIfGreeting(question);

        if (!isJobRelated && !isGreeting) {
            setConversation([
                ...newConversation,
                {
                    type: 'answer',
                    text: 'Sorry, I specialize in job-related queries and greetings. Please ask me about jobs, job opportunities, career tips, or greet me with a hello, hi, or good morning!',
                    timestamp: new Date(),
                },
            ]);
            setGeneratingAnswer(false);
            return;
        }

        try {
            let responseText = '';

            if (isJobRelated) {
                const response = await axios({
                    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
                    method: 'post',
                    data: {
                        contents: [{ parts: [{ text: question }] }],
                    },
                });

                responseText = response.data.candidates[0].content.parts[0].text;
            } else if (isGreeting) {
                responseText = getGreetingResponse(question);
            }

            setConversation([
                ...newConversation,
                { type: 'answer', text: responseText, timestamp: new Date() },
            ]);
        } catch (error) {
            console.log(error);
            setConversation([
                ...newConversation,
                {
                    type: 'answer',
                    text: 'Sorry - Something went wrong. Please try again!',
                    timestamp: new Date(),
                },
            ]);
        }

        setGeneratingAnswer(false);
    }

    function checkIfJobRelated(question) {
        const jobKeywords = [
            'job', 'career', 'employment', 'opportunity', 'work', 'interview', 'resume', 'cover letter', 'linkedin', 'glassdoor', 'indeed', 'web development', 'full stack development', 'mern stack development', 'python developer', 'software engineer', 'data analyst', 'project manager', 'graphic designer', 'web designer', 'marketing', 'finance', 'accounting', 'human resources', 'customer service', 'sales', 'networking', 'remote work', 'job search', 'job market', 'job fair', 'career growth', 'professional development', 'salary negotiation', 'job satisfaction', 'job security', 'job interview tips', 'job application', 'job posting', 'job description', 'job opening', 'job offer', 'job listing', 'job vacancy', 'job portal', 'job board', 'job site', 'job alert', 'job application process', 'job hunting', 'job application letter', 'job seeker', 'javascript', 'python', 'game development', 'unity', 'job search engine', 'job market analysis', 'job market trends', 'job market research', 'job market statistics', 'job market outlook', 'job market forecast', 'job market report', 'job market data', 'job market analysis report', 'job market analysis template', 'job market research report', 'job market research template', 'job market trends report', 'job market trends template', 'job market statistics report', 'job market statistics template', 'job market outlook report', 'job market outlook template', 'job market forecast report', 'job market forecast template', 'job market report template', 'job market data report', 'job market data template', 'job market analysis data', 'job market analysis data report', 'job market analysis data template', 'job market research data', 'job market research data report', 'job market research data template', 'job market trends data', 'job market trends data report', 'job market trends data template', 'job market statistics data', 'job market statistics data report', 'job market statistics data template', 'job market outlook data', 'job market outlook data report', 'job market outlook data template', 'job market forecast data', 'job market forecast data report', 'job market forecast data template', 'help',
        ];

        return jobKeywords.some((keyword) =>
            question.toLowerCase().includes(keyword)
        );
    }

    function checkIfGreeting(input) {
        const greetings = [
            'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'good night', 'bye', 'goodbye', 'greetings', 'howdy', 'hey there', 'hi there', "what's up", 'yo', 'hiya', 'morning', 'evening', 'night', 'later', 'see you', 'take care', 'farewell', 'until next time', 'cya', 'later alligator', 'adios', 'cheerio', 'ta-ta', 'so long', 'take it easy', 'toodles',
        ];

        const words = input.toLowerCase().split(' ');

        return words.some((word) => greetings.includes(word));
    }

    function getGreetingResponse(greeting) {
        switch (greeting.toLowerCase()) {
            case 'hi':
            case 'hello':
            case 'hey':
                return 'Hi there! How can I assist you today?';
            case 'good morning':
                return 'Good morning! How can I help you?';
            case 'good afternoon':
                return 'Good afternoon! How can I help you?';
            case 'good evening':
                return 'Good evening! How can I help you?';
            case 'good night':
            case 'bye':
            case 'goodbye':
                return 'Goodbye! Have a great day!';
            case 'help':
                return 'I\'m here to help you, tell me what you need...';
            default:
                return '';
        }
    }

    return (
        <ClerkProvider>
            <div className="bg-pink-900 min-h-screen flex flex-col items-center justify-center">
                <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
                    <header className="bg-pink-600 text-red text-center p-4 flex justify-between items-center">


                        <h1 className="text-2xl font-bold">Beta</h1>
                        <SignOutButton>
                            <button className="bg-white-600 text-red py-1 px-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 hover:bg-red-700">
                                Logout
                            </button>
                        </SignOutButton>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4" id="chat-container">
                        {conversation.map((message, index) => (
                            <div
                                key={index}
                                className={`my-2 p-3 max-w-xs rounded-lg ${message.type === 'question'
                                    ? 'bg-pink-400 text-white self-end ml-auto'
                                    : 'bg-gray-200 text-gray-900 self-start mr-auto'
                                    }`}
                                style={{
                                    alignSelf: message.type === 'question' ? 'flex-end' : 'flex-start',
                                    borderRadius: message.type === 'question' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                }}
                            >
                                <ReactMarkdown className="prose prose-sm">{message.text}</ReactMarkdown>
                                <p className="text-xs text-white-500 mt-1">{message.timestamp.toLocaleString()}</p>
                            </div>
                        ))}
                        {generatingAnswer && (
                            <div className="my-2 p-3 max-w-xs bg-gray-200 text-gray-900 self-start rounded-lg">
                                <ReactMarkdown className="prose prose-sm">Typing...</ReactMarkdown>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <footer className="p-4 bg-gray-100">
                        <div className="flex">
                            <textarea
                                required
                                className="flex-1 border rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about jobs, career or your profession"
                                aria-label="Ask about jobs, career or your profession"
                                style={{ color: 'black' }} // Add this style
                            ></textarea>

                            <button
                                ref={buttonRef}
                                onClick={generateAnswer}
                                className={`bg-pink-600 text-white py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50 ${generatingAnswer ? 'animate-pulse' : 'hover:bg-red-400'
                                    }`}
                                disabled={generatingAnswer}
                            >
                                {generatingAnswer ? 'Generating..' : 'Send'}
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </ClerkProvider>
    );
}

export default App;

