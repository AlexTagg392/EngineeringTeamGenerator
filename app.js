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
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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
                name: "github"
            },
        ])
        .then(res => {
            const intern = new Intern(res.name, res.id, res.email, res.school);
            team.push(intern);
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
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
