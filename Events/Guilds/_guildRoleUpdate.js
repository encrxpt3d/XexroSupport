const { Events, EmbedBuilder, AuditLogEvent } = require('discord.js')
const { serverLogs } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.GuildRoleUpdate,
  async execute(oldRole, newRole) {

    const fetchedLogs = await oldRole.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.RoleUpdate
    });

    const log = fetchedLogs.entries.first();
    if (!log) return;
    
    const { executor } = log;
    let desc = `Role: <@&${newRole.id}>\n`
    
    const embed = createEmbed({desc: desc, title: `Role Updated`, timestamp: true, footer: {text: executor.tag, iconURL: executor.displayAvatarURL()}})
    
    if (newRole.name != oldRole.name) {
      desc = desc + `\nOld Name: \`${oldRole.name}\`\nNew Name: \`${newRole.name}\`\n`
    }

    const oldPerms = oldRole.permissions.toArray()
    const newPerms = newRole.permissions.toArray()

    const addedPerms = newPerms.filter(p => !oldPerms.includes(p));
    const removedPerms = oldPerms.filter(p => !newPerms.includes(p));

    addedPerms.forEach(p => {
      desc = desc + `\n❌ \`${p}\` --> ✅ \`${p}\``
    })

    removedPerms.forEach(p => {
      desc = desc + `\n✅ \`${p}\` --> ❌ \`${p}\``
    })

    embed.setDescription(desc)

    const channel = newRole.guild.channels.cache.get(serverLogs)
    channel.send({embeds: [embed]})
    
  }
}