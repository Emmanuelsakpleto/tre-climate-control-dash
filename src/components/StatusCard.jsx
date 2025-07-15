import React from 'react';

/**
 * Composant StatusCard - Affiche les données en temps réel du système de climatisation
 * Présente le mode actif, l'ensoleillement, la température, la demande de froid,
 * le débit des pompes, la pression et le niveau d'eau avec une interface moderne et interactive
 */
const StatusCard = ({ status }) => {
  const getModeIcon = (mode) => {
    if (mode.includes('Solaire')) return '☀️';
    if (mode.includes('Compression')) return '❄️';
    return '⚡';
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case 'Solaire Adsorption':
        return 'text-yellow-700 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200';
      case 'Compression':
        return 'text-blue-700 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200';
      case 'Hybride':
        return 'text-purple-700 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200';
      default:
        return 'text-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getMetricIcon = (metric) => {
    const icons = {
      ensoleillement: '☀️',
      temperature: '🌡️',
      demande_froid: '❄️',
      debit: '💧',
      pression: '⚡',
      niveau_eau: '🪣'
    };
    return icons[metric] || '📊';
  };

  const getMetricColor = (metric, value) => {
    switch(metric) {
      case 'ensoleillement':
        return value > 700 ? 'from-yellow-400 to-orange-500' : 'from-gray-400 to-gray-500';
      case 'temperature':
        return value > 25 ? 'from-red-400 to-red-600' : value > 20 ? 'from-green-400 to-green-600' : 'from-blue-400 to-blue-600';
      case 'demande_froid':
        return value > 15 ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600';
      case 'niveau_eau':
        return value < 30 ? 'from-red-400 to-red-600' : value < 60 ? 'from-yellow-400 to-orange-500' : 'from-green-400 to-green-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.danger) return 'text-red-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-green-600';
  };

  const metrics = [
    { key: 'ensoleillement', value: status.ensoleillement, unit: 'W/m²', label: 'Ensoleillement', thresholds: { warning: 500, danger: 1000 } },
    { key: 'temperature', value: status.temperature, unit: '°C', label: 'Température', thresholds: { warning: 26, danger: 28 } },
    { key: 'demande_froid', value: status.demande_froid, unit: 'kW', label: 'Demande froid', thresholds: { warning: 15, danger: 20 } },
    { key: 'debit', value: status.debit, unit: 'L/min', label: 'Débit pompe', thresholds: { warning: 60, danger: 70 } },
    { key: 'pression', value: status.pression, unit: 'bars', label: 'Pression', thresholds: { warning: 3, danger: 3.5 } },
    { key: 'niveau_eau', value: status.niveau_eau, unit: '%', label: 'Niveau eau', thresholds: { warning: 30, danger: 20 } }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm">
          📊
        </span>
        État du Système
      </h2>
      
      {/* Mode actif avec animation */}
      <div className={`inline-flex items-center px-6 py-3 rounded-full text-base font-semibold mb-8 border-2 transition-all duration-300 hover:scale-105 ${getModeColor(status.mode)}`}>
        <span className="mr-3 text-xl animate-pulse">{getModeIcon(status.mode)}</span>
        <span>{status.mode}</span>
        <div className="ml-3 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div 
            key={metric.key}
            className="group relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-gray-200"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Icône avec gradient */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getMetricColor(metric.key, metric.value)} flex items-center justify-center text-white text-lg shadow-md`}>
                {getMetricIcon(metric.key)}
              </div>
              {/* Indicateur de tendance */}
              <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                En temps réel
              </div>
            </div>
            
            <div className="space-y-2">
              <div className={`text-3xl font-bold transition-all duration-300 group-hover:text-blue-600 ${getStatusColor(metric.value, metric.thresholds)}`}>
                {metric.value}{metric.unit}
              </div>
              <div className="text-sm font-medium text-gray-600">{metric.label}</div>
              
              {/* Barre de progression pour certaines métriques */}
              {(metric.key === 'niveau_eau' || metric.key === 'ensoleillement') && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getMetricColor(metric.key, metric.value)} transition-all duration-1000 ease-out`}
                    style={{
                      width: metric.key === 'niveau_eau' ? `${metric.value}%` : `${Math.min(metric.value / 1000 * 100, 100)}%`
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Indicateur de dernière mise à jour */}
      <div className="mt-6 text-xs text-gray-500 text-center flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
      </div>
    </div>
  );
};

export default StatusCard;