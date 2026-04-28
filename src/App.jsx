import React, { useState } from 'react';
import { Plus, Trash2, Calculator, Target, AlertCircle, CheckCircle2 } from 'lucide-react';

const App = () => {
  const [targetGrade, setTargetGrade] = useState(80);
  const [finalWeight, setFinalWeight] = useState(50);
  const [components, setComponents] = useState([
    { id: 1, name: 'Mid Term', weight: 20, score: 100, total: 100 },
    { id: 2, name: 'Assignment', weight: 30, score: 100, total: 100 },
  ]);

  // Actions
  const addComponent = () => {
    const newId = components.length > 0 ? Math.max(...components.map(c => c.id)) + 1 : 1;
    setComponents([...components, { 
      id: newId, 
      name: `Assessment ${newId}`, 
      weight: 10, 
      score: '', // Newly added components default to empty
      total: 100 
    }]);
  };

  const removeComponent = (id) => {
    setComponents(components.filter(c => c.id !== id));
  };

  const updateComponent = (id, field, value) => {
    setComponents(components.map(c => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  // Calculation Logic
  const safeVal = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  const totalCourseworkWeight = components.reduce((sum, c) => sum + safeVal(c.weight), 0);
  const totalWeight = totalCourseworkWeight + safeVal(finalWeight);
  
  const currentWeightedScore = components.reduce((sum, c) => {
    const weight = safeVal(c.weight);
    const score = safeVal(c.score);
    const total = safeVal(c.total) || 1;
    return sum + ((score / total) * weight);
  }, 0);

  const finalWeightVal = safeVal(finalWeight);
  const percentageNeededOnFinal = finalWeightVal > 0 
    ? ((safeVal(targetGrade) - currentWeightedScore) / (finalWeightVal / 100))
    : 0;

  const handleFocus = (e) => e.target.select();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex items-center gap-3">
          <div className="bg-indigo-600 p-3 rounded-xl shadow-lg">
            <Calculator className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Coursework Calculator</h1>
            <p className="text-slate-500 text-sm">Calculate required final marks based on 100% exam scale</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Assessments</h2>
                <button 
                  onClick={addComponent}
                  className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition-colors text-sm"
                >
                  <Plus size={16} /> Add Section
                </button>
              </div>

              <div className="space-y-3">
                {components.map((comp) => (
                  <div key={comp.id} className="grid grid-cols-12 gap-3 items-end p-4 bg-slate-50 rounded-xl group relative border border-transparent hover:border-slate-200 transition-all">
                    <div className="col-span-12 md:col-span-4">
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Name</label>
                      <input 
                        type="text" 
                        value={comp.name}
                        onChange={(e) => updateComponent(comp.id, 'name', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. Midterm"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Weight %</label>
                      <input 
                        type="number" 
                        value={comp.weight}
                        onFocus={handleFocus}
                        onChange={(e) => updateComponent(comp.id, 'weight', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="col-span-4 md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Your Marks</label>
                      <input 
                        type="number" 
                        value={comp.score}
                        onFocus={handleFocus}
                        onChange={(e) => updateComponent(comp.id, 'score', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Out Of</label>
                      <input 
                        type="number" 
                        value={comp.total}
                        onFocus={handleFocus}
                        onChange={(e) => updateComponent(comp.id, 'total', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-500"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button 
                        onClick={() => removeComponent(comp.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold mb-6">Final Exam & Target</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Final Weight (%)</label>
                  <input 
                    type="number" 
                    value={finalWeight}
                    onFocus={handleFocus}
                    onChange={(e) => setFinalWeight(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Target Grade (%)</label>
                  <input 
                    type="number" 
                    value={targetGrade}
                    onFocus={handleFocus}
                    onChange={(e) => setTargetGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-indigo-600 text-lg"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className={`p-6 rounded-2xl shadow-xl transition-all duration-500 ${percentageNeededOnFinal > 100 ? 'bg-red-600' : 'bg-indigo-600'} text-white`}>
              <div className="flex items-center gap-2 mb-6 opacity-80">
                <Target size={20} />
                <span className="font-medium tracking-wide uppercase text-xs">Required for {safeVal(targetGrade)}% Overall</span>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm opacity-80 uppercase font-bold tracking-tighter">Final Exam Score Needed</div>
                <div className="text-5xl font-black">
                  {Math.max(0, percentageNeededOnFinal).toFixed(1)}%
                </div>
                <div className="text-xs opacity-60 mt-1 italic">Based on a 100% exam scale</div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="opacity-70 uppercase font-bold">Current Contribution:</span>
                  <span className="font-bold">{currentWeightedScore.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="opacity-70 uppercase font-bold">Total Configured Weight:</span>
                  <span className={`font-bold ${totalWeight !== 100 ? 'text-yellow-300 underline' : 'text-white'}`}>
                    {totalWeight}%
                  </span>
                </div>
              </div>
            </div>

            {totalWeight !== 100 && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 text-amber-800 text-sm">
                <AlertCircle className="shrink-0 w-5 h-5 text-amber-600" />
                <p>
                  Total weight is <strong>{totalWeight}%</strong>. Ensure coursework + final weight equals 100% for accuracy.
                </p>
              </div>
            )}

            {percentageNeededOnFinal > 100 ? (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex gap-3 text-red-800 text-sm leading-relaxed">
                <AlertCircle className="shrink-0 w-5 h-5 text-red-600" />
                <p>
                  Target unreachable. You'd need a score of <strong>{percentageNeededOnFinal.toFixed(1)}%</strong> on the final.
                </p>
              </div>
            ) : percentageNeededOnFinal <= 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex gap-3 text-emerald-800 text-sm leading-relaxed">
                <CheckCircle2 className="shrink-0 w-5 h-5 text-emerald-600" />
                <p>
                  <strong>Target Secured!</strong> You've already reached your {targetGrade}% overall grade with your current marks.
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex gap-3 text-blue-800 text-sm leading-relaxed">
                <CheckCircle2 className="shrink-0 w-5 h-5 text-blue-600" />
                <p>
                  To get {targetGrade}% overall, you need at least <strong>{percentageNeededOnFinal.toFixed(1)}%</strong> on your final exam.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;