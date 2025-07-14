import React, { useEffect, useRef } from 'react';

/**
 * Composant PerformanceChart - Affiche les graphiques de performance
 * Utilise Chart.js pour afficher débit, pression, niveau d'eau, consommation et COP
 */
const PerformanceChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !window.Chart) return;

    // Détruire le graphique existant si nécessaire
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    // Préparer les données pour Chart.js
    const labels = data.map(item => item.date);
    const energieData = data.map(item => item.energie_kwh);
    const copData = data.map(item => item.cop);
    const debitData = data.map(item => item.debit);
    const pressionData = data.map(item => item.pression);

    chartInstance.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Consommation (kWh)',
            data: energieData,
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            yAxisID: 'y'
          },
          {
            label: 'COP',
            data: copData,
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            yAxisID: 'y1'
          },
          {
            label: 'Débit (L/min)',
            data: debitData,
            borderColor: 'rgb(245, 158, 11)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            yAxisID: 'y2'
          },
          {
            label: 'Pression (bars)',
            data: pressionData,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            yAxisID: 'y3'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Consommation (kWh)',
              color: 'rgb(59, 130, 246)'
            },
            grid: {
              drawOnChartArea: false,
            },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'COP',
              color: 'rgb(16, 185, 129)'
            },
            grid: {
              drawOnChartArea: false,
            },
          },
          y2: {
            type: 'linear',
            display: false,
            position: 'right',
          },
          y3: {
            type: 'linear',
            display: false,
            position: 'right',
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Performance du système - 7 derniers jours'
          },
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Graphiques de Performance</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
            7 jours
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm">
            30 jours
          </button>
        </div>
      </div>
      
      <div className="relative h-96">
        <canvas ref={chartRef}></canvas>
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-semibold text-blue-700">
            {data.reduce((acc, item) => acc + item.energie_kwh, 0).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">kWh Total</div>
        </div>
        
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-semibold text-green-700">
            {(data.reduce((acc, item) => acc + item.cop, 0) / data.length).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">COP Moyen</div>
        </div>
        
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="text-lg font-semibold text-yellow-700">
            {(data.reduce((acc, item) => acc + item.debit, 0) / data.length).toFixed(0)}
          </div>
          <div className="text-sm text-gray-600">Débit Moyen (L/min)</div>
        </div>
        
        <div className="p-3 bg-red-50 rounded-lg">
          <div className="text-lg font-semibold text-red-700">
            {(data.reduce((acc, item) => acc + item.pression, 0) / data.length).toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">Pression Moy. (bars)</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;