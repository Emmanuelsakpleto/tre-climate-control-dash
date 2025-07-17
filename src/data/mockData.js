// Données fictives pour le tableau de bord de climatisation hybride
// Simule les données en temps réel du système de climatisation de l'amphithéâtre 2

export const systemStatus = {
  mode: 'Solaire Adsorption',
  status: 'online',
  leak_detected: false,
  // 5 potentiomètres Arduino → 5 métriques directes
  temperature: 24.0,       // Potentiomètre A4
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
    const temperature = 22 + Math.sin(i * 0.1) * 3 + Math.random() * 2 - 1;
    const ensoleillement = 800 + Math.sin(i * 0.2) * 200 + Math.random() * 100 - 50;
    const niveau_eau = 80 + Math.random() * 10 - 5;
    const pression = 2.0 + Math.random() * 0.8 - 0.4; // En bar
    
    // Calcul intelligent de l'humidité
    const calculateHumidity = (temp, sun, water) => {
      const base_humidity = 65;
      const temp_factor = (30 - temp) * 2;  // Plus chaud = moins humide
      const sun_factor = (sun / 1000) * -10; // Plus de soleil = moins humide
      const water_factor = (water - 50) * 0.3; // Plus d'eau = plus humide
      
      const humidity = base_humidity + temp_factor + sun_factor + water_factor;
      return Math.max(20, Math.min(90, humidity)); // Limiter entre 20% et 90%
    };
    
    return {
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      temperature: temperature,
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
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'info',
    message: 'Basculement automatique vers mode Solaire Adsorption',
    details: 'Ensoleillement optimal détecté: 850 W/m²'
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    type: 'warning',
    message: 'Niveau d\'eau bas détecté',
    details: 'Niveau descendu à 25%, remplissage automatique activé'
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    type: 'success',
    message: 'Maintenance préventive effectuée',
    details: 'Contrôle des 6 potentiomètres Arduino terminé'
  }
];

// Fonction pour simuler la mise à jour des données en temps réel
export const updateSystemStatus = () => {
  // Simulation des 5 potentiomètres Arduino
  const temperature = Math.floor(Math.random() * 6) + 22;        // Potentiomètre A4
  const pression = (Math.random() * 0.8 + 1.6).toFixed(2);       // Potentiomètre A1 (en bar)
  const ensoleillement = Math.floor(Math.random() * 200) + 700;  // Potentiomètre A3
  const debit = Math.floor(Math.random() * 10) + 45;             // Potentiomètre A0
  const niveau_eau = Math.floor(Math.random() * 20) + 70;        // Potentiomètre A2
  
  // Calcul intelligent de l'humidité basé sur les autres métriques
  const calculateHumidity = (temp, sun, water) => {
    const base_humidity = 65;
    const temp_factor = (30 - temp) * 2;  // Plus chaud = moins humide
    const sun_factor = (sun / 1000) * -10; // Plus de soleil = moins humide
    const water_factor = (water - 50) * 0.3; // Plus d'eau = plus humide
    
    const humidity = base_humidity + temp_factor + sun_factor + water_factor;
    return Math.max(20, Math.min(90, Math.round(humidity))); // Limiter entre 20% et 90%
  };
  
  const humidity = calculateHumidity(temperature, ensoleillement, niveau_eau);
  
  return {
    ...systemStatus,
    temperature: temperature,
    pression: parseFloat(pression),
    ensoleillement: ensoleillement,
    debit: debit,
    niveau_eau: niveau_eau,
    humidity: humidity, // Calculée intelligemment
    derniere_maj: new Date().toLocaleString('fr-FR')
  };
};