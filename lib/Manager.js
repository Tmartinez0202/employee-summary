// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor (name, id, officeNum, email){
        super(name, id, email)
        this.officeNum = officeNum;
    }
    getRoll(){
        return "manager";
    }
    getOfficeNum(){
        return this.officeNum
    }
}

module.exports = Manager;