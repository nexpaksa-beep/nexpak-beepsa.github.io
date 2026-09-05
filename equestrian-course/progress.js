/* =========================================================
   Equestrian Fencing Advanced Training — Progress Engine
   Shared across equestrian-course.html, module-1..12.html,
   exam.html and certificate.html. Uses localStorage only —
   no backend required for this static GitHub Pages build.
   ========================================================= */

const EQ_KEY = "eq_fencing_progress_v1";
const TOTAL_MODULES = 12;
const PASS_THRESHOLD = 0.8; // 80%

function eqLoad() {
  try {
    const raw = localStorage.getItem(EQ_KEY);
    if (!raw) throw new Error("none");
    return JSON.parse(raw);
  } catch (e) {
    return {
      completed: [],       // array of module numbers finished
      examScore: null,     // 0-1 fraction
      examPassed: false,
      capstoneSubmitted: false,
      capstoneText: "",
      studentName: "",
      certDate: ""
    };
  }
}

function eqSave(state) {
  localStorage.setItem(EQ_KEY, JSON.stringify(state));
}

function eqIsUnlocked(moduleNum) {
  const state = eqLoad();
  if (moduleNum === 1) return true;
  return state.completed.includes(moduleNum - 1);
}

function eqMarkComplete(moduleNum) {
  const state = eqLoad();
  if (!state.completed.includes(moduleNum)) {
    state.completed.push(moduleNum);
    state.completed.sort((a, b) => a - b);
  }
  eqSave(state);
}

function eqGuardModule(moduleNum) {
  if (!eqIsUnlocked(moduleNum)) {
    window.location.href = "equestrian-course.html?locked=" + moduleNum;
  }
}

function eqAllModulesDone() {
  const state = eqLoad();
  for (let i = 1; i <= TOTAL_MODULES; i++) {
    if (!state.completed.includes(i)) return false;
  }
  return true;
}

function eqResetProgress() {
  localStorage.removeItem(EQ_KEY);
}

function eqRecordExam(scoreFraction, capstoneText) {
  const state = eqLoad();
  state.examScore = scoreFraction;
  state.examPassed = scoreFraction >= PASS_THRESHOLD;
  state.capstoneSubmitted = !!(capstoneText && capstoneText.trim().length > 40);
  state.capstoneText = capstoneText || "";
  eqSave(state);
  return state;
}

function eqIssueCertificate(name) {
  const state = eqLoad();
  state.studentName = name;
  state.certDate = new Date().toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric"
  });
  eqSave(state);
}
