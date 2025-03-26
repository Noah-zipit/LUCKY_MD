const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUIvQ3V1K0NFa0FEdFBtSi9RVzRMNnE3ZXRZeFhIc1FyMDNRTXp2TEQxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTZmZ1dsclZwN05JNE5yLzJwSVdldFAwMXpiU1pKN1NjbWpSZUdpb2F3ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFUG82dkxjSEdmeTJmdnhkM2I5VEFUVk5MYUZYVXBqZDlpcHNhdnNwSDNBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjd3VHT0U5SGJTWTZKNUNlZzVWUUo0eS8wQ1FjdGRvc3ZCWFRYSTVmZ1hVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNHa1d4ZEJnaGdpM0diZ0R3Z3E1c2luMkl6OHdOMGs1TnZOeWhEOGk5MDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImEwTW5PdnE3dnkwUmVmbCsybnZZWXdGenZkN1pvaWVPc0o2SzFsRktWMWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0JSOS9vZi9nc1B1MWsrUXFVTFRHU2R4VXZVSDE0NkYrUEg3UkFuWFlVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVlp1SkFJT2xHSUQrVWxrL0hha1FDWU95My9tUEFONFMzd0E5NG05UVh4MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRXcXpqZ3hQaWFKRys0b1NRVkw1RXl1b0tmdEFDanJXZ0tmL3lDSm45aVBkeGJGN0FtcVZRMi9MZWlCMW9FdGh5c0hURVBLYTlFcFdRNUVmNkt1c2hnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY0LCJhZHZTZWNyZXRLZXkiOiJBQVZkSDQwNlFaM2grcWg2a2ZtZFVLa2l2UUp5d3Y5enhid1hLTWNpTEM0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjY3MDczMjA5Nzk0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjlCMTkzQ0Y2QUY5MEFDMkIzNkU1MDY5QTNEQTExOEMyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDMwMTEzNDB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjY3MDczMjA5Nzk0QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNFRENDN0E0Q0FFRDkzM0E2RjVCQTFFMUE3QUMxODNCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDMwMTEzNDB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lhaXQvSUJFUHI3a0w4R0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImpvSmk0emtLQVVHcXY1Z3ZDUytDOWJwOFAydzZqNjgrdkVNSkJMQ3RQMzg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjZKdmxEakdTaUYvMHFPMWNFdjM5cUtqNHhOOG90bmdaMlhFMUtacWJrQVIzSWQ0NU9EemhscStXcmQ2VWRQKy9BMmZjVFl4WHdpTkNPbSttOUpQTkFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpTVAvVHpLVGo4Q3pseGcwNUJvMlZ4Q2xYU3IzNGhrT0dIQjVaV0VZYXF2RUZXOFpZVEdLeTF1dXJ0V0pFNXBHVWx5T2FxdkV3dThEdXJsemFHdWZqdz09In0sIm1lIjp7ImlkIjoiNjcwNzMyMDk3OTQ6MUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEwODA2NzU4NDk4NTQ2OjFAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjY3MDczMjA5Nzk0OjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWTZDWXVNNUNnRkJxcitZTHdrdmd2VzZmRDlzT28rdlByeERDUVN3clQ5LyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQzMDExMzM3LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxVSiJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Fred1e/LUCKY_MD',
    OWNER_NAME : process.env.OWNER_NAME || "noah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923164413714",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/7irwqn.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by alpha md',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'no',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/",
    CAPTION : process.env.CAPTION || "✧⁠MD✧",
    BOT : process.env.BOT_NAME || '✧⁠MD✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTI_DELETE_MESSAGE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'no',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

