const request = require('request');

const getData = (specificRepo=false) => {
    return p = new Promise((resolve) => {
        var stars = "";
        request('http://api.github.com/orgs/JBossOutreach/repos', 
            { 
            json: true, 
                headers: {
                    'User-Agent': 'request' 
                }
            }, 
            (err, res, body) => {
                if (err) { 
                   resolve("Ouch .. an error occurred");
                    console.log(err); 
                } else {
                    for(let repo of body) {
                        if(specificRepo) {
                            if(repo.name == specificRepo) {
                                resolve(`${repo.name} - ${repo.stargazers_count}stars\n`);
                            }
                        } else {
                            stars += `${repo.name} - ${repo.stargazers_count}stars\n`
                        }
                        
                    }
                    resolve(stars)
                }
            }
        );
    })
}

module.exports = getData