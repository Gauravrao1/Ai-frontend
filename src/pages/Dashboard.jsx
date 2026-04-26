import BiasChart from '../components/BiasChart'
import ComparisonTable from '../components/ComparisonTable'
import InsightPanel from '../components/InsightPanel'
import MetricCard from '../components/MetricCard'
import RiskGauge from '../components/RiskGauge'

export default function Dashboard({ analysis, mitigation, explanation }) {
  if (!analysis) {
    return (
      <div className="glass-panel rounded-[2rem] p-8 text-center text-slate-300">
        Upload a CSV to view results.
      </div>
    )
  }

  const beforeMetrics = analysis.metrics || {}
  const afterMetrics = mitigation?.after?.metrics || null

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Executive snapshot</div>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">Key fairness indicators</h2>
          </div>
          <div className="hidden rounded-full border border-slate-700/70 bg-slate-950/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300 lg:block">
            Live analysis
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
        <MetricCard
          label="Fairness score"
          value={`${analysis.fairness_score?.toFixed?.(0) ?? analysis.fairness_score}%`}
          hint="Higher is better."
          accent="accent"
        />
        <MetricCard
          label="Model accuracy"
          value={`${(analysis.model_accuracy * 100).toFixed(1)}%`}
          hint="Shown with fairness."
          accent="info"
        />
        <MetricCard
          label="Privileged group"
          value={analysis.privileged_group}
          hint="Highest selection rate."
          accent="warning"
        />
        <MetricCard
          label="Unprivileged group"
          value={analysis.unprivileged_group}
          hint="Most impacted group."
          accent="danger"
        />
      </div>
      </section>

      <section className="space-y-4">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Visual breakdown</div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">Charts and risk signal</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <BiasChart groupMetrics={analysis.group_metrics} beforeMetrics={beforeMetrics} afterMetrics={afterMetrics} />
          <RiskGauge riskScore={analysis.bias_risk_score} fairnessScore={analysis.fairness_score} />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Comparison and guidance</div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">Before / after and recommendations</h2>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <ComparisonTable before={analysis} after={mitigation?.after} delta={mitigation?.delta} />
          <InsightPanel
            title={explanation?.title}
            summary={explanation?.summary}
            actionItems={explanation?.action_items || analysis.mitigation_suggestions || []}
            riskLevel={explanation?.risk_level || (analysis.bias_risk_score > 70 ? 'high' : analysis.bias_risk_score > 35 ? 'medium' : 'low')}
          />
        </div>
      </section>

      {mitigation ? (
        <section className="glass-panel rounded-[2rem] p-6">
          <div className="mb-4">
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Mitigation notes</div>
            <h2 className="mt-2 font-display text-2xl font-semibold text-white">Recommended changes</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {mitigation.recommendations?.map((note) => (
              <div key={note} className="rounded-2xl border border-slate-700/70 bg-slate-950/40 p-4 text-sm text-slate-200">
                {note}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
