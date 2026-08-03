// Gatekeeper configuration for Premium Wall PLG Flow
// Establishes barriers for advanced stages of video creation and publishing workflows.

export interface GatekeeperConfig {
  stage_6: "PREMIUM_ONLY" | "FREE_PREVIEW";
  stage_7: "PREMIUM_ONLY" | "FREE_PREVIEW";
  fallback: "trigger_pricing_modal" | "none";
}

export const GATEKEEPER_RULES: GatekeeperConfig = {
  stage_6: "PREMIUM_ONLY", // Gated Stage 6 (Download / Raw Export)
  stage_7: "PREMIUM_ONLY", // Gated Stage 7 (Native Publishing Pipeline)
  fallback: "trigger_pricing_modal"
};

/**
 * Checks if a given action/stage is restricted to premium users.
 * @param stage 'stage_6' | 'stage_7' | string
 * @param activeUser The current logged-in user object
 * @returns boolean True if the stage is gated and user is NOT premium
 */
export function isStageRestricted(stage: string, activeUser: any): boolean {
  const isFreeTier = !activeUser || (activeUser.subscription_tier || "").toLowerCase() === "free";
  
  if (stage === "stage_6" || stage === "download") {
    return GATEKEEPER_RULES.stage_6 === "PREMIUM_ONLY" && isFreeTier;
  }
  
  if (stage === "stage_7" || stage === "publish") {
    return GATEKEEPER_RULES.stage_7 === "PREMIUM_ONLY" && isFreeTier;
  }
  
  return false;
}

/**
 * Executes the premium wall check. If restricted, triggers the pricing modal or callback.
 * @param stage 'stage_6' | 'stage_7' | string
 * @param activeUser Current logged-in user object
 * @param triggerModal Callback function to open the pricing modal
 * @returns boolean True if request was blocked, false if allowed
 */
export function checkGatekeeperBarrier(
  stage: string, 
  activeUser: any, 
  triggerModal: (open: boolean) => void
): boolean {
  if (isStageRestricted(stage, activeUser)) {
    if (GATEKEEPER_RULES.fallback === "trigger_pricing_modal") {
      triggerModal(true);
    }
    return true; // Blocked
  }
  return false; // Allowed
}
