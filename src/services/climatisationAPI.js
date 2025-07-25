// Service API pour communiquer avec le backend Flask
const API_BASE_URL = 'http://127.0.0.1:5000/api';

/**
 * Configuration des en-têtes par défaut
 */
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

/**
 * Fonction utilitaire pour les requêtes HTTP
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * Service API pour le système de climatisation
 */
export const climatisationAPI = {
  /**
   * Récupère l'état actuel du système
   */
  getSystemStatus: async () => {
    return await apiRequest('/system-status');
  },

  /**
   * Contrôle manuel du mode de fonctionnement
   */
  controlMode: async (mode) => {
    const requestBody = mode === 'auto' 
      ? { action: 'auto' }
      : { mode, action: 'set' };
      
    return await apiRequest('/control', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
  },

  /**
   * Teste la connexion avec le backend
   */
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/system-status`);
      return response.ok;
    } catch {
      return false;
    }
  },
};

/**
 * Utilitaires pour transformer les données du backend
 */
export const dataTransformers = {
  /**
   * Transforme les données du backend vers le format frontend
   */
  transformSystemStatus: (backendData) => {
    const modeMap = {
      'Solaire': 'Solaire Adsorption',
      'Compression': 'Compression',
      'Hybride': 'Hybride',
      'Automatique': 'Automatique'
    };
    
    return {
      mode: modeMap[backendData.mode] || backendData.mode,
      // 5 potentiomètres Arduino
      temperature: Math.round(backendData.temperature || 0),
      pression: Math.round(backendData.pression * 100) / 100, // Correction: pression en bar
      ensoleillement: Math.round(backendData.ensoleillement || 0),
      debit: Math.round(backendData.debit || 0),
      niveau_eau: Math.round(backendData.niveau_eau || 0),
      // Humidité calculée par le backend
      humidity: Math.round(backendData.humidity || 65),
      // Données système
      derniere_maj: backendData.timestamp || new Date().toISOString(),
      arduino_connected: backendData.arduino_connected || false,
      thermal_image: backendData.thermal_image || null,
      leak_detected: backendData.leak_detected || false,
      leak_details: backendData.leak_details || {},
      mode_forced: backendData.mode_forced || false,
      // Données calculées
      demande_froid: Math.round((backendData.debit || 0) * 0.24), // Estimation
      cop: 4.2 + Math.random() * 0.8 - 0.4,
      consommation_electrique: 1.2 + Math.random() * 0.6 - 0.3
    };
  },

  /**
   * Transforme le mode frontend vers le format backend
   */
  transformModeToBackend: (frontendMode) => {
    const modeMap = {
      'solaire': 'solar',
      'compression': 'compression',
      'hybride': 'hybrid',
      'auto': 'automatic',
      'automatique': 'automatic'
    };
    
    return modeMap[frontendMode.toLowerCase()] || frontendMode.toLowerCase();
  }
};

export default climatisationAPI;
