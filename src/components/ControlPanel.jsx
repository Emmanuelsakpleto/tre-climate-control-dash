import React, { useState } from 'react';

/**
 * Composant ControlPanel - Panneaux de contrôle manuel du système
 * Permet de forcer les modes solaire/compression avec confirmation
 */
const ControlPanel = ({ currentMode, onModeChange }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedMode, setSelectedMode] = useState('');

  const modes = [
    { id: 'solaire', label: 'Solaire Adsorption', color: 'bg-green-600 hover:bg-green-700', icon: '☀️' },
    { id: 'compression', label: 'Compression', color: 'bg-blue-600 hover:bg-blue-700', icon: '❄️' },
    { id: 'hybride', label: 'Hybride', color: 'bg-yellow-600 hover:bg-yellow-700', icon: '⚡' },
    { id: 'auto', label: 'Automatique', color: 'bg-gray-600 hover:bg-gray-700', icon: '🤖' }
  ];

  const handleModeSelection = (mode) => {
    setSelectedMode(mode);
    setShowConfirmation(true);
  };

  const confirmModeChange = () => {
    onModeChange(selectedMode);
    setShowConfirmation(false);
    setSelectedMode('');
  };

  const cancelModeChange = () => {
    setShowConfirmation(false);
    setSelectedMode('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm">
          🎛️
        </span>
        Contrôle Manuel
      </h2>
      
      {/* Mode actuel avec indicateur visuel */}
      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600 mb-1 font-medium">Mode actuel:</div>
            <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {currentMode}
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-4xl opacity-60">
            {modes.find(m => m.label.includes(currentMode.split(' ')[0]))?.icon || '⚙️'}
          </div>
        </div>
      </div>
      
      {/* Sélection des modes avec animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {modes.map((mode, index) => (
          <button
            key={mode.id}
            onClick={() => handleModeSelection(mode.id)}
            className={`${mode.color} text-white p-5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 group`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{mode.icon}</span>
            <div className="text-left">
              <div className="font-bold text-lg">{mode.label}</div>
              <div className="text-xs opacity-80">
                {mode.id === 'auto' ? 'Gestion intelligente' : 
                 mode.id === 'solaire' ? 'Énergie renouvelable' :
                 mode.id === 'compression' ? 'Performance optimale' : 'Efficacité mixte'}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Actions rapides avec amélioration UX */}
      <div className="border-t-2 border-gray-100 pt-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-lg">⚡</span>
          Actions Rapides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105">
            <span className="text-lg group-hover:rotate-180 transition-transform duration-300">🔄</span>
            <span className="font-medium">Redémarrer</span>
          </button>
          <button className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105">
            <span className="text-lg group-hover:animate-pulse">🛑</span>
            <span className="font-medium">Arrêt d'Urgence</span>
          </button>
          <button className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105">
            <span className="text-lg group-hover:rotate-12 transition-transform duration-300">🔧</span>
            <span className="font-medium">Maintenance</span>
          </button>
          <button className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105">
            <span className="text-lg group-hover:scale-110 transition-transform duration-300">📊</span>
            <span className="font-medium">Diagnostic</span>
          </button>
        </div>
      </div>
      
      {/* Boîte de dialogue de confirmation */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirmer le changement de mode
            </h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir changer le mode vers{' '}
              <span className="font-semibold">
                {modes.find(m => m.id === selectedMode)?.label}
              </span> ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelModeChange}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmModeChange}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;