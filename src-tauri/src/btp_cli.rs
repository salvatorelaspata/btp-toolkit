use std::process::Command;

pub struct BtpCli {
    command: String,
}

impl BtpCli {
    pub fn new() -> BtpCli {
        BtpCli {
            command: "btp".to_string(),
        }
    }

    pub fn run(&self, args: Vec<&str>) -> String {
        let output = Command::new(&self.command)
            .args(args)
            .output()
            .expect("failed to execute process");
        String::from_utf8(output.stdout).unwrap()
    }

    pub fn login(&self, endpoint: &str, username: &str, password: &str) -> String {
        // streaming the output of the command
        let output = Command::new(&self.command)
            .arg("login")
            .arg("--url")
            .arg(endpoint)
            .arg("--user")
            .arg(username)
            .arg("--password")
            .arg(password)
            .output()
            .expect("failed to execute process");
        String::from_utf8(output.stdout).unwrap()
    }

    pub fn is_installed(&self) -> bool {
        Command::new(&self.command).status().is_ok()
    }
}