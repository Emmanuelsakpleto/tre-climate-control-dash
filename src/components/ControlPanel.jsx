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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Contrôle Manuel</h2>
      
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Mode actuel:</div>
        <div className="text-lg font-semibold text-gray-800">{currentMode}</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeSelection(mode.id)}
            className={`${mode.color} text-white p-4 rounded-lg transition-colors flex items-center justify-center space-x-2`}
          >
            <span className="text-2xl">{mode.icon}</span>
            <span className="font-medium">{mode.label}</span>
          </button>
        ))}
      </div>
      
      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Actions Rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors">
            🔄 Redémarrer Système
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors">
            🛑 Arrêt d'Urgence
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors">
            🔧 Mode Maintenance
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
            📊 Diagnostic
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