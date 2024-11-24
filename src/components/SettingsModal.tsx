import React from 'react';
import { X } from 'lucide-react';
import { ObfuscationConfig } from '../utils/obfuscation';

interface SettingsModalProps {
  config: ObfuscationConfig;
  setConfig: (config: ObfuscationConfig) => void;
  presets: Record<string, ObfuscationConfig>;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  config,
  setConfig,
  presets,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black rounded-lg p-6 max-w-md w-full mx-4 border border-purple-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-100">Style Settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-purple-900/50 transition-colors"
          >
            <X className="w-5 h-5 text-purple-200" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.useTitle}
                onChange={(e) =>
                  setConfig({ ...config, useTitle: e.target.checked })
                }
                className="w-4 h-4 rounded border-purple-500 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-purple-100">Add Decorative Frame ༺...༻</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.useNumbers}
                onChange={(e) =>
                  setConfig({ ...config, useNumbers: e.target.checked })
                }
                className="w-4 h-4 rounded border-purple-500 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-purple-100">L33t Numbers</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.useSpecialChars}
                onChange={(e) =>
                  setConfig({ ...config, useSpecialChars: e.target.checked })
                }
                className="w-4 h-4 rounded border-purple-500 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-purple-100">Special Characters</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={config.useSymbols}
                onChange={(e) =>
                  setConfig({ ...config, useSymbols: e.target.checked })
                }
                className="w-4 h-4 rounded border-purple-500 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-purple-100">Add Separators</span>
            </label>

            {config.useSymbols && (
              <div className="ml-7">
                <label className="block text-sm text-purple-200 mb-2">
                  Separator Character
                </label>
                <input
                  type="text"
                  value={config.separator}
                  onChange={(e) =>
                    setConfig({ ...config, separator: e.target.value.charAt(0) })
                  }
                  maxLength={1}
                  className="bg-black text-purple-100 rounded px-3 py-2 w-20 border border-purple-600 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 outline-none"
                />
              </div>
            )}
          </div>

          <div className="border-t border-purple-700 pt-6">
            <h3 className="text-lg font-semibold text-purple-100 mb-3">
              Style Presets
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(presets).map(([name, preset]) => (
                <button
                  key={name}
                  onClick={() => setConfig(preset)}
                  className="px-4 py-2 rounded bg-purple-900/50 hover:bg-purple-800/50 text-purple-100 transition-colors border border-purple-700/50"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;