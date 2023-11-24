const userDAO = require('../repository/userDAO')
const cognito = require('../utility/cognito')

async function addUser(user_id, username) {
    try {
        // Add user to dynamodb
        await userDAO.addUser(user_id, username)
        return true
    } catch (err) {
        console.error("Error adding user to db:", err)
        
        return false;
    }
}

// Function to sign up a user through Cognito
async function signUp(username, password, email){
    try {
        // Attempt to sign up user through Cognito
        const result = await cognito.signUp(username, password, email);
        return result; // Return the result if successful
    } catch (error) {
        console.log("error with signing up ", username);
        return false; // Return false if there's an error
    }
}

async function login(username, password) {
    try {
        const result = await cognito.login(username, password)
        return {success: true, result}
    } catch (error) {
        try {
            return {success: false, result: error.message.split(': ')[0]}
        } catch(splitError) {
            return {success: false, result: null} 
        }
    }
}

module.exports = { addUser, signUp, login}