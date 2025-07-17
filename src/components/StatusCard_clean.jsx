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
    leak_detected: false,
    arduino_connected: false,
    timestamp: new Date().toISOString()
  };

  const currentStatus = { ...defaultStatus, ...status };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header avec mode et statut */}
      <div className={`p-6 ${getModeColor(currentStatus.mode)} border-b`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{getModeIcon(currentStatus.mode)}</div>
            <div>
              <div className="font-semibold text-lg">{currentStatus.mode}</div>
              <div className="text-sm opacity-75">Mode de fonctionnement</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl">{getStatusIcon(currentStatus.status)}</div>
            <div className="text-sm font-medium">
              {currentStatus.status === 'online' ? 'En ligne' : 'Hors ligne'}
            </div>
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
            <div className="text-3xl">🌪️</div>
          </div>
        </div>
      </div>

      {/* Alertes */}
      {currentStatus.leak_detected && (
        <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚨</div>
            <div>
              <div className="font-semibold text-red-700">Fuite détectée !</div>
              <div className="text-sm text-red-600">Vérifiez immédiatement le système</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer avec statut de connexion */}
      <div className="mt-6 text-xs text-gray-500 text-center flex items-center justify-center gap-2 pb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Dernière mise à jour : {currentStatus.timestamp ? new Date(currentStatus.timestamp).toLocaleTimeString('fr-FR') : 'N/A'}
        {currentStatus.arduino_connected && (
          <>
            <span className="mx-2">•</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Arduino connecté
          </>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
