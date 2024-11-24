import React, { useState, useEffect } from 'react';
import { Settings, Copy, Wand2 } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import SettingsModal from './components/SettingsModal';
import { ObfuscationConfig, defaultConfig, presets, applyStyle } from './utils/obfuscation';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState<ObfuscationConfig>(defaultConfig);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleObfuscate = (text: string, newConfig?: ObfuscationConfig) => {
    const configToUse = newConfig || config;
    setOutput(applyStyle(text, configToUse));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePresetClick = (preset: ObfuscationConfig) => {
    setConfig(preset);
    handleObfuscate(input, preset);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-100 tracking-wider">
            WΞ1RD0 <span className="text-purple-400">7399</span>
          </h1>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full hover:bg-purple-900/50 transition-colors"
          >
            <Settings className="w-6 h-6 text-purple-200" />
          </button>
        </header>

        <div className="grid lg:grid-cols-[1fr,auto,1fr] gap-6">
          {/* Input Panel */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-purple-700/50">
            <h2 className="text-xl text-purple-200 mb-4">Input Text</h2>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleObfuscate(e.target.value);
              }}
              className="w-full h-64 bg-black/50 text-purple-100 rounded-lg p-4 border border-purple-600/50 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none resize-none"
              placeholder="Enter your text here..."
            />
          </div>

          {/* Presets Panel */}
          <div className="flex lg:flex-col gap-2 justify-center items-center">
            {Object.entries(presets).map(([name, preset]) => (
              <button
                key={name}
                onClick={() => handlePresetClick(preset)}
                className={`px-4 py-2 rounded transition-all transform hover:scale-105
                  ${config === preset 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50' 
                    : 'bg-purple-900/50 text-purple-100 hover:bg-purple-800/50'
                  } border border-purple-700/50 whitespace-nowrap`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Output Panel */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-purple-700/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-purple-200">Styled Result</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleObfuscate(input)}
                  className="p-2 rounded-full hover:bg-purple-900/50 transition-colors"
                  title="Generate New Style"
                >
                  <Wand2 className="w-5 h-5 text-purple-200" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-full hover:bg-purple-900/50 transition-colors"
                  title="Copy to Clipboard"
                >
                  <Copy className="w-5 h-5 text-purple-200" />
                </button>
              </div>
            </div>
            <div className="w-full h-64 bg-black/50 text-purple-100 rounded-lg p-4 border border-purple-600/50 overflow-auto flex items-center justify-center text-2xl">
              {output}
            </div>
          </div>
        </div>
      </div>

      {showSettings && (
        <SettingsModal
          config={config}
          setConfig={(newConfig) => {
            setConfig(newConfig);
            handleObfuscate(input, newConfig);
          }}
          presets={presets}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;