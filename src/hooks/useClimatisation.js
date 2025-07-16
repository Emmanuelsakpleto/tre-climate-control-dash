import { useState, useEffect, useCallback } from 'react';
import { climatisationAPI, dataTransformers } from '../services/climatisationAPI';

/**
 * Hook personnalisé pour gérer les données du système de climatisation
 */
export const useClimatisation = () => {
  const [systemStatus, setSystemStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  /**
   * Récupère les données du système
   */
  const fetchSystemStatus = useCallback(async () => {
    try {
      setError(null);
      const backendData = await climatisationAPI.getSystemStatus();
      const transformedData = dataTransformers.transformSystemStatus(backendData);
      
      setSystemStatus(transformedData);
      setIsConnected(true);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
      console.error('Erreur lors de la récupération des données:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Contrôle le mode de fonctionnement
   */
  const controlMode = useCallback(async (mode) => {
    try {
      const backendMode = dataTransformers.transformModeToBackend(mode);
      const response = await climatisationAPI.controlMode(backendMode);
      
      // Actualiser les données après changement de mode
      await fetchSystemStatus();
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [fetchSystemStatus]);

  /**
   * Teste la connexion au backend
   */
  const checkConnection = useCallback(async () => {
    try {
      const isHealthy = await climatisationAPI.healthCheck();
      setIsConnected(isHealthy);
      return isHealthy;
    } catch {
      setIsConnected(false);
      return false;
    }
  }, []);

  /**
   * Effet pour charger les données initiales
   */
  useEffect(() => {
    fetchSystemStatus();
  }, [fetchSystemStatus]);

  /**
   * Effet pour les mises à jour automatiques
   */
  useEffect(() => {
    const interval = setInterval(() => {
      if (isConnected) {
        fetchSystemStatus();
      }
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, [fetchSystemStatus, isConnected]);

  /**
   * Effet pour vérifier la connexion périodiquement
   */
  useEffect(() => {
    const connectionCheck = setInterval(() => {
      checkConnection();
    }, 30000); // Vérification toutes les 30 secondes

    return () => clearInterval(connectionCheck);
  }, [checkConnection]);

  return {
    // Données
    systemStatus,
    isLoading,
    error,
    isConnected,
    lastUpdate,
    
    // Actions
    refreshData: fetchSystemStatus,
    controlMode,
    checkConnection,
  };
};

/**
 * Hook pour gérer les alertes et fuites
 */
export const useLeakDetection = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Génère une alerte basée sur les données système
   */
  const generateAlert = useCallback((systemData) => {
    if (systemData?.leak_detected) {
      const newAlert = {
        id: Date.now(),
        message: systemData.leak_details.message || 'Fuite détectée',
        localisation: systemData.leak_details.location || 'Localisation inconnue',
        horodatage: new Date().toLocaleString('fr-FR'),
        gravite: systemData.leak_details.severity || 'Moyenne',
        image_thermique: systemData.thermal_image || null,
        status: 'active'
      };

      setAlerts(prev => [newAlert, ...prev.filter(alert => alert.status !== 'active')]);
    }
  }, []);

  /**
   * Marque une alerte comme résolue
   */
  const resolveAlert = useCallback((alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' } : alert
    ));
  }, []);

  /**
   * Efface toutes les alertes
   */
  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return {
    alerts,
    isLoading,
    generateAlert,
    resolveAlert,
    clearAlerts,
  };
};

export default useClimatisation;
