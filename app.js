const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");
const teamMember = [];
const idArray = [];


function menu(){
    function createManager(){
        console.log("Begin building your team")
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "what is your manager name?",
                validate: answer =>{
                    if (answer !== ""){
                        return true;
                    }
                    return "please enter your manager name";
                }

            },{
                type: "input",
                name: "managerId",
                message: "what is your manager id"
                // validate: 
            },{
                type: "input",
                name: "managerEmail",
                message: "what is your manager email"
                // validate:
            },{
                type: "input",
                name: "managerOfficeNum",
                message: "what is your manager office number"
                // validate:
            }
        ]).then(answers => {
            const manager = new Manager(
                answers.managerName, 
                answers.managerId, 
                answers.managerOfficeNum, 
                answers.managerEmail)
            teamMember.push(manager)
            idArray.push(answers.managerId)
            createTeam();
        })
    };
    function createTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "which type fo team member would you like to add",
                choices: ["Engineer", "Intern", "No other members"]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice){
                case "Engineer":
                    addEngineer()
                    break;
                case "Intern":
                    addIntern()
                    break;
                default:
                    buildTeam()
            }
        })
    }
    function addEngineer(){
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "what is your engineers name?"
            },
            {
                type: "input",
                name: "engineerId",
                message: "what is the employee id?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "what is your engineers email?",
            },
            {
                type: "input",
                name: "engineerGitHub",
                message: "what is your engineers github?"
            }

        ]).then(answers => {
            const engineer = new Engineer(
                answers.engineerName, 
                answers.engineerId, 
                answers.engineerEmail, 
                answers.engineerGitHub)
            teamMember.push(engineer)
            idArray.push(answers.engineerId)
            createTeam();
    })
}}

    //do function add intern here
    function addIntern(){
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "what is your interns name?"
            },
            {
                type: "input",
                name: "internId",
                message: "what is the interns id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "what is your interns email?",
            },
            {
                type: "input",
                name: "internSchool",
                message: "where does your intern attend school?"
            }

        ]).then(answers => {
            const intern = new Intern(
                answers.internName, 
                answers.internId, 
                answers.internEmail, 
                answers.internSchool)
            teamMember.push(intern)
            idArray.push(answers.internId)
            createTeam();
    })
}}


    function buildTeam(){
        if (!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMember), "utf-8")
    };
    createManager()


menu()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
