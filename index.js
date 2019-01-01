const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`)
    bot.user.setActivity("Watching You type my commands", {type: "WATCHING" })
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}serverinfo`){
        
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setAuthor(bot.user.username)
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined On", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

        return message.channel.send(serverembed)
    }

    if(cmd === `${prefix}botinfo`){

        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f13")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Bot Was Created On:", bot.user.createdAt)
        .addField("Bots Prefix", bot.user.premium);
        return message.channel.send(botembed);
    }
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}report`){

        //!report @user this is the reason

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't Find A User!");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#15f153")
        .addField("Reported User:", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By:", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel:", message.channel)
        .addField("Time:", message.createdAt)
        .addField("Reason:", reason);

        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);


        return;
    }
});
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}kick`){
        

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Can't find user");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(!kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be Kicked!");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setAuthor(bot.user.username)
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
        .addField("Kicked By:", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Time:", message.createdAt)
        .addField("Reason:", kReason);

        let kickChannel = message.guild.channels.find(`name`, "log-chat");
        if(!kickChannel) return message.channel.send("Can't find log-chat channel.");

        message.guild.member(kUser).kick(kReason)
        kickChannel.send(kickEmbed);

        return;
    }

    if(cmd === `${prefix}ban`){
        
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can't find user");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(!kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be Kicked!");

        let sicon = message.guild.iconURL;
        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Banned~")
        .setAuthor(bot.user.username)
        .setColor("#bc0000")
        .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
        .addField("Banned By:", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time:", message.createdAt)
        .addField("Reason:", bReason);

        let banChannel = message.guild.channels.find(`name`, "log-chat");
        if(!banChannel) return message.channel.send("Can't find log-chat channel.");

        message.guild.member(bUser).ban(bReason)
        banChannel.send(kickEmbed);

        return;
    }
});
bot.login(botconfig.token);