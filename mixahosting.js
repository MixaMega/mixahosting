Game.MOTD = "This set is hosted by MixaHosting using node-hill " + Game.version + " bit.ly/mixahost"
MODERATORS = [184808,158652,21633]
//Game.cheatsAdmin.owners = [ hosterid ]
Game.command("sd", (caller) => {
    if (MODERATORS.includes(caller.userId) || caller.admin) {
        console.log("Game was shut down by a game moderator.")
        Game.shutdown()
    }
})

Game.setDataLoaded().then(() => { 
    if(process.send){
        process.send("MixaHosting::GameID "+Game.setData.id)
    }
})