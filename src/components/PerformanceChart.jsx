import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

/**
 * Composant PerformanceChart - Affiche les graphiques de performance
 * Utilise Recharts pour afficher débit, pression, niveau d'eau, consommation et COP
 */
const PerformanceChart = ({ data }) => {
  const [activeChart, setActiveChart] = useState('energie');
  const [timeRange, setTimeRange] = useState('7');

  // Configuration des graphiques
  const chartConfigs = {
    energie: {
      title: 'Consommation Énergétique',
      dataKey: 'energie_kwh',
      color: '#3b82f6',
      unit: 'kWh'
    },
    cop: {
      title: 'Coefficient de Performance (COP)',
      dataKey: 'cop',
      color: '#10b981',
      unit: ''
    },
    debit: {
      title: 'Débit des Pompes',
      dataKey: 'debit',
      color: '#f59e0b',
      unit: 'L/min'
    },
    pression: {
      title: 'Pression du Système',
      dataKey: 'pression',
      color: '#ef4444',
      unit: 'bars'
    }
  };

  const currentConfig = chartConfigs[activeChart];

  // Données formatées pour les graphiques
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('fr-FR', { 
      month: 'short', 
      day: 'numeric' 
    })
  }));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Graphiques de Performance</h2>
        
        {/* Sélecteur de période */}
        <div className="flex gap-2">
          {['7', '30'].map((days) => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                timeRange === days
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {days} jours
            </button>
          ))}
        </div>
      </div>

      {/* Navigation des graphiques */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(chartConfigs).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActiveChart(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeChart === key
                ? 'text-white shadow-lg transform scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: activeChart === key ? config.color : undefined,
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            {config.title}
          </button>
        ))}
      </div>

      {/* Graphique principal */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {currentConfig.title} - {timeRange} derniers jours
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedData}>
              <defs>
                <linearGradient id={`gradient-${activeChart}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentConfig.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={currentConfig.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
                label={{ 
                  value: currentConfig.unit, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: `2px solid ${currentConfig.color}`,
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value} ${currentConfig.unit}`, currentConfig.title]}
                labelStyle={{ color: '#374151' }}
              />
              <Area
                type="monotone"
                dataKey={currentConfig.dataKey}
                stroke={currentConfig.color}
                strokeWidth={3}
                fill={`url(#gradient-${activeChart})`}
                dot={{ fill: currentConfig.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: currentConfig.color, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Statistiques résumées avec animations */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(chartConfigs).map(([key, config]) => {
          const totalValue = key === 'energie' 
            ? data.reduce((acc, item) => acc + item[config.dataKey], 0)
            : data.reduce((acc, item) => acc + item[config.dataKey], 0) / data.length;
          
          return (
            <div 
              key={key}
              className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border-l-4 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer"
              style={{ borderLeftColor: config.color }}
              onClick={() => setActiveChart(key)}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${config.color}20` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: config.color }}
                  />
                </div>
                {activeChart === key && (
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Actif
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold" style={{ color: config.color }}>
                {key === 'energie' ? totalValue.toFixed(1) : totalValue.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                {key === 'energie' ? `${config.unit} Total` : `${config.unit} Moyen`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceChart;