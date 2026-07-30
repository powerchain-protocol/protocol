use powerchain_svm::{INITIALIZE, RECORD_ENERGY, SETTLE_ENERGY, VERSION};

#[test]
fn instruction_discriminators_are_stable() {
    assert_eq!(INITIALIZE, 0);
    assert_eq!(RECORD_ENERGY, 1);
    assert_eq!(SETTLE_ENERGY, 2);
}

#[test]
fn version_is_workspace_beta() {
    assert_eq!(VERSION, "1.0.0-beta.1");
}
