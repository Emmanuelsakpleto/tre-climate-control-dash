// Données fictives pour le tableau de bord de climatisation hybride
// Simule les données en temps réel du système de climatisation de l'amphithéâtre 2

export const systemStatus = {
  mode: 'Solaire Adsorption',
  status: 'online',
  leak_detected: false,
  // 5 potentiomètres Arduino → 5 métriques directes
  temperature: 36.0,       // Potentiomètre A4 (Burkina Faso: 32-40°C)
  pression: 2.25,          // Potentiomètre A1 (en bar)
  ensoleillement: 800,     // Potentiomètre A3
  debit: 50,              // Potentiomètre A0
  niveau_eau: 80,         // Potentiomètre A2
  // Métrique calculée par le backend
  humidity: 65,           // Calculée basée sur température, ensoleillement, niveau_eau
  derniere_maj: new Date().toISOString(),
  // Données calculées par le système
  demande_froid: 12,
  cop: 4.2,
  consommation_electrique: 1.8
};

export const leakAlerts = [
  {
    id: 1,
    message: "Fuite détectée près de la vanne 3",
    localisation: "Circuit de refroidissement",
    horodatage: "2025-07-14 10:00",
    gravite: "Élevée",
    image_thermique: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZjAwMDAiLz48L3N2Zz4=",
    status: "active"
  },
  {
    id: 2,
    message: "Pression anormale détectée",
    localisation: "Pompe principale",
    horodatage: "2025-07-14 08:15",
    gravite: "Moyenne",
    image_thermique: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZjk5MDAiLz48L3N2Zz4=",
    status: "resolved"
  },
  {
    id: 3,
    message: "Niveau d'eau bas",
    localisation: "Réservoir principal",
    horodatage: "2025-07-13 16:45",
    gravite: "Faible",
    image_thermique: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmMDAiLz48L3N2Zz4=",
    status: "resolved"
  }
];

export const performanceData = [
  // Données sur 30 jours avec les 5 métriques des potentiomètres Arduino + humidité calculée
  ...Array.from({ length: 30 }, (_, i) => {
    const temperature = 36 + Math.sin(i * 0.1) * 2 + Math.random() * 4 - 2; // Burkina: 32-40°C
    const ensoleillement = 800 + Math.sin(i * 0.2) * 200 + Math.random() * 100 - 50;
    const niveau_eau = 80 + Math.random() * 10 - 5;
    const pression = 2.0 + Math.random() * 0.8 - 0.4; // En bar
    
    // Calcul intelligent de l'humidité (ajusté pour climat tropical)
    const calculateHumidity = (temp, sun, water) => {
      const base_humidity = 45; // Base plus basse pour climat chaud et sec
      const temp_factor = (40 - temp) * 1.5;  // Plus chaud = moins humide
      const sun_factor = (sun / 1000) * -8; // Plus de soleil = moins humide
      const water_factor = (water - 50) * 0.4; // Plus d'eau = plus humide
      
      const humidity = base_humidity + temp_factor + sun_factor + water_factor;
      return Math.max(15, Math.min(85, humidity)); // Limiter entre 15% et 85% (climat sec)
    };
    
    return {
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      temperature: Math.max(32, Math.min(40, temperature)), // Forcer entre 32-40°C
      humidity: calculateHumidity(temperature, ensoleillement, niveau_eau),
      pression: pression,
      ensoleillement: ensoleillement,
      debit: 50 + Math.random() * 10 - 5,
      niveau_eau: niveau_eau,
      efficacite: 85 + Math.random() * 15 - 7.5,
      consommation: 1.2 + Math.random() * 0.6 - 0.3,
      cop: 4.2 + Math.random() * 0.8 - 0.4
    };
  })
];

export const historyEvents = [
  {
    id: 1,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString('fr-FR'),
    mode: 'Solaire Adsorption',
    energie_kwh: 1.8,
    anomalies: 'Aucune',
    actions: 'Basculement automatique',
    details: 'Ensoleillement intense détecté: 850 W/m² - Climat tropical optimal'
  },
  {
    id: 2,
    date: new Date(Date.now() - 4 * 60 * 60 * 1000).toLocaleString('fr-FR'),
    mode: 'Solaire Adsorption',
    energie_kwh: 2.1,
    anomalies: 'Température élevée',
    actions: 'Activation cooling renforcé',
    details: 'Température montée à 39°C - Saison chaude'
  },
  {
    id: 3,
    date: new Date(Date.now() - 6 * 60 * 60 * 1000).toLocaleString('fr-FR'),
    mode: 'Solaire Adsorption',
    energie_kwh: 1.5,
    anomalies: 'Aucune',
    actions: 'Maintenance préventive',
    details: 'Contrôle des 5 potentiomètres Arduino + calibration humidité calculée'
  },
  {
    id: 4,
    date: new Date(Date.now() - 8 * 60 * 60 * 1000).toLocaleString('fr-FR'),
    mode: 'Solaire Adsorption',
    energie_kwh: 1.7,
    anomalies: 'Aucune',
    actions: 'Adaptation climat Burkina Faso',
    details: 'Plage température: 32-40°C, Humidité: 15-85% (saison sèche)'
  },
  {
    id: 5,
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toLocaleString('fr-FR'),
    mode: 'Solaire Adsorption',
    energie_kwh: 1.6,
    anomalies: 'Humidité faible',
    actions: 'Ajustement humidité',
    details: 'Humidité calculée: 18% - Climat sec typique harmattan'
  },
  {
    id: 6,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString('fr-FR'),
    mode: 'Solaire Adsorption',
    energie_kwh: 1.9,
    anomalies: 'Aucune',
    actions: 'Optimisation tropicale',
    details: 'COP amélioré: 4.5 - Performance adaptée chaleur intense'
  }
];

// Fonction pour simuler la mise à jour des données en temps réel
export const updateSystemStatus = () => {
  // Simulation des 5 potentiomètres Arduino (Burkina Faso)
  const temperature = Math.floor(Math.random() * 8) + 32;        // Potentiomètre A4 (32-40°C)
  const pression = (Math.random() * 0.8 + 1.6).toFixed(2);       // Potentiomètre A1 (en bar)
  const ensoleillement = Math.floor(Math.random() * 200) + 700;  // Potentiomètre A3
  const debit = Math.floor(Math.random() * 10) + 45;             // Potentiomètre A0
  const niveau_eau = Math.floor(Math.random() * 20) + 70;        // Potentiomètre A2
  
  // Calcul intelligent de l'humidité basé sur les autres métriques (climat tropical)
  const calculateHumidity = (temp, sun, water) => {
    const base_humidity = 45; // Base plus basse pour climat chaud et sec
    const temp_factor = (40 - temp) * 1.5;  // Plus chaud = moins humide
    const sun_factor = (sun / 1000) * -8; // Plus de soleil = moins humide
    const water_factor = (water - 50) * 0.4; // Plus d'eau = plus humide
    
    const humidity = base_humidity + temp_factor + sun_factor + water_factor;
    return Math.max(15, Math.min(85, Math.round(humidity))); // Limiter entre 15% et 85%
  };
  
  const humidity = calculateHumidity(temperature, ensoleillement, niveau_eau);
  
  return {
    ...systemStatus,
    temperature: temperature,
    pression: parseFloat(pression),
    ensoleillement: ensoleillement,
    debit: debit,
    niveau_eau: niveau_eau,
    humidity: humidity, // Calculée intelligemment pour le climat burkinabé
    derniere_maj: new Date().toLocaleString('fr-FR')
  };
};