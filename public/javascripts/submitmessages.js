const { timeStamp } = require('console');
const fs = require('fs');
const path = require("path");


// define user class

class user{
    constructor(myinit)
    {
        this.id = myinit.id;
        this.name = myinit.name;
        this.email = myinit.email;
        this.phonenumber= myinit.phonenumber;
        this.categories = myinit.categories;
        this.channels= myinit.channels;
    }
}

// define message class

class message{
    constructor(myinitmessage)
        {
            this.category = myinitmessage.category;
            this.data= myinitmessage.data;
            this.channel = myinitmessage.channel;
        }
        sendmessages()
        {
            subscribers.forEach(user => 
                {  
                    // search for the category in the user.categories
                    if (user.categories.indexOf(this.category) === -1)
                    {
                        //category not found in the subscriber do nothing
                    }
                  else // found!
                    {
                      var currentdate = new Date();
                      var mycurrentdate = currentdate.getDay() + "/" + currentdate.getMonth() + "/" + currentdate.getFullYear() ;
                      var mycurrenttime =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                    // add a logitem for each channel subscribed
                    const subscriberchannels = user.channels;
                    for (let i=0 ; i<subscriberchannels.length; i++)
                          {
                              if (subscriberchannels[i] === this.channel)
                              {
                              // make logitem
                              var logitem = {
                              username: user.name,
                              datesend: mycurrentdate,
                              timesend: mycurrenttime,
                              notificationtype: subscriberchannels[i],
                              category: this.category,
                              messagedata:this.data
                              }; 
                              // add it to the array of logitems 
                              tobepostedloglist.unshift(logitem)
                          }
                          }
                  }
                  }
                
                
                
                );
        }
        
};

//create 3 mockup users
// note: users can be subsribed to up to three categories and up to 3 channels for notifications

const user1 = new user
    (
        {
            id: 1,
            name: "Xemina Alejandra",
            email: "Xemina@gmail.com",
            phonenumber: "1234848484",
            categories: ["Finance", "Sports"],
            channels: ["SMS","E-Mail"]

        }
    );

    const user2 = new user
    (
        {
            id: 2,
            name: "Alejandro Ortiz",
            email: "Alejandro@gmail.com",
            phonenumber: "11833333",
            categories: ["Movies", "Sports","Finance"],
            channels: ["Push","E-Mail","SMS"]

        }
    );

    const user3 = new user
    (
        {
            id: 3,
            name: "Pablo Naranjo",
            email: "pablo234@outlook.com",
            phonenumber: "566594944",
            categories: ["Sports"],
            channels: ["Push"]

        }
    );
    
// create array of subscribers

var subscribers = [user1,user2,user3];
var tobepostedloglist = [];

// the following function gets called when the form on the main page is submitted
function submitmessages(mycategory,mydata)
{
    // Create channel objects
    const smschannel = new message({category: mycategory,data:mydata,channel: "SMS" });
    const pushchannel = new message({category: mycategory,data:mydata,channel: "Push" });
    const emailchannel = new message({category: mycategory,data:mydata,channel: "E-Mail" });
    
    // send messages through the channels
    smschannel.sendmessages();
    pushchannel.sendmessages();
    emailchannel.sendmessages();
    // after the previous calls, now tobepostedloglist is populated with all the messages
    // append the messages to the json file

    fs.readFile(path.resolve(__dirname, '../messageslogfile.json'), (err, data)=>{
        if (err) throw err
        let dataJson = JSON.parse(data) ; //object with your link-data.json file
        // append the messages to datajson and write
        // console.log(tobepostedloglist.concat(dataJson))
        fs.writeFile(path.resolve(__dirname, '../messageslogfile.json'), JSON.stringify(tobepostedloglist.concat(dataJson)), (err)=>{
         if(err) console.log(err);
         tobepostedloglist =[];
         })
    })
    console.log(tobepostedloglist);

}



module.exports = {submitmessages};

