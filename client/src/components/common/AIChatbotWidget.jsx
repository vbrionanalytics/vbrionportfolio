import React, { useState, useRef, useEffect } from 'react';
import siteConfig from '../../config/siteConfig';
import { Bot, X, Send, Sparkles, ArrowRight, MessageSquare, ShieldCheck, Activity } from 'lucide-react';

export default function AIChatbotWidget({ onSelectServiceForContact }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Greetings. I am the vbrion foresight advisor. How can I guide you through our consulting practices or data engineering solutions today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!siteConfig.featureFlags.enableAiAssistant) {
    return null;
  }

  const handleSend = async (customText = null) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsTyping(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const res = await fetch(`${apiUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'assistant',
            text: data.reply,
            action: data.suggestedAction
          }
        ]);
      } else {
        throw new Error('API reply missing');
      }
    } catch (err) {
      // Local fallback engine in case server isn't reachable
      setTimeout(() => {
        let fallbackReply = "vbrion analytics specializes across 11 key service lines, including Risk & Governance, Legal Compliances, and advanced AI engineering for Fintech and Healthcare. You can reach our team at +91 7718079297 or info@vbrion.com.";
        const q = textToSend.toLowerCase();

        if (q.includes('risk') || q.includes('govern') || q.includes('legal')) {
          fallbackReply = "Our Consulting Services practice leads enterprise Risk & Governance frameworks and Legal Compliance audits. Would you like to submit an inquiry through our contact form?";
        } else if (q.includes('ai') || q.includes('fintech') || q.includes('health') || q.includes('data')) {
          fallbackReply = "Our Analytical Solutions engineering team builds streaming fraud models, clinical EHR lakehouses, and Basel III/IV risk stress-testing platforms. You can review our case studies or connect directly with our engineers.";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'assistant',
            text: fallbackReply,
            action: 'contact_form'
          }
        ]);
      }, 500);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRouteToContact = () => {
    setIsOpen(false);
    const elem = document.getElementById('contact');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-xl transition-all duration-300 hover:scale-105 group"
          aria-label="Open vbrion AI Advisor"
        >
          <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-xs font-semibold tracking-wide pr-1 text-slate-800">
            Foresight Advisor
          </span>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-montserrat font-bold text-slate-900 flex items-center gap-1.5">
                  vbrion AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="text-[10px] text-indigo-600 uppercase tracking-wider font-semibold">
                  Service &amp; Solution Navigator
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-slate-50/70 border-b border-slate-200 flex gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSend("What consulting services do you offer?")}
              className="px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 transition-colors shadow-xs"
            >
              Consulting Practices
            </button>
            <button
              onClick={() => handleSend("Tell me about your AI & Analytics solutions")}
              className="px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 transition-colors shadow-xs"
            >
              AI &amp; Analytics
            </button>
            <button
              onClick={() => handleSend("How can I contact vbrion?")}
              className="px-2.5 py-1 rounded-full text-[10px] whitespace-nowrap bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 transition-colors shadow-xs"
            >
              Contact Desk
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#FAFAFC]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {m.text}
                </div>

                {/* Inline Action for routing to contact */}
                {m.sender === 'assistant' && (
                  <button
                    onClick={handleRouteToContact}
                    className="mt-1.5 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Route enquiry to contact form</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1 text-slate-400 text-xs p-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce delay-200" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about vbrion services or tech..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105 active:scale-95 transition-all disabled:opacity-40 shadow-sm"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
