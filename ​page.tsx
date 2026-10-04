'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, VolumeX, MessageSquare, 
  Users, Gift, Heart, Shield, Crown, Sparkles, 
  Settings, LogOut, Send, Smile, Flame, Music, Radio
} from 'lucide-react';

export default function CuteKingApp() {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [activeTab, setActiveTab] = useState('live');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Cute Queen', text: 'Welcome everyone to Cute King Live! 💕', type: 'chat' },
    { id: 2, user: 'Prince Charming', text: 'Hey King! Loving the dark glass theme ✨', type: 'chat' },
    { id: 3, user: 'Angel Heart', text: 'Sent a 👑 Crown to the stage!', type: 'gift' }
  ]);
  const [inputText, setInputText] = useState('');
  const [listenersCount, setListenersCount] = useState(142);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Simulated live audio visualizer waves
  const [audioWaves, setAudioWaves] = useState([40, 70, 30, 90, 50, 60, 30, 80]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAudioPlaying || isMicOn) {
        setAudioWaves(Array.from({ length: 8 }, () => Math.floor(Math.random() * 70) + 30));
      } else {
        setAudioWaves([10, 10, 10, 10, 10, 10, 10, 10]);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isAudioPlaying, isMicOn]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { id: Date.now(), user: 'You (King)', text: inputText, type: 'chat' }]);
    setInputText('');
  };

  const toggleRadioStream = () => {
    setIsAudioPlaying(!isAudioPlaying);
    if (!isAudioPlaying) {
      if (!audioRef.current) {
        audioRef.current = new Audio('https://stream.zeno.fm/f3wvbbqmdg8uv');
      }
      audioRef.current.play().catch(() => {
        // Fallback if browser blocks autoplay or stream fails
        console.log("Audio stream simulation active");
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black text-white font-sans flex flex-col selection:bg-pink-500 selection:text-white">
      
      {/* Top Header */}
      <header className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 p-0.5 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <div className="w-full h-full bg-gray-950 rounded-[14px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-pink-400 animate-pulse" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-gray-950 rounded-full animate-ping"></span>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-gray-950 rounded-full"></span>
          </div>
          <div>
            <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 text-lg tracking-wide">
              CUTE KING
            </h1>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase font-medium">Live Voice Lounge</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="backdrop-blur-md bg-white/10 border border-white/10 px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-xs text-pink-300 shadow-inner">
            <Users className="w-3.5 h-3.5" />
            <span className="font-bold">{listenersCount}</span>
          </div>
          <button className="p-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/10 hover:bg-white/20 transition-all text-gray-300 hover:text-white">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-4 pb-24">
        
        {/* Left/Center Section: Stage & 4-Column Grid */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          
          {/* Main Stage Banner / Audio Visualizer */}
          <div className="relative rounded-3xl backdrop-blur-xl bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-indigo-900/40 border border-white/15 p-6 overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-2">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>LIVE BROADCASTING</span>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Royal Voice Room</h2>
                <p className="text-sm text-gray-300 mt-1">Unrestricted high-definition audio chat and chill vibes.</p>
              </div>

              {/* Visualizer Waves */}
              <div className="flex items-center space-x-1.5 bg-black/40 px-4 py-3 rounded-2xl border border-white/10">
                {audioWaves.map((height, idx) => (
                  <div 
                    key={idx} 
                    style={{ height: `${height}px` }} 
                    className="w-1.5 bg-gradient-to-t from-pink-500 to-purple-400 rounded-full transition-all duration-150"
                  ></div>
                ))}
              </div>
            </div>

            {/* Quick Radio Stream Toggle */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <Music className="w-4 h-4 text-pink-400" />
                <span>Lounge Background Beats</span>
              </div>
              <button 
                onClick={toggleRadioStream}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center space-x-1.5 ${
                  isAudioPlaying 
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-red-500/30' 
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/30 hover:opacity-90'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{isAudioPlaying ? 'Stop Beats' : 'Play Beats'}</span>
              </button>
            </div>
          </div>

          {/* Speakers 4-Column Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-sm font-bold tracking-wide uppercase text-gray-400 flex items-center space-x-2">
                <Users className="w-4 h-4 text-pink-400" />
                <span>Active Speakers (4-Grid)</span>
              </h3>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                HD Audio Open
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Cute King', role: 'Host', avatar: '👑', active: true },
                { name: 'Queen Bella', role: 'Co-Host', avatar: '💖', active: false },
                { name: 'Shadow Knight', role: 'Speaker', avatar: '⚡', active: true },
                { name: 'Ruby Rose', role: 'Speaker', avatar: '🌹', active: false },
              ].map((speaker, idx) => (
                <div 
                  key={idx} 
                  className={`backdrop-blur-xl bg-white/5 border ${speaker.active ? 'border-pink-500/50 shadow-lg shadow-pink-500/10' : 'border-white/10'} rounded-2xl p-4 flex flex-col items-center justify-between relative group hover:bg-white/10 transition-all`}
                >
                  {speaker.active && (
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-pink-500 rounded-full animate-ping"></span>
                  )}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-white/20 flex items-center justify-center text-3xl shadow-inner mb-3">
                    {speaker.avatar}
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-sm text-white truncate max-w-[110px]">{speaker.name}</h4>
                    <p className="text-[11px] text-pink-300 font-medium">{speaker.role}</p>
                  </div>
                  <div className="mt-3 flex items-center space-x-1.5">
                    <span className={`w-2 h-2 rounded-full ${speaker.active ? 'bg-emerald-400' : 'bg-gray-500'}`}></span>
                    <span className="text-[10px] text-gray-400">{speaker.active ? 'Speaking' : 'Muted'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Section: Live Chat & Interactions */}
        <div className="lg:col-span-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col h-[450px] lg:h-auto shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="font-bold text-sm text-gray-200 flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-purple-400" />
              <span>Live Chat Stream</span>
            </h3>
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
          </div>

          {/* Messages Box */}
          <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => (
              <div key={msg.id} className="text-xs backdrop-blur-md bg-white/5 border border-white/5 rounded-xl p-2.5">
                <span className="font-bold text-pink-400 block mb-0.5">{msg.user}</span>
                <p className="text-gray-200 leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex items-center space-x-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Send message to room..."
              className="flex-1 bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-all"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-pink-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </main>

      {/* Bottom Floating Control Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent">
        <div className="max-w-xl mx-auto backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-3 shadow-2xl flex items-center justify-around">
          
          {/* Mic Button */}
          <button 
            onClick={() => setIsMicOn(!isMicOn)}
            className={`flex flex-col items-center space-y-1 p-2.5 rounded-xl transition-all ${
              isMicOn 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {isMicOn ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
            <span className="text-[10px] font-medium">{isMicOn ? 'Unmuted' : 'Mute'}</span>
          </button>

          {/* Deafen Button */}
          <button 
            onClick={() => setIsDeafened(!isDeafened)}
            className={`flex flex-col items-center space-y-1 p-2.5 rounded-xl transition-all ${
              isDeafened 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {isDeafened ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span className="text-[10px] font-medium">{isDeafened ? 'Deafened' : 'Audio'}</span>
          </button>

          {/* Send Gift Button */}
          <button 
            onClick={() => {
              setMessages(prev => [...prev, { id: Date.now(), user: 'System', text: '👑 You sent a Royal Crown gift to the room!', type: 'gift' }]);
            }}
            className="flex flex-col items-center space-y-1 p-2.5 rounded-xl bg-gradient-to-tr from-amber-500/20 to-pink-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 transition-all shadow-lg shadow-amber-500/10"
          >
            <Gift className="w-5 h-5 animate-bounce" />
            <span className="text-[10px] font-medium">Gift</span>
          </button>

          {/* Leave/Disconnect Button */}
          <button 
            onClick={() => alert('Leaving room session.')}
            className="flex flex-col items-center space-y-1 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-medium">Leave</span>
          </button>

        </div>
      </footer>

    </div>
  );
}
