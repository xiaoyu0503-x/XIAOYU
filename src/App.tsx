import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { StatCard } from './components/StatCard';
import { ChevronDown, Calendar, Target, TrendingUp, Bell, User, Search, Filter } from 'lucide-react';
import { cn } from './lib/utils';
import { Badge } from './components/ui-elements';

// Mock Data for Top Cards with more details
const TOP_STATS = [
  { 
    title: "新增业绩", 
    value: "¥167,890", 
    trend: 134.8, 
    chartType: "area" as const, 
    chartColor: "#3B82F6"
  },
  { 
    title: "净业绩", 
    value: "¥167,890", 
    trend: 134.8, 
    secondaryTitle: "退费金额",
    secondaryValue: "¥12,340",
    secondaryTrend: -12.5
  },
  { 
    title: "新签", 
    value: "¥160,000", 
    trend: 134.8,
    secondaryTitle: "续费",
    secondaryValue: "¥98,000",
    secondaryTrend: 5.2
  },
  { 
    title: "当月收入预估", 
    value: "¥167,890", 
    trend: 134.8, 
    chartType: "line" as const, 
    chartColor: "#F59E0B"
  },
  { 
    title: "已课消收入", 
    value: "¥400,000", 
    trend: 134.8,
    secondaryTitle: "应消未消收入",
    secondaryValue: "¥76,500",
    secondaryTrend: -2.1
  },
  { 
    title: "新增线索数", 
    value: "32", 
    trend: 134.8,
    secondaryTitle: "新增签约学员",
    secondaryValue: "28",
    secondaryTrend: 8.5
  },
  { 
    title: "平均单课时收款-班课", 
    value: "¥450", 
    trend: 134.8,
    secondaryTitle: "平均单课时收款-1V1",
    secondaryValue: "¥2,130",
    secondaryTrend: -1.2
  },
  { 
    title: "外地教师支援占比", 
    value: "15%", 
    trend: 2.4,
    secondaryTitle: "试听转化率",
    secondaryValue: "35%",
    secondaryTrend: 5.5
  }
];

