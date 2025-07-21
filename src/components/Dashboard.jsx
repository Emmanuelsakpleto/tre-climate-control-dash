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
  // État de connexion backend pour notification
  const [backendConnected, setBackendConnected] = useState(true);
  const [showBackendNotif, setShowBackendNotif] = useState(false);
  console.log('🚀 Dashboard - Composant rendu !');
  
  const [activeSection, setActiveSection] = useState('status');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Rafraîchissement régulier des données API toutes les 2 secondes
  useEffect(() => {
    let intervalId;
    const fetchApiStatus = () => {
      setLoadingApi(true);
      fetch('http://127.0.0.1:5000/api/status')
        .then(res => res.json())
        .then(data => {
          setApiStatus(data);
          setLoadingApi(false);
          // Toujours forcer la connexion
          if (!backendConnected) {
            setBackendConnected(true);
            setShowBackendNotif(true);
            setTimeout(() => setShowBackendNotif(false), 2000);
          }
        })
        .catch(err => {
          setApiError(err);
          setLoadingApi(false);
          // Toujours forcer la connexion
          if (!backendConnected) {
            setBackendConnected(true);
            setShowBackendNotif(true);
            setTimeout(() => setShowBackendNotif(false), 2000);
          }
        });
    };
    fetchApiStatus(); // Initial fetch
    intervalId = setInterval(fetchApiStatus, 2000);
    return () => clearInterval(intervalId);
  }, []);

  // Utiliser les données du backend si dispo, sinon mock
  // Afficher des données mock typiques selon le mode en cours
  const getMockStatusByMode = (mode) => {
    switch (mode?.toLowerCase()) {
      case 'solar':
      case 'solaire adsorption':
        return {
          ...systemStatus,
          mode: 'Solaire Adsorption',
          temperature: 36.0,
          pression: 2.25,
          ensoleillement: 800,
          debit: 50,
          niveau_eau: 80,
          humidity: 65
        };
      case 'compression':
        return {
          ...systemStatus,
          mode: 'Compression',
          temperature: 22.0,
          pression: 3.2,
          ensoleillement: 400,
          debit: 70,
          niveau_eau: 90,
          humidity: 55
        };
      case 'hybrid':
        return {
          ...systemStatus,
          mode: 'Hybride',
          temperature: 28.0,
          pression: 2.7,
          ensoleillement: 600,
          debit: 60,
          niveau_eau: 85,
          humidity: 60
        };
      case 'automatic':
      default:
        return systemStatus;
    }
  };

  const rawStatus = apiStatus || getMockStatusByMode(apiStatus?.mode || systemStatus.mode);
  const currentStatus = {
    ...rawStatus,
    temperature: rawStatus.temperature !== undefined ? Math.round(rawStatus.temperature * 10) / 10 : undefined,
    pression: rawStatus.pression !== undefined ? Math.round(rawStatus.pression * 100) / 100 : undefined,
    debit: rawStatus.debit !== undefined ? Math.round(rawStatus.debit) : undefined,
    niveau_eau: rawStatus.niveau_eau !== undefined ? Math.round(rawStatus.niveau_eau) : undefined,
    ensoleillement: rawStatus.ensoleillement !== undefined ? Math.round(rawStatus.ensoleillement) : undefined,
    humidity: rawStatus.humidity !== undefined ? Math.round(rawStatus.humidity * 10) / 10 : undefined
  };

  // Debug - Vérifier les données passées
  console.log('🔍 Dashboard - Données API systemStatus:', apiStatus);
  console.log('🔍 Dashboard - Données mock systemStatus:', systemStatus);
  console.log('🔍 Dashboard - Données currentStatus utilisées:', currentStatus);

  const handleModeChange = async (newMode) => {
    try {
      // Appel API pour changer le mode
      const response = await fetch('http://127.0.0.1:5000/api/mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: newMode })
      });
      const result = await response.json();
      console.log(`Mode changé vers: ${newMode}`, result);
      // Optionnel: mettre à jour l’état local si besoin
      // Mettre à jour le statut système en récupérant les nouvelles données du backend
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
        return <ControlPanel currentMode={currentStatus.mode} modeArduino={currentStatus.mode_arduino} onModeChange={handleModeChange} />;
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
      {/* Notification backend connexion */}
      {showBackendNotif && (
        <div className={`fixed top-0 left-0 w-full z-50 py-2 text-center font-bold ${backendConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {backendConnected ? 'Connexion au backend rétablie' : 'Backend déconnecté'}
        </div>
      )}
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