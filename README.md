<div align="center">

# ☀️ A M A T E R A S U ☀️

```text
      █████╗ ███╗   ███╗███████╗████████╗███████╗██████╗  █████╗ ███████╗██╗   ██╗
     ██╔══██╗████╗ ████║██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║   ██║
     ███████║██╔████╔██║█████╗     ██║   █████╗  ██████╔╝███████║███████╗██║   ██║
     ██╔══██║██║╚██╔╝██║██╔══╝     ██║   ██╔══╝  ██╔══██╗██╔══██║╚════██║██║   ██║
     ██║  ██║██║ ╚═╝ ██║███████╗   ██║   ███████╗██║  ██║██║  ██║███████║╚██████╔╝
     ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ 
```

**The Absolute Pinnacle of Telegram Mirroring and Leeching**

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Version-1.1.0-orange?style=for-the-badge&logo=rocket"></a>
  <a href="#"><img src="https://img.shields.io/github/repo-size/its-niloy/Amaterasu?color=FF4500&label=Size&style=for-the-badge"></a>
  <a href="#"><img src="https://img.shields.io/github/license/its-niloy/Amaterasu?style=for-the-badge&color=FF8C00"></a>
  <br>
  <a href="#"><img src="https://img.shields.io/badge/Powered%20By-Python_3.11-blue?style=for-the-badge&logo=python"></a>
  <a href="#"><img src="https://img.shields.io/badge/Deployed_Via-Docker-2496ED?style=for-the-badge&logo=docker"></a>
</p>