// Mock Data for Monthly Analysis with varied Completion Rates
const MOCK_MONTHLY_DATA = [
  {
    name: "韩炳哲",
    netPerf: "¥9,211.00",
    target: "¥9,211.00",
    completion: "30%",
    completionStatus: "red",
    newPerfTotal: "¥9,211.00",
    newPerfRate: "30%",
    newLeadsTotal: 8,
    newLeadsHigh: 3,
    newLeadsMed: 3,
    newLeadsLow: 3,
    newLeadsOther: 5,
    newLeadsFocus: 3,
    newLeadsNoFollow: 5,
    newTrialTotal: 8,
    newTrialConverted: 3,
    newTrialUnconverted: 5,
    newFollowUp: 4
  },
  {
    name: "宋路易",
    netPerf: "¥12,450.00",
    target: "¥15,000.00",
    completion: "83%",
    completionStatus: "orange",
    newPerfTotal: "¥10,200.00",
    newPerfRate: "68%",
    newLeadsTotal: 12,
    newLeadsHigh: 4,
    newLeadsMed: 4,
    newLeadsLow: 2,
    newLeadsOther: 2,
    newLeadsFocus: 4,
    newLeadsNoFollow: 1,
    newTrialTotal: 5,
    newTrialConverted: 2,
    newTrialUnconverted: 3,
    newFollowUp: 12
  },
  {
    name: "杨佳",
    netPerf: "¥28,900.00",
    target: "¥25,000.00",
    completion: "115%",
    completionStatus: "green",
    newPerfTotal: "¥30,100.00",
    newPerfRate: "120%",
    newLeadsTotal: 15,
    newLeadsHigh: 8,
    newLeadsMed: 5,
    newLeadsLow: 2,
    newLeadsOther: 0,
    newLeadsFocus: 8,
    newLeadsNoFollow: 0,
    newTrialTotal: 10,
    newTrialConverted: 8,
    newTrialUnconverted: 2,
    newFollowUp: 25
  },
  {
    name: "郭威",
    netPerf: "¥18,200.00",
    target: "¥20,000.00",
    completion: "91%",
    completionStatus: "green",
    newPerfTotal: "¥18,200.00",
    newPerfRate: "91%",
    newLeadsTotal: 9,
    newLeadsHigh: 3,
    newLeadsMed: 3,
    newLeadsLow: 3,
    newLeadsOther: 0,
    newLeadsFocus: 3,
    newLeadsNoFollow: 0,
    newTrialTotal: 4,
    newTrialConverted: 2,
    newTrialUnconverted: 2,
    newFollowUp: 18
  },
  {
    name: "贡琴",
    netPerf: "¥45,000.00",
    target: "¥40,000.00",
    completion: "112%",
    completionStatus: "green",
    newPerfTotal: "¥46,500.00",
    newPerfRate: "116%",
    newLeadsTotal: 20,
    newLeadsHigh: 10,
    newLeadsMed: 8,
    newLeadsLow: 2,
    newLeadsOther: 0,
    newLeadsFocus: 10,
    newLeadsNoFollow: 0,
    newTrialTotal: 15,
    newTrialConverted: 12,
    newTrialUnconverted: 3,
    newFollowUp: 42
  },
  {
    name: "王嘉卿",
    netPerf: "¥8,500.00",
    target: "¥12,000.00",
    completion: "70%",
    completionStatus: "orange",
    newPerfTotal: "¥8,500.00",
    newPerfRate: "70%",
    newLeadsTotal: 6,
    newLeadsHigh: 2,
    newLeadsMed: 2,
    newLeadsLow: 2,
    newLeadsOther: 0,
    newLeadsFocus: 2,
    newLeadsNoFollow: 0,
    newTrialTotal: 3,
    newTrialConverted: 1,
    newTrialUnconverted: 2,
    newFollowUp: 8
  },
  {
    name: "李雷",
    netPerf: "¥32,100.00",
    target: "¥30,000.00",
    completion: "107%",
    completionStatus: "green",
    newPerfTotal: "¥33,000.00",
    newPerfRate: "110%",
    newLeadsTotal: 14,
    newLeadsHigh: 6,
    newLeadsMed: 6,
    newLeadsLow: 2,
    newLeadsOther: 0,
    newLeadsFocus: 6,
    newLeadsNoFollow: 0,
    newTrialTotal: 8,
    newTrialConverted: 6,
    newTrialUnconverted: 2,
    newFollowUp: 28
  },
  {
    name: "韩洁",
    netPerf: "¥5,000.00",
    target: "¥10,000.00",
    completion: "50%",
    completionStatus: "red",
    newPerfTotal: "¥5,000.00",
    newPerfRate: "50%",
    newLeadsTotal: 4,
    newLeadsHigh: 1,
    newLeadsMed: 1,
    newLeadsLow: 2,
    newLeadsOther: 0,
    newLeadsFocus: 1,
    newLeadsNoFollow: 0,
    newTrialTotal: 2,
    newTrialConverted: 0,
    newTrialUnconverted: 2,
    newFollowUp: 5
  }
];

const MOCK_DAILY_DATA = [
  { name: "韩炳哲", total: 666, daily: 66 },
  { name: "宋路易", total: 666, daily: 76 },
  { name: "杨佳", total: 888, daily: 108 },
  { name: "郭威", total: 888, daily: 88 },
  { name: "贡琴", total: 1088, daily: 90 },
  { name: "王嘉卿", total: 666, daily: 66 },
  { name: "李雷", total: 788, daily: 68 },
  { name: "韩洁", total: 289, daily: 88 },
];

const MOCK_ABILITY_ROW = {
  name: "韩炳哲",
  tenure: "1999天",
  leadsHeld: 1100,
  signingRate: 70,
  lossRate: 70,
  avgCycle: "54天",
  oneVoneRate: "30%",
  oneVonePrice: "¥9,211.00",
  classRate: "30%",
  classPrice: "¥9,211.00",
  followUpHigh: "54天",
  followUpMed: "54天",
  followUpLow: "54天",
  trialCount: 8,
  trialConverted: 3,
  trialUnconverted: 5
};

