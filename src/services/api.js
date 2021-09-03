import axios from "../../node_modules/axios"


// get user profile from github from the username
export async function getGithubUser(userName) {
    try {
        const response = await axios.get(`https://api.github.com/users/${userName}`);
        return response.data
    } catch (error) {
        console.log(error);
        return []

    }
}

//Get user activities from github from the username
export async function getUserActivities(userName) {
    try {
        const response = await axios.get(`https://api.github.com/users/${userName}/events?page=1`);
        console.log(`getUserActivities`);
        return response.data
    } catch (error) {
        console.log(` error getUserActivities`);
        return []
    }
}

//Get user activities
export async function getRepo(repoUrl) {
    var add = {}
    try {
        const response = await axios.get(`${repoUrl}`);
        add = { full_name: response.data.full_name };
        add.description = response.data.description
        add.html_url = response.data.html_url
        const user = await getGithubUser(response.data.owner.login)
        const infor = {...add, ...user }
        return infor
    } catch (error) {
        console.log(error);
        return error
    }
}    