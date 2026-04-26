import CollapsiblePanel from './CollapsiblePanel'

export default function InsightPanel({ title, summary, actionItems = [], riskLevel = 'low' }) {
  const accent = {
    low: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
    medium: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
    high: 'border-red-400/30 bg-red-400/10 text-red-200',
  }[riskLevel] || 'border-slate-600 bg-slate-800/40 text-slate-200'

  return (
    <CollapsiblePanel
      eyebrow="AI insight"
      title={title || 'Fairness explanation'}
      collapsedHint={summary || 'Expand for explanation.'}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Risk level</div>
          <div className={`mt-2 inline-flex rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${accent}`}>
            {riskLevel}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        {summary || 'Upload a dataset to get a human-readable explanation from Gemini.'}
      </p>
      {actionItems.length ? (
        <div className="mt-5 space-y-3">
          {actionItems.map((item, index) => (
            <div key={item} className="rounded-2xl border border-slate-700/70 bg-slate-950/40 p-4 text-sm text-slate-200">
              <div className="mb-2 text-xs uppercase tracking-[0.22em] text-slate-500">Action {index + 1}</div>
              <div className="leading-6">{item}</div>
            </div>
          ))}
        </div>
      ) : null}
    </CollapsiblePanel>
  )
}
