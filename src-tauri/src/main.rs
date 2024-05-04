
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod btp_cli;
use std::vec;

use btp_cli::BtpCli;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Ciao, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn check_btp() -> bool {
    BtpCli::new().is_installed()
}

#[tauri::command]
fn run_command(args: Vec<&str>) -> String {
    BtpCli::new().run(args)
}

#[tauri::command]
fn login(endpoint: &str, username: &str, password: &str, global_account: &str) -> String {
    BtpCli::new().login(endpoint, username, password, global_account)
}

#[tauri::command]
fn logout() -> String {
    BtpCli::new().run(vec!["logout"])
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, check_btp, run_command, login, logout])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
