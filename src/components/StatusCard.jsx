import React from 'react';

/**
 * Composant StatusCard - Affiche les données en temps réel du système de climatisation
 * Présente le mode actif, l'ensoleillement, la température, la demande de froid,
 * le débit des pompes, la pression et le niveau d'eau
 */
const StatusCard = ({ status }) => {
  const getModeColor = (mode) => {
    switch (mode) {
      case 'Solaire Adsorption':
        return 'bg-green-100 text-green-800';
      case 'Compression':
        return 'bg-blue-100 text-blue-800';
      case 'Hybride':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.danger) return 'text-red-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">État du Système</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getModeColor(status.mode)}`}>
          {status.mode}
        </span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{status.ensoleillement}</div>
          <div className="text-sm text-gray-600">W/m²</div>
          <div className="text-xs text-gray-500">Ensoleillement</div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${getStatusColor(status.temperature, { warning: 26, danger: 28 })}`}>
            {status.temperature}°C
          </div>
          <div className="text-sm text-gray-600">Température</div>
          <div className="text-xs text-gray-500">Ambiante</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{status.demande_froid}</div>
          <div className="text-sm text-gray-600">kW</div>
          <div className="text-xs text-gray-500">Demande froid</div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${getStatusColor(status.debit, { warning: 60, danger: 70 })}`}>
            {status.debit}
          </div>
          <div className="text-sm text-gray-600">L/min</div>
          <div className="text-xs text-gray-500">Débit pompe</div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${getStatusColor(status.pression, { warning: 3, danger: 3.5 })}`}>
            {status.pression}
          </div>
          <div className="text-sm text-gray-600">bars</div>
          <div className="text-xs text-gray-500">Pression</div>
        </div>
        
        <div className="text-center">
          <div className={`text-2xl font-bold ${getStatusColor(100 - status.niveau_eau, { warning: 30, danger: 50 })}`}>
            {status.niveau_eau}%
          </div>
          <div className="text-sm text-gray-600">Niveau eau</div>
          <div className="text-xs text-gray-500">Réservoir</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Dernière mise à jour: {status.derniere_maj}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;