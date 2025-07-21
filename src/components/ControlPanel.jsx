  // Affichage du mode Arduino si présent
import React, { useState } from 'react';

/**
 * Composant ControlPanel - Panneaux de contrôle manuel du système
 * Permet de forcer les modes solaire/compression avec confirmation
 */
const ControlPanel = ({ currentMode, modeArduino, onModeChange }) => {
  // Suppression de la confirmation
  const [actionMessage, setActionMessage] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Mapping des modes backend vers labels et icônes
  const modes = [
    { id: 'solar', label: 'Solaire Adsorption', color: 'bg-green-600 hover:bg-green-700', icon: '☀️' },
    { id: 'compression', label: 'Compression', color: 'bg-blue-600 hover:bg-blue-700', icon: '❄️' },
    { id: 'hybrid', label: 'Hybride', color: 'bg-yellow-600 hover:bg-yellow-700', icon: '⚡' },
    { id: 'automatic', label: 'Automatique', color: 'bg-gray-600 hover:bg-gray-700', icon: '🤖' }
  ];

  // Trouver le label et l'icône du mode actuel
  const currentModeObj = modes.find(m => m.id === currentMode?.toLowerCase());
  // Gestion des actions rapides
  const handleQuickAction = async (action) => {
    setActionMessage(null);
    setActionError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        setActionMessage(data.message || 'Action effectuée avec succès');
      } else {
        setActionError(data.error || 'Erreur lors de l\'action');
      }
    } catch (err) {
      setActionError('Erreur de connexion au backend');
    }
    // Masquer le message après 3 secondes
    setTimeout(() => {
      setActionMessage(null);
      setActionError(null);
    }, 3000);
  };

  const handleModeSelection = (mode) => {
    onModeChange(mode);
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
            <div className="text-sm text-gray-600 mb-1 font-medium">Mode actuel (backend):</div>
            <div className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {currentModeObj ? currentModeObj.label : currentMode}
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            {modeArduino && (
              <div className="mt-2 text-sm text-blue-700 font-semibold flex items-center gap-2">
                <span>Mode physique (Arduino):</span>
                <span className="px-2 py-1 bg-blue-100 rounded-lg">{modeArduino}</span>
              </div>
            )}
          </div>
          <div className="text-4xl opacity-60">
            {currentModeObj ? currentModeObj.icon : '⚙️'}
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
                {mode.id === 'automatic' ? 'Gestion intelligente' : 
                 mode.id === 'solar' ? 'Énergie renouvelable' :
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
          <button
            className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={() => handleQuickAction('restart')}
          >
            <span className="text-lg group-hover:rotate-180 transition-transform duration-300">🔄</span>
            <span className="font-medium">Redémarrer</span>
          </button>
          <button
            className="group bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={() => handleQuickAction('stop')}
          >
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
        {/* Notification d'action rapide */}
        {(actionMessage || actionError) && (
          <div className={`mt-4 px-4 py-2 rounded text-center font-medium ${actionMessage ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {actionMessage || actionError}
          </div>
        )}
      </div>
      
      {/* Boîte de dialogue de confirmation */}
      {/* Suppression de la boîte de confirmation */}
    </div>
  );
};

export default ControlPanel;