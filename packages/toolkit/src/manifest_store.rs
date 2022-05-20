// Copyright 2021 Adobe
// All Rights Reserved.
//
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
use log::info;
use serde::Serialize;
use std::collections::HashMap;
use wasm_bindgen_test::console_log;
use web_sys::console;

use crate::error::{Error, Result};
// use crate::manifest::ManifestEntry;
use crate::util::log_time;
use c2pa::ManifestStore;

// #[derive(Serialize)]
// #[serde(rename_all = "camelCase")]
// pub struct ManifestStoreResult {
//     active_manifest: Option<String>,
//     manifests: HashMap<String, ManifestEntry>,
// }

fn manifest_store_to_object(manifest_store: &ManifestStore) -> Result<()> {
    log_time("ManifestStore::manifest_store_to_object::start");

    // log::info!("manifest_store.manifests: {:?}", manifest_store.manifests);
    info!("{:?}", manifest_store.manifests);
    console::log_1(&format!("{}", manifest_store).into());

    // let manifests: HashMap<String, ManifestEntry> =
    //     manifest_store.manifests.iter().map(|(key, manifest)| {
    //         log::info!("manifest: {:?}", manifest);
    //     });
    // .claims()
    // .iter()
    // .map(|claim| {
    //     ManifestEntry::from_claim(claim, store, &status)
    //         .map(|entry| (claim.label().to_owned(), entry))
    // })
    // .collect::<Result<_>>()
    // .map_err(|err| Error::ManifestConversion(err.to_string()))?;

    // log_time("ManifestStore::manifest_store_to_object::create_manifest_map");

    Ok(())
    // Ok(ManifestStoreResult {
    //     active_manifest: store.provenance_label(),
    //     manifests,
    // })
}

pub async fn get_manifest_store_data(data: &[u8], mime_type: &str) -> Result<()> {
    // This should take a reference for image bytes and return a Result instead of an Option
    let manifest_store = ManifestStore::from_bytes_async(mime_type, data.to_owned(), true)
        .await
        .unwrap();
    console::log_2(&"got there".into(), &"ok".into());

    log_time("ManifestStore::from_bytes_async");

    // if let Some(manifest_store) = manifest_store {
    manifest_store_to_object(&manifest_store)?;
    // }

    log_time("ManifestStore::from_bytes_async::end");

    Ok(())
}

#[cfg(test)]
pub mod tests {
    use super::*;
    use wasm_bindgen_test::*;

    wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

    #[wasm_bindgen_test]
    pub async fn test_manifest_store_data() {
        let test_asset = include_bytes!("../../../tests/assets/CAICAI.jpg");

        let result = get_manifest_store_data(test_asset, "image/jpeg").await;
        assert!(result.is_ok());
    }

    // #[wasm_bindgen_test]
    // pub async fn test_load_from_memory_async() {
    //     let mut validation_log = DetailedStatusTracker::default();
    //     let test_asset = include_bytes!("../../../tests/assets/CAICAI.jpg");

    //     let result =
    //         Store::load_from_memory_async("image/jpeg", test_asset, true, &mut validation_log)
    //             .await;
    //     assert!(result.is_ok());
    // }
}
