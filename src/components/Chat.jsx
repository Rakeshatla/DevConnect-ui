import React, { useState, useEffect, useRef } from "react";

const Chat = () => {
    const [messages, setMessages] = useState([
        { from: "other", text: "Hey 👋", time: "10:25 AM" },
        { from: "me", text: "Hello! How’s your project going?", time: "10:26 AM" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    const sendMessage = () => {
        if (input.trim()) {
            const now = new Date();
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages((prev) => [...prev, { from: "me", text: input, time }]);
            setInput("");
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="h-[calc(100vh-64px)] flex bg-gradient-to-br from-[#2c3e50] to-[#3498db] text-white">

            {/* Sidebar */}
            <div className="w-1/4 bg-black/30 backdrop-blur-sm p-4 hidden md:block">
                <h2 className="text-xl font-bold mb-6">💬 Messages</h2>
                <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/20 hover:bg-white/30 cursor-pointer transition">Suresh</div>
                    <div className="p-3 rounded-xl bg-white/20 hover:bg-white/30 cursor-pointer transition">Pooja</div>
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-sm p-4 rounded-l-2xl">

                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/20">
                    <h3 className="text-lg font-semibold">Rakesh</h3>
                    <span className="text-sm text-green-300">🟢 online</span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2 custom-scrollbar">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-xs px-4 py-2 rounded-2xl relative text-sm shadow-lg ${msg.from === "me"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-gray-800"
                                }`}>
                                {msg.text}
                                <div className="text-[10px] mt-1 text-right opacity-60">{msg.time}</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>

                {/* Input */}
                <div className="flex items-center gap-3 border-t border-white/20 pt-4">
                    <input
                        type="text"
                        value={input}
                        placeholder="Type your message..."
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1 p-3 rounded-xl text-black placeholder-gray-600 focus:outline-none"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
