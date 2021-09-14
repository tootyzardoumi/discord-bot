const Discord = require('discord.js');
const ytdl = require ('ytdl-core');

class musichelper
{
    constructor()
    {
        this.queue = []
        this.status = 'stopped'
    }
    // play song
    playsong(connection,musiccLink)
    {
        this.status = 'playing'
        connection.play(ytdl(musiccLink,{filter: 'audioonly'}).on('finish', () => {

            this.status = 'stopped'
            if(this.queue.length !== 0){
                this.playsong(connection, this.queue.shift())
            }
            else{ 
                connection.disconnect()
            }
        }))
    }

    //add song to queue
    addsongtoqueue(songLink){
        this.queue.push(songLink)
    }
    //check queue
    checkmusicqueue(connection){
        if(this.status === 'playing'){
            return;
        }
        this.playsong(connection,this.queue.shift())
    }
    
    //skip song
    skipsong(connection){
        if(this.queue.length === 0){
            connection.disconnect();
            return;
        }
        this.playsong(connection,this.queue.shift())

        
    }


    //print queue

    printqueue(message){
        const queuemessage = JSON.stringify(this.queue)
        message.reply("Queue Status: /n" + queuemessage)
    }

    queuesong(connection,musiccLink){
        this.addsongtoqueue(musiccLink)
        this.checkmusicqueue(connection)
    }



}
module.exports = musichelper;