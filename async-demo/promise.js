const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(1)
        reject(new Error('message'))
    }, 2000)
})

p
    .then(result => console.log('RESULT ', result))
    .catch(err => console.log('ERROR ', err.message))