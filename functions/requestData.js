require('dotenv')
const fetch = require('node-fetch')

let date = new Date()

async function requestData(){

    let devices = [{
        from: '351516172864902',
        to: 'wm-single-demo'
    }, {
        from: '351516172866824',
        to: 'wm-compound-demo'
    }]

    devices.forEach(async (set) => {
        try{
            let response = await fetch(`https://connectedwater.ca/api/v2.0/devices/_/migrate_values/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': process.env.UBIDOTS_AUTH_TOKEN
                },
                body: JSON.stringify({
                    from: `~${set.from}`,
                    to: `~${set.to}`
                })
            })
            let data = await response.json()
            if(data.succeed_count && data.succeed_count === 1){
                console.log('Device ' + set.to + ' has been successfuly updated at ' + date)
            }else{
                console.log('There was an error updating the device "' + set.to + ' at ' + date)
            }
        }catch(e){
            console.log('There was an error updating the device "' + set.to + '": ' + e + '. At ' + date)
        }
    })
}

module.exports = requestData