import inquirer from "inquirer";

interface UserAnswer {
    userID: string;
    userPIN: number;
    accountType: string;
    transactionType: string;
    amount: number;
}

async function startATMconversation() {
    console.log("Welcome to Islamic Bank");

    const answers: UserAnswer = await inquirer.prompt([
        {
            type: "input",
            name: "userID",
            message: "Kindly enter your userID:",
        },
        {
            type: "number",
            name: "userPIN",
            message: "Kindly enter your userPIN:",
        },
        {
            type: "list",
            name: "accountType",
            choices: ["current", "saving"],
            message: "Select your accountType:",
        },
        {
            type: "list",
            name: "transactionType",
            choices: ["Fastcash withdrawal", "Normal withdrawal"],
            message: "Select your transactionType:",
            when: (answers: any) => answers.accountType === "current",
        },
        {
            type: "list",
            name: "amount",
            choices: [1000, 2000, 5000, 10000, 20000],
            message: "Select your amount:",
            when: (answers: any) => answers.transactionType === "Fastcash withdrawal",
        },
        {
            type: "number",
            name: "amount",
            message: "Enter your amount:",
            when: (answers: any) => answers.transactionType === "Normal withdrawal",
        },
    ]);

    if (answers.userID && answers.userPIN) {
        console.log("Processing your request.....");
        const balance = Math.floor(Math.random() * 1000000);
        console.log("Your current balance is: PKR", balance.toLocaleString());
        const enterAmount = answers.amount;

        if (balance >= enterAmount) {
            const remainingBalance = balance - enterAmount;
            console.log("Transaction is successful. Your remaining balance is: PKR", remainingBalance.toLocaleString());
        } else {
            console.log("Insufficient balance. Please try again with a lower amount.");
        }
    }
}

startATMconversation();
