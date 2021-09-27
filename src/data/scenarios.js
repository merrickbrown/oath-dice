// Used for loading JSON modules
const modules = import.meta.glob("./scenarios/dd*/*.json");

export const RANGES = {
  aw: { min: 1, max: 17 },
  adm: { min: -6, max: 6 },
  dd: { min: 0, max: 10 },
  dw: { min: 0, max: 17 }
};

export async function findScenario(adm, aw, dd, dw) {
  const file = `./scenarios/dd${dd}/scenarios_dd${dd}_adm${adm}.json`;
  const mod = modules[file];
  const scens = (await mod()).default;
  return scens.find(
    s => s.scenario.attackWarbands === aw && s.scenario.defenseWarbands === dw
  );
}