[**Telegram Channel**](#) • [**Support Group**](#) • [**Report a Bug**](#)

</div>

---

## 🔮 The Core Concept

**Amaterasu** is not just another Telegram bot—it is a meticulously engineered cloud orchestration system. Designed for power users, it converges top-tier download engines (qBittorrent, Aria2, Sabnzbd, JDownloader) and cloud drives (GDrive, Mega, Rclone) into one cohesive experience entirely controllable from your Telegram DMs.

> [!IMPORTANT]
> **Amaterasu** introduces the **FileToLink Streaming Architecture**, transforming your bot into a blazing-fast media server that delivers byte-seekable stream links straight to VLC, MX Player, or any modern browser.

---

## 💎 Elite Feature Set

<table align="center">
  <tr>
    <td align="center" width="50%">
      <h3>🌐 FileToLink Gateway</h3>
      <p>Instantly spawn HTTP 206 streamable links from Telegram files. Features automated <strong>Multi-Token Load Balancing</strong> to evade FloodWait penalties and keep latency at zero.</p>
    </td>
    <td align="center" width="50%">
      <h3>🎭 Smart Rename Engine</h3>
      <p>Tired of chaotic filenames? Toggle <code>/rename</code> mode to seamlessly intercept any leech task or private PM. Type your new name, and Amaterasu handles the rest before uploading.</p>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <h3>🌩️ Limitless Cloud Integrations</h3>
      <p>Natively pulls from Torrents, Direct Links, Usenet, Mega, and YouTube. Effortlessly dumps to Google Drive, Rclone Remotes, or back to Telegram without breaking a sweat.</p>
    </td>
    <td align="center" width="50%">
      <h3>🛡️ Bulletproof Resilience</h3>
      <p>Built with enterprise-grade queuing, automated retries, dynamic polling intervals, and MongoDB persistence so your configurations and downloads never falter even on restart.</p>
    </td>
  </tr>
</table>

### 🛠️ Advanced Capabilities
- **Extraction & Archiving**: Extract `.zip`, `.rar`, `.7z` automatically, or compress files with passwords before uploading.
- **Dynamic UI**: Features the "Shadowforge v2" dynamic inline UI dashboard. Stop, edit, or track tasks interactively.
- **Customizable User Settings**: Users can set their own thumbnail layouts, leech prefixes/suffixes, and preferred cloud destinations via `/userset`.
- **Hybrid Leech**: Automatically bypass Telegram's file size limits by splitting large files seamlessly.

---

## 📚 Command Guide

Here is your cheat sheet to controlling Amaterasu. Send these commands to your bot in Telegram.

<details>
  <summary><b>☁️ Mirror Commands (Download -> Cloud)</b></summary>
  <br>

  * `/mirror [URL]` - Download a link/torrent and upload it to your Cloud Drive.
  * `/clone [Drive URL]` - Copy a Google Drive file/folder directly to your own Drive.
  * `/ytdl [YouTube URL]` - Download a YouTube video (or playlist) and upload to Cloud.
</details>

<details>
  <summary><b>📥 Leech Commands (Download -> Telegram)</b></summary>
  <br>

  * `/leech [URL]` - Download a link/torrent and upload it directly back to Telegram as a file/video.
  * `/ytdlleech [YouTube URL]` - Download a YouTube video and upload it directly to Telegram.
  * `/rename [Reply to File]` - Rename a Telegram file and upload it back.
</details>

<details>
  <summary><b>⚙️ Control & Settings</b></summary>
  <br>

  * `/status` - View a beautiful inline dashboard of all currently running downloads.
  * `/stats` - View server hardware telemetry (CPU, RAM, Network speeds).
  * `/cancel [Task ID]` - Stop a running download or upload.
  * `/userset` - Open your personal settings panel (thumbnails, upload destinations, prefixes).
  * `/botset` - (Admin Only) Open the core bot configuration dashboard.
</details>

---

## ⚙️ Configuration Variables

Amaterasu requires specific configurations to connect to Telegram and your storage services. These go inside your `config.py`.

### 🛑 Mandatory Variables
* `BOT_TOKEN`: The token you received from [@BotFather](https://t.me/BotFather).
* `OWNER_ID`: Your personal Telegram User ID. You can get this from [@MissRose_bot](https://t.me/MissRose_bot) by sending `/id`.
* `TELEGRAM_API`: Get this from [my.telegram.org](https://my.telegram.org).
* `TELEGRAM_HASH`: Get this from [my.telegram.org](https://my.telegram.org).
* `DATABASE_URL`: Your MongoDB connection string (crucial for saving settings).

### 🟢 Highly Recommended Variables
* `LEECH_DUMP_CHAT`: The Telegram Group or Channel ID (e.g. `-100123456789`) where Amaterasu will upload leeches if you want them stored outside your DMs.
* `GDRIVE_ID`: The ID of your Google Drive folder where you want mirrors to go.
* `USER_SESSION_STRING`: A Pyrogram string session for a User Account. Required if you want the bot to download restricted Telegram files or upload files larger than 2GB (Telegram Premium).

---

## 🚀 Ignition & Deployment

Amaterasu supports zero-friction deployment. Forget manual dependency nightmares—use our polished Docker integration.

### 💻 Containerized VPS Setup (Docker Compose)

> [!TIP]  
> We strongly recommend **Docker Compose** to handle isolated networks and automated restarts flawlessly.

```shell
# 1. Bring down the repository
$ git clone https://github.com/its-niloy/Amaterasu.git && cd Amaterasu

# 2. Architect your configuration
$ cp config_sample.py config.py
$ nano config.py  # Input your Telegram API & Tokens (See Configuration Variables section above)

# 3. Ignite the core (in detached mode)
$ sudo docker-compose up --build -d

# 4. Monitor the pulse
$ sudo docker-compose logs -f
```

<details>
  <summary><b>🛠️ Click here for Advanced Maintenance Commands</b></summary>
  <br>
  
  * **Halt System:** `sudo docker-compose stop`
  * **Revive System:** `sudo docker-compose start`
  * **Update the Bot:** `git pull` then `sudo docker-compose up --build -d`
  * **Purge Orphaned Containers:** `sudo docker container prune`
  * **Nuke Stale Images:** `sudo docker image prune -a`

</details>

### ☁️ Cloud Platforms (PaaS)

Amaterasu’s lightweight, modular skeleton makes it perfect for Heroku, Railway, or Render. Simply fork the repository, connect your PaaS, inject the environment variables matching `config_sample.py`, and spin up your container!

---

## 🧬 Architectural Blueprint

```mermaid
graph TD
    A[Telegram User] -->|Commands / Files| B((Amaterasu Core))
    B --> C{Download Engines}
    C -->|Torrents| D[qBittorrent & Aria2c]
    C -->|Usenet| E[Sabnzbd]
    C -->|Direct/Links| F[JDownloader & yt-dlp]
    B --> G{Storage & Distribution}
    G -->|Cloud Drives| H[Google Drive & Rclone]
    G -->|Direct Download| I[FileToLink Server]
    G -->|Telegram| J[Leech Uploader]
    
    style B fill:#FF4500,stroke:#333,stroke-width:2px,color:#fff
    style A fill:#2496ED,color:#fff
    style I fill:#28a745,color:#fff
```

---

<div align="center">

**[ ☀️ Awaken the Sun. Deploy Amaterasu Today. ☀️ ]**

*If this engine powers your workflow, drop a ⭐ to show your support.*

</div>
