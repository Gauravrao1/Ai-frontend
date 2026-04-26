import { RadialBar, RadialBarChart, ResponsiveContainer, PolarAngleAxis } from 'recharts'
import CollapsiblePanel from './CollapsiblePanel'

export default function RiskGauge({ riskScore = 0, fairnessScore = 100 }) {
  const data = [{ name: 'Bias risk', value: riskScore, fill: '#f59e0b' }]

  return (
    <CollapsiblePanel
      eyebrow="Bias risk score"
      title={`${riskScore.toFixed(0)}/100`}
      collapsedHint="Expand to view."
      bodyClassName="mt-4 h-80 w-full"
      maximizedBodyClassName="mt-4 h-[72vh] w-full"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm leading-6 text-slate-300">Higher values mean a stronger risk signal and more urgent mitigation.</div>
        <div className="rounded-full border border-slate-700/80 bg-slate-950/60 px-4 py-2 text-sm text-slate-200">
          Fairness {fairnessScore.toFixed(0)}%
        </div>
      </div>
      <div className="mt-4 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="55%"
            innerRadius="68%"
            outerRadius="100%"
            barSize={18}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background dataKey="value" cornerRadius={30} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
        <div className="mt-4 text-center text-sm text-slate-300">{riskScore.toFixed(0)}/100 bias risk score</div>
    </CollapsiblePanel>
  )
}
