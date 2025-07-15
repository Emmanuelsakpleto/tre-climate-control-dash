import React from 'react';

/**
 * Composant LeakAlert - Affiche les alertes de fuites et anomalies
 * Liste les alertes avec message, localisation, horodatage, gravité et image thermique
 * Interface moderne avec animations et interactions
 */
const LeakAlert = ({ alerts }) => {
  const getGravityColor = (gravite) => {
    switch (gravite) {
      case 'Élevée':
        return 'bg-gradient-to-r from-red-50 to-red-100 border-red-300 text-red-800';
      case 'Moyenne':
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300 text-yellow-800';
      case 'Faible':
        return 'bg-gradient-to-r from-green-50 to-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getGravityIcon = (gravite) => {
    switch (gravite) {
      case 'Élevée':
        return '🚨';
      case 'Moyenne':
        return '⚠️';
      case 'Faible':
        return '💡';
      default:
        return 'ℹ️';
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? 
      'bg-red-500 text-white animate-pulse' : 
      'bg-green-500 text-white';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm">
            🚨
          </span>
          Alertes et Fuites
        </h2>
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
            {alerts.filter(alert => alert.status === 'active').length} active(s)
          </span>
          {alerts.filter(alert => alert.status === 'active').length > 0 && (
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-3xl text-green-600">✓</div>
            </div>
            <div className="text-lg font-medium">Aucune alerte active</div>
            <div className="text-sm text-gray-400 mt-2">Système fonctionnel</div>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <div 
              key={alert.id} 
              className={`border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:scale-102 ${getGravityColor(alert.gravite)}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{getGravityIcon(alert.gravite)}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(alert.status)}`}>
                      {alert.status === 'active' ? 'ACTIF' : 'RÉSOLU'}
                    </span>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                      {alert.horodatage}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{alert.message}</h3>
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">📍</span>
                    {alert.localisation}
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">Gravité:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getGravityIcon(alert.gravite)}</span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-white shadow-sm">
                        {alert.gravite}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <img 
                      src={alert.image_thermique} 
                      alt="Image thermique" 
                      className="w-20 h-20 rounded-lg border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        🔍
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center font-medium">
                    Image thermique
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {alerts.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-102">
            <span className="flex items-center justify-center gap-2">
              📋 Voir toutes les alertes
              <span className="text-sm opacity-75">({alerts.length})</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LeakAlert;