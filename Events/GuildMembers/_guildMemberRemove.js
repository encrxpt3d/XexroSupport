const { Events, EmbedBuilder, AuditLogEvent } = require('discord.js')
const { modLogs, memberLogs } = require("../../config.json")

const createEmbed = require("../../Modules/embed.js").new

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member) {
    member.guild.channels.cache.get(memberLogs).send({
      embeds: [createEmbed({
        title: `${member.user.tag} Left`,
        desc: `<@${member.id}> left **${member.guild.name}**.`
      })]
    })

    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberKick
    });

    const log = fetchedLogs.entries.first();
    if (!log) {
      const fetchedLogs2 = await member.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MemberBanAdd
      })
      log = fetchedLogs2.entries.first();
      if (!log) {
        return;
      }
      else {
        const { executor, target, reason } = log;

        if (target.id === member.id) {
          const guild = member.guild
          const channel = guild.channels.cache.get(modLogs)

          if (!channel) return;

          let r = reason ?? 'No reason provided.'

          channel.send({
            embeds: [createEmbed({
              title: `User Banned`,
              desc: `Who was banned: ${member.user.tag}>\nTheir ID: \was banned from the server by <@${executor.id}> for reason:\`${r}\``
            })]
          })
        }
      }
    }
    else {
      const { executor, target, reason } = log;

      if (target.id === member.id) {
        const guild = member.guild
        const channel = guild.channels.cache.get(modLogs)

        if (!channel) return;

        let r = reason ?? 'No reason provided.'

        channel.send({
          embeds: [createEmbed({
            title: `${member.user.tag} Kicked`,
            desc: `<@${member.id}> was kicked from the server by <@${executor.id}> for reason: \`${r}\``
          })]
        })
      }
    }
  }
}