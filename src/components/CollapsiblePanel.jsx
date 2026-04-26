import { Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'

export default function CollapsiblePanel({
  eyebrow,
  title,
  description,
  defaultExpanded = true,
  collapsedHint,
  actions = null,
  allowMaximize = true,
  bodyClassName = 'mt-5',
  maximizedBodyClassName = 'mt-5',
  children,
}) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [maximized, setMaximized] = useState(false)
    ? 'fixed inset-2 z-50 flex max-h-[calc(100vh-1rem)] w-[calc(100vw-1rem)] max-w-none flex-col overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-950/96 p-4 shadow-2xl shadow-black/60 backdrop-blur-xl sm:inset-4 sm:w-[calc(100vw-2rem)] sm:p-5 md:inset-6 md:w-[calc(100vw-3rem)]'
    : 'glass-panel w-full max-w-full overflow-hidden rounded-[2rem] p-4 sm:p-5'
    : 'glass-panel rounded-[2rem] p-5'
      : 'glass-panel rounded-[2rem] p-4 sm:p-5'

  return (
    <>
      {maximized ? (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-pointer bg-slate-950/70"
          onClick={() => setMaximized(false)}
          className="fixed inset-0 z-40 cursor-default bg-slate-950/70"
      <section className={shellClasses}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            {eyebrow ? <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{eyebrow}</div> : null}
            <h3 className="mt-2 text-xl font-display font-semibold text-white">{title}</h3>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          </div>
          <div className="flex items-center gap-2">
            {actions}
            {allowMaximize ? (
              <button
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-500 hover:bg-slate-900/80"
                onClick={() => setMaximized((current) => !current)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-500 hover:bg-slate-900/80"
                aria-expanded={maximized}
                aria-label={maximized ? 'Minimize chart' : 'Maximize chart'}
              >
                {maximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                {maximized ? 'Minimize' : 'Maximize'}
              </button>
            ) : null}
            <button
              className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-500 hover:bg-slate-900/80"
              onClick={() => setExpanded((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:border-slate-500 hover:bg-slate-900/80"
              aria-expanded={expanded}
              aria-label={expanded ? 'Collapse panel' : 'Expand panel'}
            >
              {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              {expanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
        <div className={`min-w-0 ${maximized ? maximizedBodyClassName : bodyClassName}`}>{children}</div>
      {expanded ? (
        <div className={maximized ? maximizedBodyClassName : bodyClassName}>{children}</div>
      ) : collapsedHint ? (
        <div className="mt-4 rounded-2xl border border-slate-700/70 bg-slate-950/40 px-4 py-3 text-sm text-slate-300">
          {collapsedHint}
        </div>
      ) : null}
      </section>
    </>
  )
}