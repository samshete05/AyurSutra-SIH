import React, { useState, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Droplets, TrendingUp, AlertCircle, Sparkles } from "lucide-react";

function DoshaBalanceChart({ profile }) {
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateChart(true), 500);
  }, []);

  // Calculate dosha percentages based on profile data
  const calculateDoshaBalance = () => {
    const primaryDosha = profile?.primaryDosha || '';
    const secondaryDosha = profile?.secondaryDosha || '';
    const imbalance = profile?.currentImbalance || '';

    // Default balanced state
    let vata = 33, pitta = 33, kapha = 34;

    // Adjust based on primary dosha
    if (primaryDosha === 'Vata') {
      vata = 50;
      pitta = 25;
      kapha = 25;
    } else if (primaryDosha === 'Pitta') {
      pitta = 50;
      vata = 25;
      kapha = 25;
    } else if (primaryDosha === 'Kapha') {
      kapha = 50;
      vata = 25;
      pitta = 25;
    }

    // Adjust for imbalance
    if (imbalance.toLowerCase().includes('vata')) {
      vata += 15;
      pitta -= 7;
      kapha -= 8;
    } else if (imbalance.toLowerCase().includes('pitta')) {
      pitta += 15;
      vata -= 7;
      kapha -= 8;
    } else if (imbalance.toLowerCase().includes('kapha')) {
      kapha += 15;
      vata -= 7;
      pitta -= 8;
    }

    return [
      { dosha: 'Vata', value: Math.max(0, vata), fullMark: 100, element: 'Air + Ether' },
      { dosha: 'Pitta', value: Math.max(0, pitta), fullMark: 100, element: 'Fire + Water' },
      { dosha: 'Kapha', value: Math.max(0, kapha), fullMark: 100, element: 'Earth + Water' },
    ];
  };

  const data = calculateDoshaBalance();
  const dominantDosha = data.reduce((max, item) => item.value > max.value ? item : max, data[0]);

  // Get recommendations based on dominant dosha
  const getRecommendations = () => {
    const recommendations = {
      Vata: {
        color: 'purple',
        tips: [
          '🌿 Favor warm, cooked foods',
          '🧘 Practice grounding exercises',
          '😴 Maintain regular sleep schedule',
          '🛁 Use warm oil massage (Abhyanga)'
        ]
      },
      Pitta: {
        color: 'red',
        tips: [
          '🥗 Eat cooling foods (cucumber, mint)',
          '🧊 Avoid excessive heat',
          '🧘 Practice calming meditation',
          '🌊 Spend time near water'
        ]
      },
      Kapha: {
        color: 'blue',
        tips: [
          '🏃 Regular physical exercise',
          '🌶️ Add warming spices to food',
          '☀️ Wake up early, avoid oversleeping',
          '🎯 Engage in stimulating activities'
        ]
      }
    };

    return recommendations[dominantDosha.dosha] || recommendations.Vata;
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl p-6 shadow-lg border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-6 h-6 text-purple-600" />
          <h3 className="font-bold text-lg text-slate-900">Dosha Balance Analysis</h3>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          AI-Powered
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="relative">
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis 
                dataKey="dosha" 
                tick={{ fill: '#475569', fontWeight: 600, fontSize: 12 }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Radar
                name="Balance"
                dataKey="value"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.6}
                animationDuration={animateChart ? 1500 : 0}
              />
              <Tooltip 
                content={({ payload }) => {
                  if (payload && payload[0]) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                        <p className="font-semibold text-slate-900">{payload[0].payload.dosha}</p>
                        <p className="text-sm text-slate-600">{payload[0].payload.element}</p>
                        <p className="text-lg font-bold text-purple-600">{payload[0].value}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* Dominant Dosha Badge */}
          <div className="absolute top-2 left-2 bg-white rounded-lg shadow-md p-2 border border-purple-200">
            <p className="text-xs text-slate-600">Dominant</p>
            <p className="font-bold text-purple-700">{dominantDosha.dosha}</p>
            <p className="text-xs text-slate-500">{dominantDosha.value}%</p>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-slate-900">Personalized Tips</h4>
            </div>
            <div className="space-y-2">
              {recommendations.tips.map((tip, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-2 text-sm text-slate-700 hover:shadow-md transition-shadow"
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>

          {profile?.currentImbalance && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-orange-900">Current Imbalance</p>
                  <p className="text-xs text-orange-700 mt-1">{profile.currentImbalance}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dosha Legend */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-purple-50 rounded-lg p-2">
            <p className="text-xs font-semibold text-purple-900">Vata</p>
            <p className="text-[10px] text-purple-600">Movement</p>
          </div>
          <div className="bg-red-50 rounded-lg p-2">
            <p className="text-xs font-semibold text-red-900">Pitta</p>
            <p className="text-[10px] text-red-600">Transformation</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-xs font-semibold text-blue-900">Kapha</p>
            <p className="text-[10px] text-blue-600">Structure</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoshaBalanceChart;
