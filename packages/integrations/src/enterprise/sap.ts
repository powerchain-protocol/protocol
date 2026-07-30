
import { IntegrationClient } from "../base.js";

export type SapMeterReading = {
  installationId: string;
  meterId: string;
  timestamp: string;
  valueKwh: number;
  quality: "actual" | "estimated";
};

export class SapEnergyClient extends IntegrationClient {
  constructor(input: { baseUrl: string; accessToken: string }) {
    super({
      baseUrl: input.baseUrl,
      headers: {
        authorization: `Bearer ${input.accessToken}`,
        "content-type": "application/json"
      }
    });
  }

  async businessPartner(partnerId: string) {
    return this.request(`/sap/opu/odata4/powerchain/partners/${encodeURIComponent(partnerId)}`);
  }

  async installations(partnerId: string) {
    return this.request(`/sap/opu/odata4/powerchain/installations?partner=${encodeURIComponent(partnerId)}`);
  }

  async submitMeterReadings(readings: SapMeterReading[]) {
    return this.request("/sap/opu/odata4/powerchain/meter-readings", {
      method: "POST",
      body: JSON.stringify({ readings })
    });
  }
}
