import React from 'react';
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  trend?: number;
  
  secondaryTitle?: string;
  secondaryValue?: string;
  secondaryTrend?: number;

  chartType?: 'area' | 'line';
  chartColor?: string;
}

const data = [
  { value: 40 },
  { value: 30 },
  { value: 45 },
  { value: 80 },
  { value: 55 },
  { value: 65 },
  { value: 50 },
];

function TrendIndicator({ trend }: { trend?: number }) {
  if (trend === undefined) return null;
  const isPositive = trend > 0;
  return (
    <div className={cn(
      "flex items-center text-xs font-medium tabular-nums",
      isPositive ? "text-emerald-600" : "text-red-600"
    )}>
      {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
      {Math.abs(trend)}%
    </div>
  );
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  trend, 
  secondaryTitle,
  secondaryValue,
  secondaryTrend,
  chartType, 
  chartColor, 
}) => {
  
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group flex flex-col justify-between min-h-[160px]">
      {/* Header Actions */}
      <div className="absolute top-3 right-3 z-20">
        <button className="text-slate-300 hover:text-slate-500 transition-colors opacity-0 group-hover:opacity-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Metric (Top) */}
      <div className="relative z-10 mb-4">
        <h3 className="text-slate-500 text-xs font-medium tracking-wide mb-1">{title}</h3>
        <div className="flex flex-col items-start gap-1">
          <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{value}</span>
          <TrendIndicator trend={trend} />
        </div>
      </div>

      {/* Divider if secondary exists */}
      {secondaryTitle && <div className="h-px bg-slate-100 w-full my-2 relative z-10"></div>}

      {/* Secondary Metric (Bottom) */}
      {secondaryTitle && (
        <div className="relative z-10">
          <h3 className="text-slate-500 text-xs font-medium tracking-wide mb-1">{secondaryTitle}</h3>
          <div className="flex flex-col items-start gap-1">
             <span className="text-lg font-semibold text-slate-700 tracking-tight tabular-nums">{secondaryValue}</span>
             <TrendIndicator trend={secondaryTrend} />
          </div>
        </div>
      )}

      {/* Mini Chart (Optional - positioned absolutely or integrated) */}
      {chartType && !secondaryTitle && (
         <div className="absolute bottom-0 left-0 right-0 h-24 w-full opacity-90">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`color-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    cursor={{ stroke: chartColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '4px 8px', fontSize: '12px' }}
                    itemStyle={{ color: chartColor, fontWeight: 600 }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={chartColor} 
                    fillOpacity={1} 
                    fill={`url(#color-${title.replace(/\s+/g, '')})`} 
                    strokeWidth={2}
                    activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff', fill: chartColor }}
                  />
                </AreaChart>
              ) : (
                <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                  <Tooltip 
                    cursor={{ stroke: chartColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '4px 8px', fontSize: '12px' }}
                    itemStyle={{ color: chartColor, fontWeight: 600 }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={chartColor} 
                    strokeWidth={3} 
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff', fill: chartColor }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
      )}
      
      {/* Decorative background gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}
