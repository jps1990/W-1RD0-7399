import { useState, useEffect, useCallback, useRef } from 'react';
import { Settings, Copy, Wand2, Zap } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import SettingsModal from './components/SettingsModal';
import MatrixRain from './components/MatrixRain';
import { ObfuscationConfig, defaultConfig, presets, applyStyle } from './utils/obfuscation';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [config, setConfig] = useState<ObfuscationConfig>(defaultConfig);
  
  // 🌪️ Nouveau state pour le mode chaos
  const [chaosLevel, setChaosLevel] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('bg-black');
  const [textRotation, setTextRotation] = useState(0);
  
  // 🌧️ Nouveau state pour Matrix Rain et bouton dynamique
  const [isMatrixRainActive, setIsMatrixRainActive] = useState(false);
  const [clickHereText, setClickHereText] = useState('CLICK HERE');
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Fonction pour générer une position aléatoire
  const generateRandomPosition = useCallback(() => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const container = containerRef.current;
    const maxX = container.clientWidth - 120; // largeur du bouton
    const maxY = container.clientHeight - 50; // hauteur du bouton

    return {
      x: Math.max(0, Math.min(maxX, Math.random() * maxX)),
      y: Math.max(0, Math.min(maxY, Math.random() * maxY))
    };
  }, []);

  // Effet pour déplacer le bouton périodiquement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setButtonPosition(generateRandomPosition());
    }, 3000 + Math.random() * 2000); // Entre 3 et 5 secondes

    return () => clearInterval(moveInterval);
  }, [generateRandomPosition]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fonction pour générer un style aléatoire
  const generateRandomStyle = useCallback(() => {
    const availableStyles = Object.keys(presets).filter(
      key => key !== 'Gothic Royal' && key !== 'Elegant Script'
    );
    const randomStyleName = availableStyles[Math.floor(Math.random() * availableStyles.length)];
    return presets[randomStyleName];
  }, []);

  const handleObfuscate = (text: string, newConfig?: ObfuscationConfig) => {
    const configToUse = newConfig || generateRandomStyle();
    setConfig(configToUse);
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

  // 🌪️ Nouvelle fonction de mode chaos
  const triggerChaos = useCallback(() => {
    const newChaosLevel = chaosLevel + 1;
    setChaosLevel(newChaosLevel);

    // Des effets de chaos de plus en plus intenses
    switch (true) {
      case newChaosLevel === 3:
        setBackgroundColor('bg-gradient-to-r from-purple-900 to-pink-900 chaos-pulse');
        break;
      case newChaosLevel === 5:
        setTextRotation(Math.random() * 360);
        break;
      case newChaosLevel > 7:
        // Mode ULTRA CHAOS 🤯
        setBackgroundColor('bg-gradient-to-r from-red-900 to-yellow-900 chaos-spin');
        break;
    }

    // Reset du chaos après un certain temps
    if (newChaosLevel > 10) {
      setTimeout(() => {
        setChaosLevel(0);
        setBackgroundColor('bg-black');
        setTextRotation(0);
      }, 3000);
    }
  }, [chaosLevel]);

  // 🌧️ Fonction pour le bouton "Click Here"
  const handleClickHere = () => {
    setIsMatrixRainActive(!isMatrixRainActive);
    
    setClickHereText(isMatrixRainActive ? 'CLICK HERE' : 'MATRIX MODE');
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  // Filtrer les presets pour supprimer les modes commentés
  const availablePresets = Object.fromEntries(
    Object.entries(presets).filter(([key]) => 
      !['Gothic Royal', 'Elegant Script', 'Math Bold', 'Script Bold', 'Monospace'].includes(key)
    )
  );

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen ${backgroundColor} transition-all duration-500 relative overflow-hidden`}
    >
      {/* 🌧️ Composant Matrix Rain */}
      <MatrixRain isActive={isMatrixRainActive} />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Bouton "Click Here" complètement fou et mobile */}
        <div 
          className="button-absolute-position"
          style={{ 
            left: `${buttonPosition.x}px`, 
            top: `${buttonPosition.y}px` 
          }}
        >
          <button 
            onClick={handleClickHere}
            className="click-here-button"
            aria-label="Toggle Matrix Rain"
          >
            {clickHereText}
          </button>
        </div>

        <header className="flex justify-between items-center mb-8">
          <h1 
            className={`text-4xl font-bold text-purple-100 tracking-wider font-mono dynamic-title special-char-title`}
            style={{ 
              transform: `rotate(${textRotation}deg)` 
            }}
          >
            <span className="special-char">W</span>
            <span className="special-char text-green-400">Ξ</span>
            <span className="special-char">1RD0</span> 
            <span className="text-purple-400 special-char">7399</span>
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={triggerChaos}
              className="p-2 rounded-full hover:bg-purple-900/50 transition-colors"
              title="Activate Chaos Mode"
            >
              <Zap className="w-6 h-6 text-yellow-400" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full hover:bg-purple-900/50 transition-colors"
              title="Open Settings"
            >
              <Settings className="w-6 h-6 text-purple-200" />
            </button>
          </div>
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
            {Object.entries(availablePresets).map(([name, preset]) => (
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