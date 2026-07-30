module powerchain::pwrc {
    use sui::coin::{Self, TreasuryCap};
    use sui::url::{Self, Url};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    public struct PWRC has drop {}

    fun init(witness: PWRC, ctx: &mut TxContext) {
        let (treasury, metadata) = coin::create_currency(
            witness,
            9,
            b"PWRC",
            b"PowerChain",
            b"Utility token for renewable energy, settlement, governance and protocol services.",
            option::some<Url>(url::new_unsafe_from_bytes(b"https://powerchain.com/token/pwrc")),
            ctx,
        );
        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury, tx_context::sender(ctx));
    }

    public fun mint(cap: &mut TreasuryCap<PWRC>, amount: u64, recipient: address, ctx: &mut TxContext) {
        transfer::public_transfer(coin::mint(cap, amount, ctx), recipient);
    }
}
