import React from 'react';

/**
 * Composant StatusCard - Affiche les données en temps réel du système de climatisation
 */
const StatusCard = ({ status }) => {
  const getModeIcon = (mode) => {
    if (!mode) return '⚙️';
    const lowerMode = mode.toLowerCase();
    if (lowerMode.includes('solar') || lowerMode.includes('solaire')) return '☀️';
    if (lowerMode.includes('compression')) return '❄️';
    if (lowerMode.includes('hybrid') || lowerMode.includes('hybride')) return '⚡';
    if (lowerMode.includes('automatic') || lowerMode.includes('automatique')) return '🤖';
    return '⚙️';
  };

  const getModeColor = (mode) => {
    if (!mode) return 'text-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
    
    const lowerMode = mode.toLowerCase();
    if (lowerMode.includes('solar') || lowerMode.includes('solaire')) {
      return 'text-yellow-700 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200';
    }
    if (lowerMode.includes('compression')) {
      return 'text-blue-700 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200';
    }
    if (lowerMode.includes('hybrid') || lowerMode.includes('hybride')) {
      return 'text-purple-700 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200';
    }
    if (lowerMode.includes('automatic') || lowerMode.includes('automatique')) {
      return 'text-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
    }
    return 'text-gray-700 bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
  };

  const getStatusIcon = (status) => {
    if (!status) return '⚪';
    if (status === 'online') return '🟢';
    if (status === 'offline') return '🔴';
    if (status === 'warning') return '🟡';
    return '⚪';
  };

  // Données par défaut si pas de status
  const defaultStatus = {
    mode: 'Automatic',
    temperature: 22.5,
    humidity: 65,
    pressure: 1013.25,
    status: 'online',
    leak_detected: false
  };

  const currentStatus = status || defaultStatus;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getStatusIcon(currentStatus.status)}</div>
            <div>
              <h3 className="text-lg font-semibold">État Système</h3>
              <p className="text-blue-100 text-sm">Surveillance temps réel</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Mode Actuel</div>
            <div className="text-xl font-bold">{getModeIcon(currentStatus.mode)} {currentStatus.mode}</div>
          </div>
        </div>
      </div>

      {/* Mode Status */}
      <div className="p-6 border-b border-gray-100">
        <div className={`inline-flex items-center px-4 py-2 rounded-lg border-2 ${getModeColor(currentStatus.mode)}`}>
          <span className="text-2xl mr-3">{getModeIcon(currentStatus.mode)}</span>
          <div>
            <div className="font-semibold text-lg">{currentStatus.mode}</div>
            <div className="text-sm opacity-75">Mode de fonctionnement</div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Temperature */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-red-600 font-medium">Température</div>
              <div className="text-2xl font-bold text-red-700">{currentStatus.temperature}°C</div>
            </div>
            <div className="text-3xl">🌡️</div>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-blue-600 font-medium">Humidité</div>
              <div className="text-2xl font-bold text-blue-700">{currentStatus.humidity}%</div>
            </div>
            <div className="text-3xl">💧</div>
          </div>
        </div>

        {/* Pressure */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-600 font-medium">Pression</div>
              <div className="text-2xl font-bold text-green-700">{currentStatus.pressure} hPa</div>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>
      </div>

      {/* Leak Detection */}
      {currentStatus.leak_detected && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-6 mb-6">
          <div className="flex items-center">
            <div className="text-red-400 text-xl mr-3">⚠️</div>
            <div>
              <div className="text-sm font-medium text-red-800">Alerte de fuite détectée</div>
              <div className="text-sm text-red-700">Vérification du système en cours...</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Mise à jour temps réel</span>
          </div>
          <div>
            Dernière mise à jour : {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
