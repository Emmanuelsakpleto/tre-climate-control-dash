import React, { useState } from 'react';

/**
 * Composant HistoryTable - Tableau de l'historique des événements
 * Affiche l'historique des modes, consommation d'énergie et anomalies
 */
const HistoryTable = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

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

  const getAnomalieColor = (anomalie) => {
    return anomalie === 'Aucune' ? 
      'text-green-600' : 
      'text-red-600';
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique des Événements</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date & Heure</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Mode</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Énergie (kWh)</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Anomalies</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEvents.map((event, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800">
                  {event.date}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModeColor(event.mode)}`}>
                    {event.mode}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {event.energie_kwh}
                </td>
                <td className={`py-3 px-4 text-sm font-medium ${getAnomalieColor(event.anomalies)}`}>
                  {event.anomalies}
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Affichage {startIndex + 1} à {Math.min(endIndex, events.length)} sur {events.length} événements
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Précédent
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded text-sm ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryTable;