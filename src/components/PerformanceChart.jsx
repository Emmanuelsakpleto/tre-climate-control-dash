import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceChart = ({ data = [] }) => {
  const [timeRange, setTimeRange] = useState('7jours');
  const [filteredData, setFilteredData] = useState([]);

  // Fonction pour générer des données de test plus réalistes
  const generateRealisticData = (days) => {
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Simulation de données réalistes avec variations
      const baseTemp = 22 + Math.sin(i * 0.1) * 3;
      const baseHumidity = 65 + Math.cos(i * 0.15) * 10;
      const baseEnsoleillement = 800 + Math.sin(i * 0.2) * 200;
      
      data.push({
        date: date.toISOString().split('T')[0],
        dateLabel: date.toLocaleDateString('fr-FR', { 
          day: '2-digit', 
          month: '2-digit' 
        }),
        temperature: Math.round((baseTemp + Math.random() * 2 - 1) * 10) / 10,
        humidity: Math.round((baseHumidity + Math.random() * 5 - 2.5) * 10) / 10,
        ensoleillement: Math.round((baseEnsoleillement + Math.random() * 100 - 50) * 10) / 10,
        pression: Math.round((1013.25 + Math.random() * 10 - 5) * 100) / 100,
        debit: Math.round((50 + Math.random() * 10 - 5) * 10) / 10,
        niveau_eau: Math.round((80 + Math.random() * 10 - 5) * 10) / 10,
        efficacite: Math.round((85 + Math.random() * 15 - 7.5) * 10) / 10,
        consommation: Math.round((1.2 + Math.random() * 0.6 - 0.3) * 100) / 100
      });
    }
    
    return data;
  };

  useEffect(() => {
    let processedData = [];
    
    if (data && data.length > 0) {
      // Utiliser les vraies données si disponibles
      processedData = data;
    } else {
      // Générer des données de test
      const days = timeRange === '7jours' ? 7 : 30;
      processedData = generateRealisticData(days);
    }
    
    // Filtrer selon la période sélectionnée
    const days = timeRange === '7jours' ? 7 : 30;
    const filtered = processedData.slice(-days);
    
    setFilteredData(filtered);
  }, [timeRange, data]);

  const formatTooltip = (value, name) => {
    const units = {
      temperature: '°C',
      humidity: '%',
      ensoleillement: 'W/m²',
      pression: 'hPa',
      debit: 'L/min',
      niveau_eau: '%',
      efficacite: '%',
      consommation: 'kWh'
    };
    
    const labels = {
      temperature: 'Température',
      humidity: 'Humidité',
      ensoleillement: 'Ensoleillement',
      pression: 'Pression',
      debit: 'Débit',
      niveau_eau: 'Niveau d\'eau',
      efficacite: 'Efficacité',
      consommation: 'Consommation'
    };
    
    return [`${value} ${units[name] || ''}`, labels[name] || name];
  };

  return (
    <div className="space-y-6">
      {/* Contrôles de période */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Analyse des Performances</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('7jours')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === '7jours'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              7 jours
            </button>
            <button
              onClick={() => setTimeRange('30jours')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === '30jours'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              30 jours
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm text-green-600 font-medium">Efficacité Moyenne</div>
            <div className="text-2xl font-bold text-green-700">
              {filteredData.length > 0 
                ? `${(filteredData.reduce((sum, item) => sum + (item.efficacite || 85), 0) / filteredData.length).toFixed(1)}%`
                : '85.0%'
              }
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-600 font-medium">Température Moyenne</div>
            <div className="text-2xl font-bold text-blue-700">
              {filteredData.length > 0 
                ? `${(filteredData.reduce((sum, item) => sum + (item.temperature || 22), 0) / filteredData.length).toFixed(1)}°C`
                : '22.0°C'
              }
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm text-purple-600 font-medium">Consommation Totale</div>
            <div className="text-2xl font-bold text-purple-700">
              {filteredData.length > 0 
                ? `${(filteredData.reduce((sum, item) => sum + (item.consommation || 1.2), 0)).toFixed(1)} kWh`
                : '8.4 kWh'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Évolution des Paramètres</h4>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="dateLabel" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Température"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="humidity" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Humidité"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="ensoleillement" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Ensoleillement"
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Graphique des métriques système */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Métriques Système</h4>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="dateLabel" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={formatTooltip}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="debit" 
                stroke="#06b6d4" 
                strokeWidth={2}
                name="Débit"
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="niveau_eau" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Niveau d'eau"
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="pression" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Pression"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;