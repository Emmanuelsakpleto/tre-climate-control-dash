import React, { useState, useEffect } from 'react';
import StatusCard from './StatusCard';
import PerformanceChart from './PerformanceChart';
import ControlPanel from './ControlPanel';
import HistoryTable from './HistoryTable';
import ConnectionStatus from './ConnectionStatus';
import { systemStatus, performanceData, historyEvents } from '../data/mockData';

/**
 * Composant Dashboard - Interface principale du tableau de bord
 * Gère la navigation, l'état global et l'affichage des composants
 */
const Dashboard = () => {
  console.log('🚀 Dashboard - Composant rendu !');
  
  const [activeSection, setActiveSection] = useState('status');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Récupérer les données du backend à l'initialisation
  useEffect(() => {
    setLoadingApi(true);
    fetch('http://127.0.0.1:5000/api/status')
      .then(res => res.json())
      .then(data => {
        setApiStatus(data);
        setLoadingApi(false);
      })
      .catch(err => {
        setApiError(err);
        setLoadingApi(false);
      });
  }, []);

  // Utiliser les données du backend si dispo, sinon mock
  const currentStatus = apiStatus || systemStatus;

  // Debug - Vérifier les données passées
  console.log('🔍 Dashboard - Données API systemStatus:', apiStatus);
  console.log('🔍 Dashboard - Données mock systemStatus:', systemStatus);
  console.log('🔍 Dashboard - Données currentStatus utilisées:', currentStatus);

  const handleModeChange = async (newMode) => {
    try {
      await controlMode(newMode);
      console.log(`Mode changé vers: ${newMode}`);
    } catch (err) {
      console.error('Erreur lors du changement de mode:', err);
    }
  };

  const menuItems = [
    { id: 'status', label: 'État', icon: '📊' },
    { id: 'performance', label: 'Performances', icon: '📈' },
    { id: 'controls', label: 'Contrôles', icon: '🎛️' },
    { id: 'history', label: 'Historique', icon: '📋' }
  ];

  const renderContent = () => {
    console.log('🔍 Dashboard - renderContent appelé, activeSection:', activeSection);
    
    switch (activeSection) {
      case 'status':
        console.log('🎯 Dashboard - Rendu StatusCard avec data:', currentStatus);
        return <StatusCard status={currentStatus} />;
      case 'performance':
        return <PerformanceChart data={performanceData} />;
      case 'controls':
        return <ControlPanel currentMode={currentStatus.mode} onModeChange={handleModeChange} />;
      case 'history':
        return <HistoryTable events={historyEvents} />;
      default:
        console.log('🎯 Dashboard - Rendu StatusCard par défaut avec data:', currentStatus);
        return <StatusCard status={currentStatus} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="text-xl">☰</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Tableau de bord - Climatisation Hybride Amphithéâtre 2
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectionStatus 
              isLoading={loadingApi}
              arduinoConnected={currentStatus.arduino_connected}
              lastUpdate={currentStatus.derniere_maj || currentStatus.timestamp}
            />
            <div className="text-sm text-gray-600">
              Site K1 | {new Date().toLocaleString('fr-FR')}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Barre latérale */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block bg-white shadow-sm border-r border-gray-200 w-64 min-h-screen`}>
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;