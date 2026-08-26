# mrtctns.github.io

Kişisel site — düz HTML/CSS/JS, build adımı yok. `main`'e push edilince
GitHub Actions dosyaları olduğu gibi Pages'e yükler.

## Yapı

```
index.html         tek sayfa site (TR + EN, ikisi de HTML içinde)
404.html
assets/
  styles.css       tüm tasarım
  app.js           dil değiştirici, scroll reveal, kart parlaması
  avatar.jpg       favicon
  og.png           sosyal medya önizlemesi
  apps/*.png       App Store ikonları (256px)
privacy/  support/  terms/     App Store'un beklediği sayfalar — URL'leri değişmemeli
app-ads.txt        AdMob doğrulaması — App Store marketing URL'i buraya bakıyor
demo.m3u           Plora'nın ilk açılış / App Review içeriği
```

## Dil

Her çevrilebilir metin HTML'de iki kez duruyor:

```html
<span lang="tr">Merhaba</span><span lang="en">Hello</span>
```

CSS `html[data-lang]` değerine göre birini gizliyor. JS kapalıyken bile
Türkçesi görünür; tercih `localStorage`'da (`mc-lang`) saklanıyor.

## Yeni uygulama eklemek

1. İkonu indir: `curl -o assets/apps/<slug>.png "$(curl -s "https://itunes.apple.com/lookup?id=<APP_ID>" | python3 -c "import sys,json;print(json.load(sys.stdin)['results'][0]['artworkUrl512'].replace('512x512bb','256x256bb'))")"`
2. `index.html` içindeki `.apps` bloğuna mevcut kartlardan birini kopyalayıp düzenle
   (kartlar açıklama içermez — sadece isim, kategori ve yıl).
3. Hero'daki `10` istatistiğini güncelle.

## Yerelde çalıştırmak

```sh
python3 -m http.server 8899   # → http://localhost:8899
```