const MOCK_ABILITY_DATA = [
  { ...MOCK_ABILITY_ROW, name: "韩炳哲", tenure: "1999天", leadsHeld: 1100, signingRate: 70, lossRate: 15 },
  { ...MOCK_ABILITY_ROW, name: "宋路易", tenure: "850天", leadsHeld: 890, signingRate: 65, lossRate: 20 },
  { ...MOCK_ABILITY_ROW, name: "杨佳", tenure: "2100天", leadsHeld: 1500, signingRate: 82, lossRate: 10 },
  { ...MOCK_ABILITY_ROW, name: "郭威", tenure: "450天", leadsHeld: 300, signingRate: 55, lossRate: 35 },
  { ...MOCK_ABILITY_ROW, name: "贡琴", tenure: "1200天", leadsHeld: 980, signingRate: 75, lossRate: 18 },
  { ...MOCK_ABILITY_ROW, name: "王嘉卿", tenure: "365天", leadsHeld: 250, signingRate: 45, lossRate: 40 },
  { ...MOCK_ABILITY_ROW, name: "李雷", tenure: "1500天", leadsHeld: 1100, signingRate: 78, lossRate: 12 },
  { ...MOCK_ABILITY_ROW, name: "韩洁", tenure: "120天", leadsHeld: 100, signingRate: 30, lossRate: 60 },
];

const MOCK_PERFORMANCE_DATA = [
  { name: "韩炳哲", values: Array(12).fill("45940") },
  { name: "宋路易", values: Array(12).fill("45940") },
  { name: "杨佳", values: Array(12).fill("45940") },
  { name: "郭威", values: Array(12).fill("45940") },
  { name: "贡琴", values: Array(12).fill("45940") },
  { name: "王嘉卿", values: Array(12).fill("45940") },
  { name: "李雪", values: Array(12).fill("45940") },
  { name: "韩洁", values: Array(12).fill("45940") },
];

const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

function MiniProgressBar({ value, colorClass }: { value: number, colorClass: string }) {
  // Map simple color classes to gradients
  const gradientClass = colorClass.includes('emerald') 
    ? "bg-gradient-to-r from-emerald-400 to-emerald-500" 
    : colorClass.includes('yellow') 
      ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
      : colorClass;

  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", gradientClass)} 
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-slate-600 tabular-nums text-xs font-medium">{value}%</span>
    </div>
  );
}

function CompletionBadge({ status, value }: { status: string, value: string }) {
  const styles = {
    red: "bg-red-50 text-red-700 border-red-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100"
  };
  
  return (
    <Badge className={cn("px-2.5 py-0.5 rounded-full border tabular-nums inline-flex items-center gap-1.5 shadow-sm", styles[status as keyof typeof styles])}>
      {value}
    </Badge>
  );
}

// Helper component for table cells with hover effect
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  tableId: string;
  colIndex: number;
  hoveredState: { table: string, col: number } | null;
  setHoveredState: (state: { table: string, col: number } | null) => void;
  children?: React.ReactNode;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({ 
  tableId, 
  colIndex, 
  hoveredState, 
  setHoveredState, 
  children, 
  className,
  ...props 
}) => {
  const isColHovered = hoveredState?.table === tableId && hoveredState?.col === colIndex;
  // Note: Row hover is handled by the parent <tr> group-hover class
  
  return (
    <td 
      onMouseEnter={() => setHoveredState({ table: tableId, col: colIndex })}
      className={cn(
        className,
        // Base transition
        "transition-colors duration-75",
        // Column hover effect (vertical)
        isColHovered && "bg-blue-100",
        // Intersection effect (darker when both row and col are hovered)
        // We use group-hover (row) + isColHovered (col) to target the intersection
        "group-hover:bg-blue-100", // Row hover (horizontal)
        isColHovered && "group-hover:bg-blue-200" // Intersection
      )}
      {...props}
    >
      {children}
    </td>
  );
};

