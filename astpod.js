const { Discord, Client, MessageEmbed, WebhookClient  } = require("discord.js");
const client = new Client({ _tokenType: "Bot" });
const moment = require("moment");
const db = require("quick.db");
moment.locale("tr");


client.on('ready', () => {
  client.user.setPresence({ activity: { name: "Astpod 🖤 Github" }, status: "idle" });
  console.log('Hazır !');
});

const ayar = {
  sunucu: '', //sunucu id
  prefix: '.', //prefix
  owners: [''], //bot owner
  token: '', // bot token
  "botc": [""], //register yetkili id
  "erkek": [''], //erkek rol id
  "kız": [''], //kız rol id
  "unregister": [''], //unregister rol id
  "tag": "", //tagınız
  "tagsıztag": "", //tagsıztagınız
  
};


client.on("message", async (message) => {
  if (message.channel.type === "dm") return;
  if (message.guild.id !== ayar.sunucu) return;
  if (message.author.bot) return;
  let b = new RegExp(`^<@!${client.user.id}>`);
  let prefix = message.content.match(b) ? message.content.match(b)[0]: ayar.prefix.toLowerCase();
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  var author = message.guild.member(message.author);
  let uye = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
  
  switch (command) {
    case "eval":
      if (!ayar.owners.includes(author.id)) return;
      if (!args[0] || args[0].includes("qwe")) return;
      const code = args.join(" ");
      try {
        var evaled = clean(await eval(code));
        if (evaled.match(new RegExp(`${client.token}`, "g"))) evaled.replace("token", "xd").replace(client.token, "xd");
        message.channel.send(`${evaled.replace(client.token, "xd")}`, {
          code: "js",
          split: true 
        }).catch(err => message.channel.send(err.message));
      } catch (err) {
        message.channel.send(err, { code: "js", split: true });
      };
      break;
    case "k":
    case "kız":
    case "kadın":
    case "kiz":
    case "kadin":
    case "karı":
    case "kari":
    if (!author.roles.cache.get(ayar.botc) && !author.permissions.has("MANAGE_ROLES")) return message.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
    if (!uye) return message.channel.send(client.uyeEmbed(message)).then(m => m.delete({ timeout: 5000 }));
    let isim = args.slice(1).join(" | ").replace("_", " ");
    if (!isim) return message.channel.send("**Bir isim girmelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (uye.user.username.includes(ayar.tag)) {
    await uye.setNickname(`${ayar.tag} ${isim}`).catch(err => message.channel.send(err.message));
      } else {
     await uye.setNickname(`${ayar.tagsıztag} ${isim}`).catch(err => message.channel.send(err.message));
      };
      if (uye.roles.cache.get(ayar.unregister)) {
      await uye.roles.add(ayar.kız);
      await uye.roles.remove(ayar.unregister);
      await message.channel.send(client.embed(`${uye} adlı üye başarılı şekilde kayıt edildi`)).then(m => m.delete({ timeout: 5000 }));
      await db.add(`teyit.${author.id}.kız`, 1);
      await db.push(`isimler_${uye.id}`, `\`${ayar.tag} ${isim}\` - (<@&${ayar.kız[0]}>)`);
    } else {
      await uye.roles.add(ayar.kız);
      await uye.roles.remove(ayar.erkek);
      await message.channel.send(client.embed(`${uye} adlı üye başarılı şekilde kayıt edildi`)).then(m => m.delete({ timeout: 5000 }));
    };
      break;
    case "erkek":
    case "e":
    if (!author.roles.cache.get(ayar.botc) && !author.permissions.has("MANAGE_ROLES")) return message.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
    if (!uye) return message.channel.send(client.uyeEmbed(message)).then(m => m.delete({ timeout: 5000 }));
    let nick = args.slice(1).join(" | ").replace("_", " ");
    if (!nick) return message.channel.send("**Bir isim girmelisin.**").then(m => m.delete({ timeout: 5000 }));
    if (uye.user.username.includes(ayar.tag)) {
    await uye.setNickname(`${ayar.tag} ${nick}`).catch(err => message.channel.send(err.message));
      } else {
     await uye.setNickname(`${ayar.tagsıztag} ${nick}`).catch(err => message.channel.send(err.message));
      };
      if (uye.roles.cache.get(ayar.unregister)) {
      await uye.roles.add(ayar.erkek);
      await uye.roles.remove(ayar.unregister);
      await message.channel.send(client.embed(`${uye} adlı üye başarılı şekilde kayıt edildi`)).then(m => m.delete({ timeout: 5000 }));
      await db.add(`teyit.${author.id}.erkek`, 1);
      await db.push(`isimler_${uye.id}`, `\`${ayar.tag} ${isim}\` - (<@&${ayar.erkek[0]}>)`);
    } else {
      await uye.roles.add(ayar.erkek);
      await uye.roles.remove(ayar.kız);
      await message.channel.send(client.embed(`${uye} adlı üye başarılı şekilde kayıt edildi`)).then(m => m.delete({ timeout: 5000 }));
    };
      break;
    case "isim":
    case "i":
    case "nick":
  if (!author.permissions.has("MANAGE_ROLES") && !author.roles.cache.get(ayar.botc)) return message.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return message.channel.send(client.uyeEmbed(message)).then(msj => msj.delete({timeout: 5000 }));
  let astpod = args.slice(1).join(" | ");
  if (!astpod) return ayar.channel.send("**Bir isim girmelisin.**").then(msj => msj.delete({ timeout: 5000 }));
  let tag = uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.tagsıztag === "" ? ayar.tag : ayar.tag);
  
  await uye.setNickname(`${tag} ${astpod}`).catch(err => message.channel.send(err.message));
  await message.channel.send(client.embed(`**Üyenin ismi "${tag} ${astpod}" olarak ayarlandı!**`)).then(msj => msj.delete({ timeout: 5000 }));
      break;
    case "isimler":
        if (!author.roles.cache.get(ayar.botc) && !author.permissions.has("MANAGE_ROLES")) return message.channel.send("**Gerekli yetkiye sahip değilsin.**").then(m => m.delete({ timeout: 5000 }));
  if (!uye) return message.channel.send(client.uyeEmbed(message)).then(m => m.delete({ timeout: 5000 }));
  const isimler = db.get(`isimler_${uye.id}`) || ["**Üyenin veritabanında kayıtlı bir ismi yok**"];
  var arr = [];
  for (var i = 0; i < isimler.length; i++) {
    arr.push(`\`${i + 1}.\` ${isimler[i]}`);
  };
  message.channel.send({embed:{author:{name: message.guild.name, icon_url:message.guild.iconURL({dynamic:true})},description:arr.join("\n"), color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)], timestamp:new Date()}});
      break;
    case "topteyit":
    case "tt":
    case "teyitop":
   let data = db.get("teyit") || {};
  var arr = Object.keys(data);
  var sayi = args[0] || 10;
  let list = arr.filter(dat => message.guild.members.cache.has(dat)).sort((a,b) => Number((data[b].erkek || 0) + (data[b].kız || 0)) - Number((data[a].erkek || 0) + (data[a].kız || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} | \`${client.sayilariCevir((data[value].erkek || 0) + (data[value].kız || 0))} teyit\``).splice(0, sayi);
  
  message.channel.send({
    embed: {
      author: { name: message.guild.name, icon_url: message.guild.iconURL({dynamic:true}) },
      description: `**En çok teyit yapan \`${sayi}\` kişi:**\n\n${list.join("\n") || "Yok !"}`,
      color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
      timestamp: new Date()
    }
  }).catch();
      break;
  }
});

const clean = text => {
    if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 0 });
	  text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
};
client.favoriRenkler = new Array("#dc143c","#1f0524", "GOLD", "#0b0067","#4a0038","#07052a","#FFDF00","#00FFFF","#0091CC","#0047AB","#384B77","#04031a","#f9ffba","#FD0061","#4B0082","#0000FF","#00FFFF","#000080","#FFFACD","#F8F8FF","#160101","#901F76","#7FFFD4", "#36393f");

client.uyeEmbed = (message) => {
    return {
      embed: {
        author: { name: message.guild.member(message.author).displayName, icon_url: message.author.avatarURL({dynamic: true}) },
        description: `**Bir kullanıcı etiketlemelisin. Örnek:** \`@Astpod/ID\``,
        color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
      }
    };
  };
    
client.embed = (message, msj) => {
    return {
      embed: {
        description: message,
        color: client.favoriRenkler[Math.floor(Math.random() * client.favoriRenkler.length)],
        timestamp: new Date()
      }
    };
  };


process.on("uncaughtExpection", function (err) {
if (err) console.error(err);
});


client.login(ayar.token);
