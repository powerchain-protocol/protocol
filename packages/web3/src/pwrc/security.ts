export interface SecurityConfiguration {
  readonly protocolMultisigThreshold: number;
  readonly emergencyMultisigThreshold: number;
  readonly upgradeTimelockSeconds: number;
  readonly replayProtectionEnabled: boolean;
  readonly supplyValidationEnabled: boolean;
  readonly eventMonitoringEnabled: boolean;
}

export const DEFAULT_SECURITY_CONFIGURATION: SecurityConfiguration = {
  protocolMultisigThreshold: 3,
  emergencyMultisigThreshold: 2,
  upgradeTimelockSeconds: 48 * 60 * 60,
  replayProtectionEnabled: true,
  supplyValidationEnabled: true,
  eventMonitoringEnabled: true,
};

export function validateSecurityConfiguration(config: SecurityConfiguration): void {
  if (config.protocolMultisigThreshold < 2 || config.emergencyMultisigThreshold < 2) {
    throw new RangeError("Administrative actions require multisig authorization");
  }
  if (config.upgradeTimelockSeconds < 0) throw new RangeError("Timelock cannot be negative");
  if (!config.replayProtectionEnabled || !config.supplyValidationEnabled) {
    throw new Error("Replay protection and supply validation are mandatory");
  }
}
