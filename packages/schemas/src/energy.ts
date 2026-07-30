import { z } from "zod";
import { geoPointSchema, idSchema } from "./common.js";
export const energySourceSchema = z.enum(["solar", "wind", "hydro", "geothermal", "biogas", "battery", "grid"]);
export const energyOfferSchema = z.object({ id: idSchema, sellerId: idSchema, source: energySourceSchema, region: z.string().min(2).max(64), location: geoPointSchema, availableKwh: z.number().positive(), pricePerKwh: z.number().nonnegative(), currency: z.string().length(3).default("EUR"), carbonIntensityGco2Kwh: z.number().nonnegative(), status: z.enum(["open", "reserved", "settled", "cancelled"]).default("open"), meterId: z.string().optional(), expiresAt: z.string().datetime({ offset: true }).optional() });
export const createEnergyOfferSchema = energyOfferSchema.omit({ id: true, status: true }).extend({ status: energyOfferSchema.shape.status.optional() });
export const energyQuoteRequestSchema = z.object({ offerId: idSchema, quantityKwh: z.number().positive(), buyerId: idSchema });
export const energyRouteRequestSchema = z.object({ origin: geoPointSchema, destination: geoPointSchema.optional(), demandKwh: z.number().positive(), maxDistanceKm: z.number().positive().max(1000).default(100), preferredSources: z.array(energySourceSchema).default([]), maxCarbonIntensityGco2Kwh: z.number().nonnegative().optional() });
export const localEnergyMapQuerySchema = z.object({ latitude: z.coerce.number().min(-90).max(90), longitude: z.coerce.number().min(-180).max(180), radiusKm: z.coerce.number().positive().max(500).default(50), source: energySourceSchema.optional() });
