import React, { useState, useEffect } from 'react';
import StatusCard from './StatusCard';
import LeakAlert from './LeakAlert';
import PerformanceChart from './PerformanceChart';
import ControlPanel from './ControlPanel';
import HistoryTable from './HistoryTable';
import { systemStatus, leakAlerts, performanceData, historyEvents, updateSystemStatus } from '../data/mockData';

/**
 * Composant Dashboard - Interface principale du tableau de bord
 * Gère la navigation, l'état global et l'affichage des composants
 */
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('status');
  const [currentStatus, setCurrentStatus] = useState(systemStatus);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Simulation de mise à jour des données en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(updateSystemStatus());
    }, 30000); // Mise à jour toutes les 30 secondes

    return () => clearInterval(interval);
  }, []);

  const handleModeChange = (newMode) => {
    setCurrentStatus(prev => ({
      ...prev,
      mode: newMode === 'auto' ? 'Automatique' : 
            newMode === 'solaire' ? 'Solaire Adsorption' :
            newMode === 'compression' ? 'Compression' : 'Hybride'
    }));
  };

  const menuItems = [
    { id: 'status', label: 'État', icon: '📊' },
    { id: 'alerts', label: 'Alertes', icon: '⚠️' },
    { id: 'performance', label: 'Performances', icon: '📈' },
    { id: 'controls', label: 'Contrôles', icon: '🎛️' },
    { id: 'history', label: 'Historique', icon: '📋' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'status':
        return <StatusCard status={currentStatus} />;
      case 'alerts':
        return <LeakAlert alerts={leakAlerts} />;
      case 'performance':
        return <PerformanceChart data={performanceData} />;
      case 'controls':
        return <ControlPanel currentMode={currentStatus.mode} onModeChange={handleModeChange} />;
      case 'history':
        return <HistoryTable events={historyEvents} />;
      default:
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
            <div className="text-sm text-gray-600">
              Site K1 | {new Date().toLocaleString('fr-FR')}
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
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