export default function App() {
  const [hoveredCell, setHoveredCell] = useState<{ table: string, col: number } | null>(null);
  const [abilityView, setAbilityView] = useState<'ability' | 'performance'>('ability');

  return (
    <Layout>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">校区管理</h1>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          <div className="flex items-center text-sm text-slate-500">
            <span className="mr-2">数据更新时间:</span>
            <span className="font-medium text-slate-700 tabular-nums">2026-03-06 14:30:00</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            全部校区
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
        {TOP_STATS.map((stat, i) => (
          <StatCard 
            key={i}
            title={stat.title} 
            value={stat.value} 
            trend={stat.trend} 
            secondaryTitle={stat.secondaryTitle}
            secondaryValue={stat.secondaryValue}
            secondaryTrend={stat.secondaryTrend}
            chartType={stat.chartType}
            chartColor={stat.chartColor}
          />
        ))}
      </div>

      {/* Tabs - Updated Style */}
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
          {['销售过程管理', '服务过程管理', '签约产品分析', '签约渠道分析'].map((tab, i) => (
            <button 
              key={tab}
              className={cn(
                "px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                i === 0 
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
             <Filter className="w-4 h-4" />
             筛选视图
           </button>
           <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-200 transition-colors">
             <TrendingUp className="w-4 h-4" />
             导出报表
           </button>
        </div>
      </div>

      {/* Section 1: Monthly Signing Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            <h2 className="font-bold text-slate-800 text-lg">月度签约分析</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
              <Target className="w-3.5 h-3.5 text-blue-500" />
              定标管理
            </button>
            <div className="h-4 w-px bg-slate-200"></div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              2026年01月
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table 
            className="w-full text-xs text-left border-collapse"
            onMouseLeave={() => setHoveredCell(null)}
          >
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <th rowSpan={2} className="px-4 py-3 font-medium w-24 sticky left-0 bg-slate-50 z-10 border-r border-slate-200 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">姓名</th>
                <th rowSpan={2} className="px-4 py-3 font-medium border-r border-slate-200">净业绩</th>
                <th rowSpan={2} className="px-4 py-3 font-medium border-r border-slate-200">任务标</th>
                <th rowSpan={2} className="px-4 py-3 font-medium w-24 border-r border-slate-200">完成率</th>
                <th colSpan={7} className="px-4 py-2 font-medium text-left border-r border-slate-200 bg-slate-100/50">新增业绩</th>
                <th colSpan={7} className="px-4 py-2 font-medium text-left border-r border-slate-200 bg-slate-100/50">新增线索</th>
                <th colSpan={3} className="px-4 py-2 font-medium text-left border-r border-slate-200 bg-slate-100/50">新增试听人数</th>
                <th rowSpan={2} className="px-4 py-3 font-medium text-left w-24">新增跟进<br/>人数</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                {/* New Performance Sub-columns */}
                {['总', '新签', '续签', '班课', '1V1', '无班型', '试听'].map((h, i) => (
                  <th key={i} className={cn("px-3 py-2 font-medium text-left border-r border-slate-200 bg-slate-50/50")}>{h}</th>
                ))}
                {/* New Leads Sub-columns */}
                {['获得', '意向高', '意向中', '意向低', '其他', '重点关注', '未跟进'].map((h, i) => (
                  <th key={i} className={cn("px-3 py-2 font-medium text-left border-r border-slate-200 bg-slate-50/50")}>{h}</th>
                ))}
                {/* Trial Sub-columns */}
                {['新增试听', '已转化', '未转化'].map((h, i) => (
                  <th key={i} className={cn("px-3 py-2 font-medium text-left border-r border-slate-200 bg-slate-50/50")}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_MONTHLY_DATA.map((row, idx) => (
                <tr key={idx} className="group transition-colors">
                  <TableCell tableId="monthly" colIndex={0} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 font-medium text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">{row.name}</TableCell>
                  <TableCell tableId="monthly" colIndex={1} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-slate-600 border-r border-slate-100 tabular-nums font-medium">{row.netPerf}</TableCell>
                  <TableCell tableId="monthly" colIndex={2} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-slate-600 border-r border-slate-100 tabular-nums">{row.target}</TableCell>
                  <TableCell tableId="monthly" colIndex={3} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 border-r border-slate-100">
                    <CompletionBadge status={row.completionStatus} value={row.completion} />
                  </TableCell>
                  
                  {/* New Performance Data */}
                  <TableCell tableId="monthly" colIndex={4} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-blue-600 font-medium border-r border-slate-100 tabular-nums">{row.newPerfTotal}</TableCell>
                  <TableCell tableId="monthly" colIndex={5} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newPerfRate}</TableCell>
                  <TableCell tableId="monthly" colIndex={6} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newPerfRate}</TableCell>
                  <TableCell tableId="monthly" colIndex={7} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newPerfRate}</TableCell>
                  <TableCell tableId="monthly" colIndex={8} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newPerfRate}</TableCell>
                  <TableCell tableId="monthly" colIndex={9} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newPerfRate}</TableCell>
                  <TableCell tableId="monthly" colIndex={10} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newPerfRate}</TableCell>

                  {/* New Leads Data */}
                  <TableCell tableId="monthly" colIndex={11} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-blue-600 font-medium border-r border-slate-100 tabular-nums">{row.newLeadsTotal}</TableCell>
                  <TableCell tableId="monthly" colIndex={12} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newLeadsHigh}</TableCell>
                  <TableCell tableId="monthly" colIndex={13} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newLeadsMed}</TableCell>
                  <TableCell tableId="monthly" colIndex={14} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newLeadsLow}</TableCell>
                  <TableCell tableId="monthly" colIndex={15} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newLeadsOther}</TableCell>
                  <TableCell tableId="monthly" colIndex={16} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newLeadsFocus}</TableCell>
                  <TableCell tableId="monthly" colIndex={17} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newLeadsNoFollow}</TableCell>

                  {/* Trial Data */}
                  <TableCell tableId="monthly" colIndex={18} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-blue-600 font-medium border-r border-slate-100 tabular-nums">{row.newTrialTotal}</TableCell>
                  <TableCell tableId="monthly" colIndex={19} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newTrialConverted}</TableCell>
                  <TableCell tableId="monthly" colIndex={20} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.newTrialUnconverted}</TableCell>

                  <TableCell tableId="monthly" colIndex={21} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 tabular-nums">{row.newFollowUp}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 2: Sales Daily Data */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-indigo-500 rounded-full"></div>
            <h2 className="font-bold text-slate-800 text-lg">销售日数据</h2>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {['获得新线索', '新增试听线索数', '当日新增业绩', '每日跟进线索人数'].map((tab, i) => (
              <button 
                key={tab}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  i === 0 ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table 
            className="w-full text-xs text-left border-collapse"
            onMouseLeave={() => setHoveredCell(null)}
          >
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <th className="px-4 py-3 font-medium w-24 sticky left-0 bg-slate-50 border-r border-slate-200 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">姓名</th>
                <th className="px-3 py-3 font-medium text-left w-16 bg-slate-100/50 border-r border-slate-200">总</th>
                {Array.from({ length: 31 }).map((_, i) => (
                  <th key={i} className="px-2 py-3 font-medium text-left min-w-[32px] border-r border-slate-100 last:border-r-0">{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_DAILY_DATA.map((row, idx) => (
                <tr key={idx} className="group transition-colors">
                  <TableCell tableId="daily" colIndex={0} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 font-medium text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">{row.name}</TableCell>
                  <TableCell tableId="daily" colIndex={1} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left font-medium text-slate-900 bg-slate-50/50 border-r border-slate-200 tabular-nums">
                    {row.total}
                  </TableCell>
                  {Array.from({ length: 31 }).map((_, i) => (
                    <TableCell key={i} tableId="daily" colIndex={i + 2} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-2 py-3 text-left text-slate-600 border-r border-slate-100 last:border-r-0 tabular-nums">
                      {row.daily}
                    </TableCell>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Consultant Ability Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-purple-500 rounded-full"></div>
              <h2 className="font-bold text-slate-800 text-lg">顾问能力概括</h2>
            </div>
            <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 border border-slate-200 rounded hover:bg-slate-50 shadow-sm">
              90天
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setAbilityView('ability')}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                abilityView === 'ability' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              能力
            </button>
            <button 
              onClick={() => setAbilityView('performance')}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                abilityView === 'performance' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              业绩
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {abilityView === 'ability' ? (
            <table 
              className="w-full text-xs text-left border-collapse"
              onMouseLeave={() => setHoveredCell(null)}
            >
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <th rowSpan={2} className="px-4 py-3 font-medium w-24 sticky left-0 bg-slate-50 border-r border-slate-200 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">姓名</th>
                <th rowSpan={2} className="px-4 py-3 font-medium border-r border-slate-200">在职</th>
                <th rowSpan={2} className="px-4 py-3 font-medium border-r border-slate-200">线索保有量</th>
                <th rowSpan={2} className="px-4 py-3 font-medium w-32 border-r border-slate-200">签约率</th>
                <th rowSpan={2} className="px-4 py-3 font-medium w-32 border-r border-slate-200">丢单率</th>
                <th rowSpan={2} className="px-4 py-3 font-medium border-r border-slate-200">平均签约周期</th>
                <th rowSpan={2} className="px-4 py-3 font-medium border-r border-slate-200">1V1签约占比</th>
                <th rowSpan={2} className="px-4 py-3 font-medium border-r border-slate-200">1V1课时均价</th>
                <th rowSpan={2} className="px-4 py-3 font-medium border-r border-slate-200">班课签约占比</th>
                <th rowSpan={2} className="px-4 py-3 font-medium border-r border-slate-200">班课课时均价</th>
                <th colSpan={3} className="px-4 py-2 font-medium text-left border-r border-slate-200 bg-slate-100/50">平均跟进周期</th>
                <th colSpan={3} className="px-4 py-2 font-medium text-left bg-slate-100/50">试听情况</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                {['高意向', '中意向', '低意向'].map((h, i) => (
                  <th key={i} className={cn("px-3 py-2 font-medium text-left border-r border-slate-200")}>{h}</th>
                ))}
                {['试听人数', '已转化', '未转化'].map((h, i) => (
                  <th key={i} className={cn("px-3 py-2 font-medium text-left", i < 2 && "border-r border-slate-200")}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ABILITY_DATA.map((row, idx) => (
                <tr key={idx} className="group transition-colors">
                  <TableCell tableId="ability" colIndex={0} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 font-medium text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">{row.name}</TableCell>
                  <TableCell tableId="ability" colIndex={1} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-slate-600 border-r border-slate-100 tabular-nums">{row.tenure}</TableCell>
                  <TableCell tableId="ability" colIndex={2} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-slate-600 border-r border-slate-100 tabular-nums">{row.leadsHeld}</TableCell>
                  <TableCell tableId="ability" colIndex={3} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 border-r border-slate-100">
                    <MiniProgressBar value={row.signingRate} colorClass="bg-emerald-400" />
                  </TableCell>
                  <TableCell tableId="ability" colIndex={4} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 border-r border-slate-100">
                    <MiniProgressBar value={row.lossRate} colorClass="bg-yellow-400" />
                  </TableCell>
                  <TableCell tableId="ability" colIndex={5} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-slate-600 border-r border-slate-100 tabular-nums">{row.avgCycle}</TableCell>
                  <TableCell tableId="ability" colIndex={6} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-slate-600 border-r border-slate-100 tabular-nums">{row.oneVoneRate}</TableCell>
                  <TableCell tableId="ability" colIndex={7} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-slate-600 border-r border-slate-100 tabular-nums">{row.oneVonePrice}</TableCell>
                  <TableCell tableId="ability" colIndex={8} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-slate-600 border-r border-slate-100 tabular-nums">{row.classRate}</TableCell>
                  <TableCell tableId="ability" colIndex={9} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-slate-600 border-r border-slate-200 tabular-nums">{row.classPrice}</TableCell>
                  
                  <TableCell tableId="ability" colIndex={10} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.followUpHigh}</TableCell>
                  <TableCell tableId="ability" colIndex={11} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.followUpMed}</TableCell>
                  <TableCell tableId="ability" colIndex={12} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-200 tabular-nums">{row.followUpLow}</TableCell>
                  
                  <TableCell tableId="ability" colIndex={13} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-blue-500 border-r border-slate-100 tabular-nums">{row.trialCount}</TableCell>
                  <TableCell tableId="ability" colIndex={14} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 border-r border-slate-100 tabular-nums">{row.trialConverted}</TableCell>
                  <TableCell tableId="ability" colIndex={15} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-3 py-3 text-left text-slate-600 tabular-nums">{row.trialUnconverted}</TableCell>
                </tr>
              ))}
            </tbody>
            </table>
          ) : (
            <table 
              className="w-full text-xs text-left border-collapse"
              onMouseLeave={() => setHoveredCell(null)}
            >
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-3 font-medium w-24 sticky left-0 bg-slate-50 border-r border-slate-200 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">销售</th>
                  {MONTHS.map((month, i) => (
                    <th key={i} className="px-4 py-3 font-medium text-left border-r border-slate-100 last:border-r-0">{month}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_PERFORMANCE_DATA.map((row, idx) => (
                  <tr key={idx} className="group transition-colors">
                    <TableCell tableId="performance" colIndex={0} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 font-medium text-slate-700 sticky left-0 bg-white z-10 border-r border-slate-200 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
                      {row.name}
                    </TableCell>
                    {row.values.map((val, i) => (
                      <TableCell key={i} tableId="performance" colIndex={i + 1} hoveredState={hoveredCell} setHoveredState={setHoveredCell} className="px-4 py-3 text-left text-slate-600 border-r border-slate-100 last:border-r-0 tabular-nums">
                        {val}
                      </TableCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}
