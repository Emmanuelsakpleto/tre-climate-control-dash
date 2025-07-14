import React from 'react';

/**
 * Composant LeakAlert - Affiche les alertes de fuites et anomalies
 * Liste les alertes avec message, localisation, horodatage, gravité et image thermique
 */
const LeakAlert = ({ alerts }) => {
  const getGravityColor = (gravite) => {
    switch (gravite) {
      case 'Élevée':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Moyenne':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Faible':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? 
      'bg-red-500 text-white' : 
      'bg-green-500 text-white';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Alertes et Fuites</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {alerts.filter(alert => alert.status === 'active').length} active(s)
        </span>
      </div>
      
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">✓</div>
            <div>Aucune alerte active</div>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`border rounded-lg p-4 ${getGravityColor(alert.gravite)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(alert.status)}`}>
                      {alert.status === 'active' ? 'ACTIF' : 'RÉSOLU'}
                    </span>
                    <span className="text-xs text-gray-600">{alert.horodatage}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-1">{alert.message}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {alert.localisation}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">Gravité:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getGravityColor(alert.gravite)}`}>
                      {alert.gravite}
                    </span>
                  </div>
                </div>
                
                <div className="ml-4 flex-shrink-0">
                  <img 
                    src={alert.image_thermique} 
                    alt="Image thermique" 
                    className="w-16 h-16 rounded border-2 border-gray-300"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    Image thermique
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {alerts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Voir toutes les alertes
          </button>
        </div>
      )}
    </div>
  );
};

export default LeakAlert;