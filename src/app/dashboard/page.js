"use client";
import React, { useState, useEffect } from 'react';
import { mockDb } from '@/services/mockDb';
import { Mail, Check, Trash2, Calendar, User, Eye, Layers } from 'lucide-react';

const MessagesInbox = () => {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    projectsCount: 0,
    servicesCount: 0,
    totalMessages: 0,
    unreadMessages: 0
  });
  const [activeMessage, setActiveMessage] = useState(null);

  const loadData = () => {
    const allMessages = mockDb.getMessages();
    const allProjects = mockDb.getProjects();
    const allServices = mockDb.getServices();

    setMessages(allMessages);
    setStats({
      projectsCount: allProjects.length,
      servicesCount: allServices.length,
      totalMessages: allMessages.length,
      unreadMessages: allMessages.filter(m => !m.read).length
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRead = (id) => {
    mockDb.markMessageRead(id);
    loadData();
    const updatedMsg = mockDb.getMessages().find(m => m.id === id);
    setActiveMessage(updatedMsg);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      mockDb.deleteMessage(id);
      if (activeMessage && activeMessage.id === id) {
        setActiveMessage(null);
      }
      loadData();
    }
  };

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Overview Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">Dashboard Overview</h1>
        <p className="text-xs text-slate-505 dark:text-slate-400 mt-1">Real-time statistics and customer messages inbox.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Unread Messages</span>
          <span className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-2">{stats.unreadMessages}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Total Messages</span>
          <span className="text-3xl font-extrabold text-slate-705 dark:text-slate-350 mt-2">{stats.totalMessages}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Total Projects</span>
          <span className="text-3xl font-extrabold text-slate-705 dark:text-slate-350 mt-2">{stats.projectsCount}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Active Services</span>
          <span className="text-3xl font-extrabold text-slate-705 dark:text-slate-350 mt-2">{stats.servicesCount}</span>
        </div>
      </div>

      {/* Inbox Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Messages List Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
            <Mail size={18} className="text-purple-500" />
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-200">Contact Inbox</h2>
          </div>

          {messages.length > 0 ? (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleRead(msg.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    activeMessage && activeMessage.id === msg.id
                      ? 'border-purple-500 bg-purple-500/5'
                      : !msg.read
                      ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-semibold'
                      : 'border-slate-200 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{msg.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">{formatDate(msg.date)}</span>
                  </div>
                  <h3 className="text-xs text-purple-650 dark:text-purple-400 mt-1 line-clamp-1">{msg.subject}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-450 mt-1.5 line-clamp-1 font-normal">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl text-center space-y-2">
              <span className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full"><Mail size={24} /></span>
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-350">Inbox Empty</h4>
              <p className="text-[11px] text-slate-505 dark:text-slate-450">No submissions received via contact forms yet.</p>
            </div>
          )}
        </div>

        {/* Message Detail View Column */}
        <div className="lg:col-span-1">
          {activeMessage ? (
            <div className="p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5 text-left animate-slide-up">
              {/* Header Info */}
              <div className="pb-4 border-b border-slate-250/50 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">Message Detail</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-550 flex items-center gap-1">
                    <Calendar size={10} />
                    {formatDate(activeMessage.date)}
                  </span>
                </div>
                
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">
                  {activeMessage.subject}
                </h3>
              </div>

              {/* Sender Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <User size={13} className="text-slate-400 shrink-0" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">{activeMessage.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={13} className="text-slate-400 shrink-0" />
                  <a href={`mailto:${activeMessage.email}`} className="text-purple-650 dark:text-purple-400 font-semibold hover:underline">
                    {activeMessage.email}
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-900 text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-normal whitespace-pre-wrap">
                {activeMessage.message}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {!activeMessage.read && (
                  <button
                    onClick={() => handleRead(activeMessage.id)}
                    className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all cursor-pointer"
                  >
                    <Check size={12} />
                    Mark Read
                  </button>
                )}
                
                <button
                  onClick={() => handleDelete(activeMessage.id)}
                  className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg text-[11px] font-bold text-red-655 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all cursor-pointer"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>

            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 text-center py-16 text-slate-400 dark:text-slate-600">
              <Eye size={28} className="mx-auto mb-2 text-slate-350 dark:text-slate-700" />
              <p className="text-xs">Select a message from inbox list to view details.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default MessagesInbox;
