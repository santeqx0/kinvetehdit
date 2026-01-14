# istemiyorum star fln bidahada proje yok 
### Videosunu felanda atmıyom anladığınız kadar kurun birader




# OxyPortfolio


Demo:https://oxyportfolio.vercel.app/


React, TypeScript ve Tailwind CSS ile geliştirilmiş şık bir kişisel portföy sitesi. Discord profilinizi, anlık Spotify şarkı bilgilerinizi ve daha fazlasını gösterir. Lanyard ile gerçek zamanlı Discord durumu ve Spotify API ile müzik çalma entegrasyonu içerir.

## Özellikler
- **Discord Profili**: Kullanıcı adı, durum, aktiviteler ve rozetler (Nitro, Active Developer vb.) ile dinamik banner.
- **Spotify Entegrasyonu**: Çalan şarkının albüm kapağı, sanatçı ve ilerleme çubuğu.
- **Lanyard Desteği**: Discord durumu, aktiviteler ve banner’ı gerçek zamanlı çeker (`discordlookup.mesalytic.moe` ile).
- **Responsive Tasarım**: Masaüstü ve mobil cihazlarda harika görünüm.
- **Özelleştirilebilir**: Rozet SVG’leri, renkler ve düzen kolayca değiştirilebilir.

## Gereksinimler
- **Node.js**: Sürüm 18 veya üstü (`npm` dahil).
- **Spotify Developer Hesabı**: `client_id`, `client_secret` ve `refresh_token` için.
- **Lanyard**: Gerçek zamanlı Discord verileri için Lanyard Discord sunucusuna katılın (`https://discord.gg/lanyard`).
- **Vercel Hesabı**: Deploy için (`https://vercel.com`).

## Kurulum (Yerel)

1. **Repoyu Klonlayın**:
   ```bash
   git clone https://github.com/hasbutcu/oxyportfolio.git
   cd oxyportfolio
   ```

2. **Bağımlılıkları Kurun**:
   ```bash
   npm install
   ```

3. **Çevre Değişkenlerini Ayarlayın**:
   Proje kök dizininde bir `.env` dosyası oluşturun ve şu şekilde doldurun:
   ```env
    VITE_SPOTIFY_CLIENT_ID=clientidn
    VITE_SPOTIFY_CLIENT_SECRET=clientsecret
    VITE_SPOTIFY_REFRESH_TOKEN=refreshtoken
    VITE_DISCORD_ID=506122365055401999
   ```
   **ÖNEMLİ**: Discord profilinin görünmesi için `VITE_DISCORD_ID` değişkeninin mutlaka ayarlanması gerekir. Discord User ID'nizi almak için Discord Developer Mode'u açıp kullanıcı adınıza sağ tıklayarak "Copy User ID" seçeneğini kullanabilirsiniz.
   - `VITE_SPOTIFY_REFRESH_TOKEN` için aşağıdaki "Spotify Refresh Token Alma" adımlarını takip edin.

4. **Projeyi Çalıştırın**:
   ```bash
   npm run dev
   ```
   Tarayıcınızda `http://localhost:5173` adresine gidin.

## Spotify Refresh Token Alma (Node.js Script)

Spotify’da çalan şarkıyı göstermek için bir `refresh_token`’a ihtiyacınız var. Aşağıdaki adımları izleyerek Node.js script’i ile token’ı alın:

