const { Events, AuditLogEvent } = require('discord.js')

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.GuildRoleCreate,
  async execute(role) {
    const fetchedLogs = await role.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.RoleUpdate
    });

    const log = fetchedLogs.entries.first();
    if (!log) return;
    
    const { executor } = log;
    let desc = `Role: ${role}\n`
    
    const embed = createEmbed({desc: desc, title: `Role Created`, timestamp: true, footer: {text: executor.tag, iconURL: executor.displayAvatarURL()}})
    desc = desc + `\Name: \`${role.name}\`\n`

    const perms = role.permissions.toArray()
    perms.forEach(p => {
      desc = desc + `\`${p}\``
    })

    embed.setDescription(desc)

    const channel = newRole.guild.channels.cache.get(serverLogs)
    channel.send({embeds: [embed]})
  }
}