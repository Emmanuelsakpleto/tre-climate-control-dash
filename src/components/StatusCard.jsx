import React, { useState, useEffect } from 'react';

const StatusCard = ({ status }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Données par défaut - Les 6 potentiomètres Arduino alimentent ces métriques
  const defaultStatus = {
    mode: 'Automatic',
    status: 'online',
    leak_detected: false,
    // 6 potentiomètres Arduino → 6 métriques
    temperature: 22.5,    // Potentiomètre 1
    humidity: 65,         // Potentiomètre 2  
    pression: 1013.25,    // Potentiomètre 3
    ensoleillement: 800,  // Potentiomètre 4
    debit: 50,           // Potentiomètre 5
    niveau_eau: 80,      // Potentiomètre 6
    derniere_maj: null
  };

  // Utiliser les données reçues en priorité, sinon les données par défaut
  const currentStatus = status ? { ...defaultStatus, ...status } : defaultStatus;

  // Mise à jour de l'heure chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fonction pour obtenir l'icône du mode
  const getModeIcon = (mode) => {
    if (!mode) return '🤖';
    const lowerMode = mode.toLowerCase();
    if (lowerMode.includes('solaire')) return '☀️';
    if (lowerMode.includes('compression')) return '❄️';
    if (lowerMode.includes('hybride')) return '⚡';
    return '🤖';
  };

  // Déterminer le statut et la couleur
  const getStatusInfo = () => {
    if (currentStatus.leak_detected) {
      return { text: 'FUITE DÉTECTÉE', color: 'bg-red-600', icon: '🚨' };
    }
    switch (currentStatus.status) {
      case 'online':
        return { text: 'SYSTÈME OPÉRATIONNEL', color: 'bg-green-600', icon: '✅' };
      case 'maintenance':
        return { text: 'MAINTENANCE', color: 'bg-yellow-600', icon: '⚠️' };
      case 'offline':
        return { text: 'HORS LIGNE', color: 'bg-red-600', icon: '❌' };
      default:
        return { text: 'INCONNU', color: 'bg-gray-600', icon: '❓' };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="space-y-6">
      {/* En-tête avec statut et heure */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className={`${statusInfo.color} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{statusInfo.icon}</span>
              <div>
                <h3 className="text-lg font-semibold">{statusInfo.text}</h3>
                <p className="text-sm opacity-90">
                  {getModeIcon(currentStatus.mode)} Mode: {currentStatus.mode}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">
                {currentTime.toLocaleTimeString('fr-FR')}
              </div>
              <div className="text-sm opacity-90">
                {currentTime.toLocaleDateString('fr-FR')}
              </div>
              {currentStatus.derniere_maj && (
                <div className="text-xs opacity-75 mt-1">
                  Dernière MAJ: {new Date(currentStatus.derniere_maj).toLocaleTimeString('fr-FR')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Métriques des 6 potentiomètres Arduino */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Capteurs Arduino</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">Temps réel</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-6">
          {/* Potentiomètre 1 - Température */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
            <div className="text-sm text-red-600 font-medium">Température</div>
            <div className="text-2xl font-bold text-red-700">{currentStatus.temperature}°C</div>
          </div>

          {/* Potentiomètre 2 - Humidité */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 font-medium">Humidité</div>
            <div className="text-2xl font-bold text-blue-700">{currentStatus.humidity}%</div>
          </div>

          {/* Potentiomètre 3 - Pression */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-600 font-medium">Pression</div>
            <div className="text-2xl font-bold text-green-700">{currentStatus.pression} hPa</div>
          </div>

          {/* Potentiomètre 4 - Ensoleillement */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-sm text-yellow-600 font-medium">Ensoleillement</div>
            <div className="text-2xl font-bold text-yellow-700">{currentStatus.ensoleillement} W/m²</div>
          </div>

          {/* Potentiomètre 5 - Débit */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg border border-cyan-200">
            <div className="text-sm text-cyan-600 font-medium">Débit</div>
            <div className="text-2xl font-bold text-cyan-700">{currentStatus.debit} L/min</div>
          </div>

          {/* Potentiomètre 6 - Niveau d'eau */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
            <div className="text-sm text-indigo-600 font-medium">Niveau d'eau</div>
            <div className="text-2xl font-bold text-indigo-700">{currentStatus.niveau_eau}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
