import { useState, useEffect } from 'react';
import './App.css';
import type { Tab } from './types';

function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'New Tab', url: 'https://www.google.com' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [inputUrl, setInputUrl] = useState('https://www.google.com');

  useEffect(() => {
    // Update page title when active tab changes
    const webview = document.querySelector(`webview[data-tab="${activeTabId}"]`) as any;
    
    if (webview) {
      const updateTitle = () => {
        const title = webview.getTitle();
        setTabs(prev => prev.map(tab => 
          tab.id === activeTabId ? { ...tab, title: title || 'New Tab' } : tab
        ));
      };

      webview.addEventListener('page-title-updated', updateTitle);
      return () => webview.removeEventListener('page-title-updated', updateTitle);
    }
  }, [activeTabId]);

  const addNewTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      title: 'New Tab',
      url: 'https://www.google.com'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setInputUrl(newTab.url);
  };

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    if (newTabs.length === 0) {
      addNewTab();
      return;
    }
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
      setInputUrl(newTabs[0].url);
    }
  };

  const handleNavigate = () => {
    let finalUrl = inputUrl.trim();
    
    // Check if it's a search query or URL
    if (!finalUrl.includes('.') && !finalUrl.startsWith('http')) {
      // It's a search query
      finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}`;
    } else if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    
    setTabs(tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, url: finalUrl } : tab
    ));
    setInputUrl(finalUrl);
  };

  const handleBack = () => {
    const webview = document.querySelector(`webview[data-tab="${activeTabId}"]`) as any;
    if (webview?.canGoBack()) webview.goBack();
  };

  const handleForward = () => {
    const webview = document.querySelector(`webview[data-tab="${activeTabId}"]`) as any;
    if (webview?.canGoForward()) webview.goForward();
  };

  const handleRefresh = () => {
    const webview = document.querySelector(`webview[data-tab="${activeTabId}"]`) as any;
    if (webview) webview.reload();
  };

  const handleHome = () => {
    const homeUrl = 'https://www.google.com';
    setTabs(tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, url: homeUrl } : tab
    ));
    setInputUrl(homeUrl);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Tabs Bar */}
      <div className="bg-gray-800 flex items-end gap-0.5 px-2 pt-2">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`group flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer transition-colors ${
              activeTabId === tab.id 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => {
              setActiveTabId(tab.id);
              setInputUrl(tab.url);
            }}
          >
            <span className="text-sm truncate max-w-[150px]">
              {tab.title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-gray-500 rounded px-1.5 py-0.5 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={addNewTab}
          className="px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-t-lg transition-colors"
          title="New Tab"
        >
          +
        </button>
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-900 shadow-lg p-3 flex items-center gap-2">
        <div className="flex gap-1">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300"
            title="Back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleForward}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300"
            title="Forward"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300"
            title="Refresh"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={handleHome}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300"
            title="Home"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 flex items-center bg-gray-800 rounded-full px-4 py-2">
          <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleNavigate()}
            className="flex-1 bg-transparent text-gray-100 focus:outline-none text-sm"
            placeholder="Search or enter website"
          />
        </div>
        
        <button
          onClick={handleNavigate}
          className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
        >
          Go
        </button>
      </div>

      {/* Browser Views */}
      <div className="flex-1 relative bg-white">
        {tabs.map(tab => (
          <webview
            key={tab.id}
            data-tab={tab.id}
            src={tab.url}
            className={`absolute inset-0 w-full h-full ${
              activeTabId === tab.id ? 'block' : 'hidden'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;