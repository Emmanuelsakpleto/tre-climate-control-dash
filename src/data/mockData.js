// Données fictives pour le tableau de bord de climatisation hybride
// Simule les données en temps réel du système de climatisation de l'amphithéâtre 2

export const systemStatus = {
  mode: "Solaire Adsorption",
  ensoleillement: 800, // W/m²
  temperature: 24, // °C
  demande_froid: 12, // kW
  debit: 50, // L/min
  pression: 2.5, // bars
  niveau_eau: 80, // %
  derniere_maj: "2025-07-14 14:30:00"
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
    image_thermique: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZjk5MDAiLz48L3N2Zz4=",
    status: "resolved"
  },
  {
    id: 3,
    message: "Niveau d'eau bas",
    localisation: "Réservoir principal",
    horodatage: "2025-07-13 16:45",
    gravite: "Faible",
    image_thermique: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNmZmZmMDAiLz48L3N2Zz4=",
    status: "resolved"
  }
];

export const performanceData = [
  { date: "2025-07-14", mode: "Solaire", energie_kwh: 50, cop: 0.8, debit: 50, pression: 2.5, niveau_eau: 80 },
  { date: "2025-07-13", mode: "Compression", energie_kwh: 120, cop: 3.2, debit: 55, pression: 2.3, niveau_eau: 75 },
  { date: "2025-07-12", mode: "Solaire", energie_kwh: 45, cop: 0.9, debit: 48, pression: 2.4, niveau_eau: 82 },
  { date: "2025-07-11", mode: "Hybride", energie_kwh: 85, cop: 2.1, debit: 52, pression: 2.6, niveau_eau: 78 },
  { date: "2025-07-10", mode: "Compression", energie_kwh: 135, cop: 3.0, debit: 58, pression: 2.2, niveau_eau: 73 },
  { date: "2025-07-09", mode: "Solaire", energie_kwh: 42, cop: 0.7, debit: 46, pression: 2.5, niveau_eau: 85 },
  { date: "2025-07-08", mode: "Hybride", energie_kwh: 90, cop: 2.3, debit: 54, pression: 2.4, niveau_eau: 76 }
];

export const historyEvents = [
  { date: "2025-07-14 14:30", mode: "Solaire Adsorption", energie_kwh: 12.5, anomalies: "Aucune" },
  { date: "2025-07-14 10:00", mode: "Solaire Adsorption", energie_kwh: 8.2, anomalies: "Fuite vanne 3" },
  { date: "2025-07-14 08:15", mode: "Compression", energie_kwh: 15.8, anomalies: "Pression anormale" },
  { date: "2025-07-13 16:45", mode: "Hybride", energie_kwh: 18.3, anomalies: "Niveau eau bas" },
  { date: "2025-07-13 14:20", mode: "Solaire Adsorption", energie_kwh: 10.7, anomalies: "Aucune" },
  { date: "2025-07-13 12:00", mode: "Solaire Adsorption", energie_kwh: 9.4, anomalies: "Aucune" },
  { date: "2025-07-13 08:30", mode: "Compression", energie_kwh: 16.2, anomalies: "Aucune" },
  { date: "2025-07-12 18:00", mode: "Hybride", energie_kwh: 14.9, anomalies: "Aucune" }
];

// Fonction pour simuler la mise à jour des données en temps réel
export const updateSystemStatus = () => {
  return {
    ...systemStatus,
    ensoleillement: Math.floor(Math.random() * 200) + 700,
    temperature: Math.floor(Math.random() * 6) + 22,
    demande_froid: Math.floor(Math.random() * 8) + 10,
    debit: Math.floor(Math.random() * 10) + 45,
    pression: (Math.random() * 0.6 + 2.2).toFixed(1),
    niveau_eau: Math.floor(Math.random() * 20) + 70,
    derniere_maj: new Date().toLocaleString('fr-FR')
  };
};