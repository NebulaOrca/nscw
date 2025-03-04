# ![Scode Scraper](https://pomf2.lain.la/f/o3h7l9il.jpg)

## 🚀 SCODE-SCRAPER

> **Yoo, Sob!** Ini dia **SCODE-SCRAPER**, tool keren buat scraping dan sc bot wa  🌎💻

### 🎯 Fitur Andalan:
- **💻 Profesional** dengan **Dasboard Admin** 🧩
- **🔥 Super Cepat** dengan **Vite** 🚀
- **📜 Syntax Highlight** pake **react-syntax-highlighter** ✨
- **📡 Fetch API** gampang pake **@octokit/rest** 🛰️
- **⚡ Hot Reload** buat pengalaman ngoding yang smooth 😎
- **🎨 Styling fleksibel** dengan **TailwindCSS** 🎭

---

### 📦 Instalasi
Gass langsung install dependencies-nya:
```bash
npm install
```
Atau kalau lu tim **yarn**:
```bash
yarn install
```

### 🛠️ Cara Pakai
🔧 **Mode Developer:**
```bash
npm run dev
```
💡 **Build untuk Produksi:**
```bash
npm run build
```
👀 **Preview hasil build:**
```bash
npm run preview
```
🧐 **Cek Linting biar rapi:**
```bash
npm run lint
```

---

### ⚙️ Pengaturan Installasi
📌 **Masuk ke file `.env`** untuk meletakkan token GitHub API.

📌 **Mengganti Hero Section Background**:
Setelah membuat repository, pergi ke folder `src/pages/home.tsx` lalu edit bagian berikut, menjadi code yang ini:
```ts
{/* Hero Section */}
      <section 
        className="relative py-16 sm:py-24"
        style={{
          backgroundImage: `url('https://example.com/your-background-image.jpg')`, // Ganti dengan URL gambar Anda
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Discover Powerful Web Scrapers & WhatsApp Bots
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Find the perfect tools to automate your tasks and enhance your workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('scrapers')}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'scrapers'
                    ? 'bg-white text-[#5865F2] shadow-lg'
                    : 'bg-[#4752C4]/50 text-white hover:bg-[#4752C4]'
                }`}
              >
                <Code2 size={20} />
                Web Scrapers
              </button>
              <button
                onClick={() => setActiveTab('wabots')}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'wabots'
                    ? 'bg-white text-[#5865F2] shadow-lg'
                    : 'bg-[#4752C4]/50 text-white hover:bg-[#4752C4]'
                }`}
              >
                <Bot size={20} />
                WhatsApp Bots
              </button>
            </div>
          </div>
        </div>
      </section>
```



📌 **Konfigurasi GitHub**:
Setelah membuat repository, pergi ke folder `src/utils/github.ts` lalu edit bagian berikut:
```ts
const owner = 'Nama Github';
const repo = 'Nama Repository Github';
```

📌 **Konfigurasi Database Admin**:
```ts
export async function getUsers(): Promise<User[]> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: '', /*Ubah ke nama file json mu*/
    });

    const fileContent = (response.data as GitHubFileResponse).content;
    const decodedContent = atob(fileContent);
    const userData = JSON.parse(decodedContent);
    return userData.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
```

📌 **Konfigurasi Database Scraper**:
```ts
export async function getScrapers(): Promise<ScraperData[]> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: 'database.json', /*Ubah ke nama file json mu*/
    });

    const fileContent = (response.data as GitHubFileResponse).content;
    const decodedContent = atob(fileContent);
    return JSON.parse(decodedContent);
  } catch (error) {
    console.error('Error fetching scrapers:', error);
    return [];
  }
}
```
```ts
export async function updateScrapers(scrapers: ScraperData[]): Promise<boolean> {
  try {
    const currentFile = await octokit.repos.getContent({
      owner,
      repo,
      path: 'database.json', /*ganti nama file*/
    });

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'database.json', /*ganti nama file*/
      message: 'Update scrapers data',
      content: btoa(JSON.stringify(scrapers, null, 2)),
      sha: (currentFile.data as GitHubFileResponse).sha,
    });

    return true;
  } catch (error) {
    console.error('Error updating scrapers:', error);
    return false;
  }
}
```

📌 **Konfigurasi Database Bot WA**:
```ts
export async function getWaBots(): Promise<WaBotData[]> {
  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: 'database2.json', /*Ubah ke nama file json mu*/
    });

    const fileContent = (response.data as GitHubFileResponse).content;
    const decodedContent = atob(fileContent);
    return JSON.parse(decodedContent);
  } catch (error) {
    console.error('Error fetching WA bots:', error);
    return [];
  }
}
```
```ts
export async function updateWaBots(bots: WaBotData[]): Promise<boolean> {
  try {
    const currentFile = await octokit.repos.getContent({
      owner,
      repo,
      path: 'database2.json', /*Ubah ke nama file json mu*/
    });

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: 'database2.json', /*Ubah ke nama file json mu*/
      message: 'Update WA bots data',
      content: btoa(JSON.stringify(bots, null, 2)),
      sha: (currentFile.data as GitHubFileResponse).sha,
    });

    return true;
  } catch (error) {
    console.error('Error updating WA bots:', error);
    return false;
  }
}
```

---

### 🔗 Tech Stack
🛠️ **Dependencies:**
- React & ReactDOM 💙
- React Router Dom 🚦
- Lucide React (ikon kece) 🎨
- UUID (buat generate ID unik) 🆔
- React Hot Toast (notifikasi mantap) 🔥
- Octokit Rest (mantau repo GitHub) 🐙

⚙️ **Dev Dependencies:**
- ESLint (biar kode bersih) 🧼
- TypeScript (kode makin solid) 🏗️
- TailwindCSS (UI simpel & rapi) 🎨
- Vite (build cepet abis!) ⚡

---

### 🏆 Kontribusi
Mau ikut bantu? Fork repo ini, kasih PR, dan jangan lupa bintang 🌟 biar makin semangat! 🔥

👤 **Kontak:**
📌 Instagram: [@yosepwdd](https://instagram.com/yosepwdd)  
📌 GitHub: [YoshCasaster](https://github.com/YoshCasaster)

🚀 **Let's Code & Scrape Like a Pro!** 🎯