1. **Node.js Script’ini Hazırlayın**:
   - Yeni bir klasör oluşturun (ör. `spotify-token`):
     ```bash
     mkdir spotify-token
     cd spotify-token
     npm init -y
     npm install express axios open querystring
     ```
   - Aşağıdaki script’i `get_spotify_refresh_token.js` olarak kaydedin:
     ```javascript
     const express = require('express');
     const axios = require('axios');
     const open = require('open');
     const querystring = require('querystring');

     const app = express();
     const CLIENT_ID = 'd73120783d1742..';
     const CLIENT_SECRET = '75449b198dd9...';
     const REDIRECT_URI = 'http://localhost:3000/callback';
     const SCOPES = 'user-read-currently-playing';
     const PORT = 3000;

     const AUTH_URL = `https://accounts.spotify.com/authorize?${querystring.stringify({
       response_type: 'code',
       client_id: CLIENT_ID,
       scope: SCOPES,
       redirect_uri: REDIRECT_URI,
     })}`;

     app.get('/', (req, res) => {
       console.log('Spotify yetkilendirme başlatılıyor...');
       res.send('Spotify yetkilendirme sayfasına yönlendiriliyorsunuz...');
       open(AUTH_URL);
     });

     app.get('/callback', async (req, res) => {
       const code = req.query.code || null;
       const error = req.query.error || null;

       if (error) {
         console.error('Yetkilendirme hatası:', error);
         res.send(`Hata: ${error}`);
         return;
       }

       if (!code) {
         console.error('Kod bulunamadı');
         res.send('Hata: Kod eksik');
         return;
       }

       console.log('Kod alındı:', code);

       try {
         console.log('Token alınıyor...');
         const response = await axios.post(
           'https://accounts.spotify.com/api/token',
           querystring.stringify({
             grant_type: 'authorization_code',
             code: code,
             redirect_uri: REDIRECT_URI,
             client_id: CLIENT_ID,
             client_secret: CLIENT_SECRET,
           }),
           {
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
             },
           }
         );

         const { access_token, refresh_token } = response.data;
         console.log('Access Token:', access_token);
         console.log('Refresh Token:', refresh_token);
         console.log('!!! LÜTFEN BU REFRESH TOKEN’I KOPYALAYIN VE .env DOSYASINA EKLEYİN !!!');
         res.send('Token’lar alındı, lütfen terminaldeki refresh token’ı kopyalayın.');
       } catch (err) {
         console.error('Token alırken hata:', err.response ? err.response.data : err.message);
         res.send('Token alırken hata oluştu, terminali kontrol edin.');
       }
     });

     app.listen(PORT, () => {
       console.log(`Server http://localhost:${PORT} adresinde çalışıyor...`);
       console.log('Ana sayfaya giderek yetkilendirme başlatılacak.');
     });
     ```

2. **Script’i Çalıştırın**:
   - Spotify Developer Dashboard’a gidin (`https://developer.spotify.com/dashboard`).
   - Uygulamanızda “Edit Settings” > “Redirect URIs” kısmına `http://localhost:3000/callback` ekleyin.
   - Script’i çalıştırın:
     ```bash
     node get_spotify_refresh_token.js
     ```
   - Tarayıcınız otomatik olarak Spotify yetkilendirme sayfasına yönlendirecek. Spotify hesabınızla giriş yapın ve yetkilendirme yapın.
   - Terminalde şu şekilde bir çıktı göreceksiniz:
     ```
     Server http://localhost:3000 adresinde çalışıyor...
     Spotify yetkilendirme başlatılıyor...
     Kod alındı: AQB...
     Token alınıyor...
     Access Token: BQ...
     Refresh Token: AQNew...
     !!! LÜTFEN BU REFRESH TOKEN’I KOPYALAYIN VE .env DOSYASINA EKLEYİN !!!
     ```
   - `Refresh Token: AQNew...` satırındaki token’ı kopyalayın.
   - `.env` dosyanıza ekleyin:
     ```env
     VITE_SPOTIFY_REFRESH_TOKEN=AQNew...
     ```

## Vercel’e Deploy Etme

Projenizi Vercel’e yükleyerek herkesin erişebileceği bir site haline getirebilirsiniz. Aşağıdaki adımları izleyin:

1. **Vercel Hesabı Oluşturun**:
   - `https://vercel.com` adresine gidin, GitHub hesabınızla kaydolun veya oturum açın.

2. **Repoyu GitHub’a Yükleyin**:
   - Projenizi GitHub’a push edin:
     ```bash
     git add .
     git commit -m "Proje Vercel için hazırlandı"
     git push origin main
     ```
   - `.env` dosyasının GitHub’a yüklenmediğinden emin olun (`.gitignore`’da `.env` olmalı).

3. **Vercel’de Yeni Proje Oluşturun**:
   - Vercel Dashboard’a gidin (`https://vercel.com/dashboard`).
   - “New Project” butonuna tıklayın.
   - GitHub reposunu seçin (ör. `kullanici-adiniz/oxyportfolio`).
   - “Import”’a tıklayın.

4. **Çevre Değişkenlerini Ekleyin**:
   - Vercel proje ayarlarında “Configure Project” kısmında:
     - “Environment Variables” sekmesine gidin.
     - Şu değişkenleri ekleyin:
       ```env
       VITE_SPOTIFY_CLIENT_ID=d73120783d17...
       VITE_SPOTIFY_CLIENT_SECRET=75449b198dd...
       VITE_SPOTIFY_REFRESH_TOKEN=AQNew... # Yukarıdaki script’ten aldığınız token
       ```
     - “Add” butonuna tıklayın ve kaydedin.

5. **Projeyi Deploy Edin**:
   - “Deploy” butonuna tıklayın.
   - Vercel, projeyi otomatik olarak build eder ve bir URL verir (ör. `https://oxyportfolio.vercel.app`).
   - Deploy tamamlandığında URL’ye gidin, sitenizin çalıştığını kontrol edin.

## Katkıda Bulunma
Yeni özellikler, hata düzeltmeleri veya iyileştirmeler için issue açabilir veya pull request gönderebilirsiniz!

## Lisans
MIT Lisansı. Detaylar için `LICENSE` dosyasına bakın.

## Hata çözümleri için discord.gg/vsc

[![Discord Banner](https://api.weblutions.com/discord/invite/vsc/)](https://discord.gg/vsc)