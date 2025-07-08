# FIVEM_ZAR_discordRoles
A module used to determine roles of players within FiveM via Discord

This will be used specifically at the beginning to map the programming needs.

1. The resource must be able to connect to the discord api gateway
2. The resource must be able to send heartbeats
3. The resource must be able to handle resuming connection to discord in case of failure
4. The resource must be able to receive roles that have been added and removed from discord
5. The resource must be able to add new roles to Database via UI (These should be queued for decision)
5. 1. Upon choice for the role, the database will be updated removing the queue choice.
5. 2. If the role was determined to be an ACL role then the role will be added to the acl database
5. 3. If the role was determined to be an ACL role, update all members that have this role in their role queue field, add it to their active role field and remove it from their role queue field.
6. The resource must be able to receive updated member roles 
6. 1. The resouce must update the database with the updated member roles (add, delete)
6. 2. Roles that have been approved will be added to the members active roles field.
6. 3. Roles that are in queue will be added to the members queued roles field.
7. The resource must be able to remove roles that have been removed from discord from the database
7. 1. The resource must take away any ace privileges from any active user in server with that role  
8. The resource must be able to check user roles on user connect event from Database
9. The resource must allow selecting the allow list and the ban list within the server via UI
10. The resource must be able to discern allow list and ban list users
11. The resource must be able to remove access on member role change
12. The resource must be able to be triggered manually by chosen groups either for full or partial aggregation of users 
13. The resource must handle the disconnect of a user gracefully for not being on the allow list with UI instructions of how to join the whitelist
14. The resource must handle ban list message in one of the following ways
14. 1. If the ban is listed on the server, the reason and length will be displayed with the option to connect to discord to do an appeal.
14. 2. If the ban is not listed but user has the role, the message will be a simple "You have been banned, please reach out to the moderation team for further clarification". With the function setup to connect to the discord.