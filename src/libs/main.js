const { invoke } = window.__TAURI__.tauri;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
async function greet(value= "UI5!!!") {
  return await invoke("greet", { name: value });
}

async function check_btp() {
   return await invoke("check_btp");
}

async function get_cli_version() {
  return await invoke("run_command", {args: ['--version']});
}

async function help() {
  return await invoke("run_command", { args: ['--help'] });
}

async function login({endpoint, username, password, globalAccount}) {
  console.log('*******', endpoint, username, password, globalAccount)
  return await invoke("login", { endpoint, username, password, globalAccount });
}

async function target_list() {
  return await invoke("run_command", { args: ['target', '--hierarchy'] });
}

sap.ui.define([], () => {
  return {
    greet,
    check_btp,
    get_cli_version,
    help,
    login,
    target_list
  };
});