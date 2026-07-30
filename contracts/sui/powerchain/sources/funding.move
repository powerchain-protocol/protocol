module powerchain::funding {
    use sui::event;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    public struct Campaign has key, store {
        id: UID,
        owner: address,
        title: vector<u8>,
        goal: u64,
        raised: u64,
        closed: bool,
    }
    public struct Contribution has copy, drop { campaign: address, contributor: address, amount: u64 }

    public entry fun create(title: vector<u8>, goal: u64, ctx: &mut TxContext) {
        assert!(goal > 0, 1);
        transfer::share_object(Campaign {
            id: object::new(ctx), owner: tx_context::sender(ctx), title, goal, raised: 0, closed: false
        });
    }

    public entry fun record(campaign: &mut Campaign, amount: u64, ctx: &mut TxContext) {
        assert!(!campaign.closed && amount > 0, 2);
        campaign.raised = campaign.raised + amount;
        event::emit(Contribution {
            campaign: object::uid_to_address(&campaign.id), contributor: tx_context::sender(ctx), amount
        });
    }
}
