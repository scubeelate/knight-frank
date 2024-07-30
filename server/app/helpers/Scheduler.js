const cron = require('node-cron');
const Employee = require("../models/Employee");
const { fetchUserByEmailWithRetry } = require("./ADUserSync");
const CardRequest = require("../models/CardRequest");

const batchSize = 100;

const task = async () => {
    console.log('AD Sync executed at', new Date());
    
    try {
        let totalEmployees = await Employee.countEmployees();
        let batches = Math.ceil(totalEmployees / batchSize);
        for (let i = 0; i < batches; i++) {
            let start = i * batchSize + 1;
            let end = (i + 1) * batchSize;
            let employees = await Employee.employeeList(start, end);
            for (let employee of employees) {
                let user = await fetchUserByEmailWithRetry(employee.email);
                if(user && Number(user.userAccountControl) === 514){
                    let card = await CardRequest.employeeActiveCard(employee.id)
                    if(card?.length){
                        await CardRequest.updateStatus(card[0].id, 0)
                    }
                } else if(user) {
                    let obj = {
                        email: String(user.mail).toLowerCase(),
                        phone: user.mobile,
                        designation: user.title,
                        name: user.displayName,
                        department: user.department,
                        telephoneNumber: user.telephoneNumber,
                        streetAddress: user.streetAddress,
                        postalCode: user.postalCode,
                        city: user.city,
                        state: user.state,
                        country: user.country,
                        company: user.company
                    }
                    await Employee.updateInfo(employee.id, obj)
                }
            }
        }
    } catch (e) {
        console.log(e)
        console.log('AD Sync Failed At ', new Date());
    }
};

//task()

// Schedule the task to run every night 1 AM
cron.schedule('0 1 * * *', task);

console.log('Scheduler started.');
