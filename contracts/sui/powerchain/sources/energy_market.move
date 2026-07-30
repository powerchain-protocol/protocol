module powerchain::energy_market {
    use sui::event;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    public struct MarketAdmin has key, store { id: UID, paused: bool }
    public struct EnergyTrade has copy, drop {
        seller: address,
        buyer: address,
        meter_id: vector<u8>,
        watt_hours: u64,
        unit_price_micros: u64,
        renewable: bool,
    }

    fun init(ctx: &mut TxContext) {
        transfer::share_object(MarketAdmin { id: object::new(ctx), paused: false });
    }

    public entry fun settle(
        admin: &MarketAdmin,
        seller: address,
        meter_id: vector<u8>,
        watt_hours: u64,
        unit_price_micros: u64,
        renewable: bool,
        ctx: &mut TxContext,
    ) {
        assert!(!admin.paused, 1);
        assert!(watt_hours > 0, 2);
        event::emit(EnergyTrade {
            seller,
            buyer: tx_context::sender(ctx),
            meter_id,
            watt_hours,
            unit_price_micros,
            renewable,
        });
    }
}
