use std::env;

use std::process::Command;
use std::path::Path;

pub struct BtpCli {
    command: String,
    std_args: String,
}

impl BtpCli {
    pub fn new() -> BtpCli {
        let current_dir = env::current_dir();
        let binding = current_dir.unwrap();
        let parent_dir = binding.parent();

        let command = "btp".to_string();

        let mut args = vec![];
        args.push("--config");
        let config_path = BtpCli::get_config_file_path(parent_dir.unwrap());
        args.push(&config_path);
        // command = format!("{} {}", command, args.join(" "));
        BtpCli { command, std_args: args.join(" ")}
    }

    fn get_config_file_path(p: &Path) -> String {
        let path = p.join("config").join("config.json");
        path.to_str().unwrap().to_string()
    }

    pub fn is_installed(&self) -> bool {
        // transform args string to vec<&str>
        let std_args: Vec<&str> = self.std_args.split(" ").collect();
        
        let res = Command::new(&self.command).args(std_args).status().is_ok();
        if !res {
            println!("BTP CLI is not installed");
            return res;
        }

        let std_args: Vec<&str> = self.std_args.split(" ").collect();

        // set configuration btp set config --format json
        Command::new(&self.command)
            .args(std_args)
            .arg("set")
            .arg("config")
            .arg("--format")
            .arg("json")
            .output()
            .expect("failed to execute process");
        // let output_str = String::from_utf8(output.stdout).unwrap();
        // println!("BTP CLI is installed (set config --format json): {}", output_str);
        res
    }

    pub fn login(&self, endpoint: &str, username: &str, password: &str, global_account: &str) -> String {

        let std_args: Vec<&str> = self.std_args.split(" ").collect();
        // https://help.sap.com/docs/btp/btp-cli-command-reference/btp-login
        let output = Command::new(&self.command)
            .args(std_args)
            .arg("login")
            .arg("--url")
            .arg(endpoint)
            .arg("--user")
            .arg(username)
            .arg("--password")
            .arg(password)
            .arg("--subdomain")
            .arg(global_account)
            .output()
            .expect("failed to execute process");
        String::from_utf8(output.stdout).unwrap()
    }

    pub fn run(&self, args: Vec<&str>) -> String {
        let std_args: Vec<&str> = self.std_args.split(" ").collect();
        let output = Command::new(&self.command)
            .args(std_args)
            .args(args)
            .output()
            .expect("failed to execute process");
        // println!("run_command: {:?}", String::from_utf8(output.stdout.clone()).unwrap());
        String::from_utf8(output.stdout).unwrap()
    }
}