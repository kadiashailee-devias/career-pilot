import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

import { fadeUp } from './constants';
import LockedOverlay from './LockedOverlay';
import { GlassPanel } from './ui';

export default function RevealSection({ id, title, icon: Icon, index, unlocked, children }) {
  return (
    <Motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      className="relative"
    >
      <GlassPanel className={`relative overflow-hidden p-5 sm:p-7 ${unlocked ? '' : 'min-h-56'}`}>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`grid h-11 w-11 place-items-center rounded-2xl border ${unlocked ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100' : 'border-white/10 bg-slate-950 text-slate-500'}`}>
              {unlocked ? React.createElement(Icon, { className: 'h-5 w-5' }) : <Lock className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Level {index + 1}</p>
              <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>
            </div>
          </div>
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${unlocked ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100' : 'border-white/10 bg-slate-900 text-slate-500'}`}>
            {unlocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
            {unlocked ? 'Unlocked' : 'Locked'}
          </span>
        </div>

        {unlocked ? (
          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {children}
          </Motion.div>
        ) : (
          <LockedOverlay title={title} />
        )}
      </GlassPanel>
    </Motion.section>
  );
}
