
import type {AssetRate,ElectricityRate} from "@/types/rates";
import {PWRC_INITIAL_PRICE_USD} from "@/config/tokens";

export const MOCK_ASSET_RATES:AssetRate[]=[
  {symbol:"SOL",priceUsd:143.00,change24hPercent:1.82,updatedAt:new Date().toISOString()},
  {symbol:"USDC",priceUsd:1.00,change24hPercent:0.00,updatedAt:new Date().toISOString()},
  {symbol:"PWRC",priceUsd:PWRC_INITIAL_PRICE_USD,change24hPercent:0,updatedAt:new Date().toISOString()}
];

export const DEVNET_ASSET_RATES:AssetRate[]=[
  {symbol:"PWRC",priceUsd:PWRC_INITIAL_PRICE_USD,change24hPercent:0,updatedAt:new Date().toISOString()}
];

export const GLOBAL_ELECTRICITY_RATES:ElectricityRate[]=[
  {id:"fi-day-ahead",countryCode:"FI",region:"Finland",currency:"USD",pricePerKwh:0.089,source:"Demo global rate feed",updatedAt:new Date().toISOString()},
  {id:"de-day-ahead",countryCode:"DE",region:"Germany",currency:"USD",pricePerKwh:0.134,source:"Demo global rate feed",updatedAt:new Date().toISOString()},
  {id:"gb-day-ahead",countryCode:"GB",region:"United Kingdom",currency:"USD",pricePerKwh:0.151,source:"Demo global rate feed",updatedAt:new Date().toISOString()},
  {id:"us-ca-day-ahead",countryCode:"US",region:"California",currency:"USD",pricePerKwh:0.194,source:"Demo global rate feed",updatedAt:new Date().toISOString()},
  {id:"au-nsw-day-ahead",countryCode:"AU",region:"New South Wales",currency:"USD",pricePerKwh:0.126,source:"Demo global rate feed",updatedAt:new Date().toISOString()}
];
