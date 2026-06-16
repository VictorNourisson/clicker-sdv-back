export enum ConditionType {
  SUPS_TOTAL = "sups_total",
  SUPS_PER_SECOND = "sups_per_second",
  SUPS_PER_CLICK = "sups_per_click",
  PRESTIGE_LEVEL = "prestige_level",
  BATIMENTS_TOTAL = "batiments_total",
}

export function isConditionTypeBatimentQuantite(
  conditionType: string,
): boolean {
  return conditionType.startsWith("batiment_quantite:");
}

export function extractBatimentIdFromCondition(conditionType: string): string {
  return conditionType.replace("batiment_quantite:", "");
}
