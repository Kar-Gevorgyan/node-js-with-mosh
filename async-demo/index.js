//  ----Callback----

//  Asynchronuous
// console.log('Before')
// getUser(1, (user) => {
//     console.log('User: ', user)
//     getRepositories(user.gitHubUsername, (repos) => {
//         console.log(`${user.gitHubUsername}\'s Repositories: `, repos)
//         getCommits(repos[0], (commits) => {
//             console.log(`Commits of ${repos[0]} repositorie: `, commits)
//             //  CALLBACK HELL
//         })
//     })
// })
// console.log('After')

//  Synchronous
// console.log('Before')
// const user = getUser(1)
// const repos = getRepositories(user.gitHubUsername)
// const commits = getCommits(repos[0])
// console.log('After')

// function getUser(id, callback){
//     setTimeout(()=> {
//         console.log('Reading a user from a database...')
//         callback({id: id, gitHubUsername: 'Mosh'})
//     }, 2000)
// }

// function getRepositories(username, callback){
//     setTimeout(()=> {
//         console.log('Calling GitHub API...')
//         callback(['repo1', 'repo2', 'repo3'])
//     }, 2000)
// }

// function getCommits(repo, callback){
//     setTimeout(()=> {
//         console.log('Reading commits of Repositorie...')
//         callback(['commit1', 'commit2', 'commit3'])
//     }, 2000)
// }

//____________________________________________________________

console.log('Before')

//  ----Promise----

// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log(commits))
//     .catch(err => console.log('Error:', err.message))

//  ----Async and Await----

async function displayCommits(){
    try {
        const user = await getUser(1)
        const repos = await getRepositories(user.gitHubUsername)
        const commits = await getCommits(repos[0])
        console.log('Commits: ', commits)    
    }
    catch (err) {
        console.log('Error; ', err.message)
    }
    }
displayCommits()

console.log('After')

function getUser(id){
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            console.log('Reading a user from a database...')
            resolve({id: id, gitHubUsername: 'Mosh'})
            reject(new Error('message'))
        }, 2000)
    })
}

function getRepositories(username){
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            console.log('Calling GitHub API...')
            resolve(['repo1', 'repo2', 'repo3'])
            reject(new Error('message'))
        }, 2000)
    })
}

function getCommits(repo){
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            console.log('Reading commits of Repositorie...')
            resolve(['commit1', 'commit2', 'commit3'])
            reject(new Error('message'))
        }, 2000)
    })
}