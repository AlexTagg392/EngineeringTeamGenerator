const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function appMenu () {
    console.log("Let's build your team!");
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter your name.",
                name: "name"
            },
            {
                type: "input",
                message: "Please enter your employee ID number.",
                name: "id"
            },
            {
                type: "input",
                message: "Please enter your email",
                name: "email"
            },
            {
                type: "input",
                message: "Please enter your Office Number",
                name: "officeNumber"
            },
        ])
        .then(res => {
            const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
            team.push(manager);
            createTeam();
        })
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Do you want to create an engineer, intern or built your team template?',
                name: 'memberChoice',
                choices: ['engineer', 'intern', 'Build Your Team Template']
            }
        ])
        .then(res => {
            switch (res.memberChoice) {
                case 'engineer':
                    addEngineer();
                    break;
                case 'intern':
                    addIntern();
                    break;
                case 'Build Your Team Template':
                    buildTeam();
            }
        })
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter engineer name.",
                name: "name"
            },
            {
                type: "input",
                message: "Please enter your employee ID number.",
                name: "id"
            },
            {
                type: "input",
                message: "Please enter your email",
                name: "email"
            },
            {
                type: "input",
                message: "Please enter your GitHub",
                name: "github"
            },
        ])
        .then(res => {
            const engineer = new Engineer(res.name, res.id, res.email, res.github);
            team.push(engineer);
            createTeam();
        })
    }
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter intern name.",
                name: "name"
            },
            {
                type: "input",
                message: "Please enter your employee ID number.",
                name: "id"
            },
            {
                type: "input",
                message: "Please enter your email",
                name: "email"
            },
            {
                type: "input",
                message: "Please enter your school",
                name: "school"
            },
        ])
        .then(res => {
            const intern = new Intern(res.name, res.id, res.email, res.school);
            team.push(intern);
            createTeam();
        })
    }
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(team), 'utf-8');
    }
    createManager();
}
appMenu();
