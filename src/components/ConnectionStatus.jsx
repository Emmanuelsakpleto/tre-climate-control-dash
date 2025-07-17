import React from 'react';
import { AlertCircle, Wifi, WifiOff, Server } from 'lucide-react';

/**
 * Composant pour afficher le statut de connexion au backend
 */
const ConnectionStatus = ({ isConnected, isLoading, arduinoConnected, lastUpdate }) => {
  const getStatusColor = () => {
    if (isLoading) return 'bg-yellow-500';
    if (!isConnected) return 'bg-red-500';
    if (!arduinoConnected) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getStatusText = () => {
    if (isLoading) return 'Connexion...';
    if (!isConnected) return 'Backend déconnecté';
    if (!arduinoConnected) return 'Arduino déconnecté (simulation)';
    return 'Système connecté';
  };

  const getStatusIcon = () => {
    if (isLoading) return <Server className="w-4 h-4 animate-spin" />;
    if (!isConnected) return <WifiOff className="w-4 h-4" />;
    if (!arduinoConnected) return <AlertCircle className="w-4 h-4" />;
    return <Wifi className="w-4 h-4" />;
  };

  // Conversion sécurisée de la date
  let dateObj = null;
  if (lastUpdate) {
    try {
      dateObj = new Date(lastUpdate);
    } catch {
      dateObj = null;
    }
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className={`w-3 h-3 rounded-full ${getStatusColor()} ${isConnected ? 'animate-pulse' : ''}`}></div>
      <div className="flex items-center space-x-1">
        {getStatusIcon()}
        <span className="text-gray-600">{getStatusText()}</span>
      </div>
      {lastUpdate && (
        <span className="text-sm text-gray-600">
          Dernière mise à jour : {dateObj ? dateObj.toLocaleTimeString('fr-FR') : '--'}
        </span>
      )}
    </div>
  );
};

export default ConnectionStatus;
