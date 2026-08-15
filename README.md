# 匹克球分隊

匹克球(Pickleball)分隊網頁 App:出席名單、自動輪替、分隊、記分、統計。

**線上網址**:https://ostabudin.github.io/pickleball/
(`qr.png` 就是這個網址的 QR code,可直接分享給球友)

## 功能

- 出席名單管理(遲到的人到了再打開出席開關即可)
- 產生對戰:隨機/實力平衡兩種分隊模式,可開「盡量避免重複搭檔與對手」
- 輪替規則:剛休息的人大幅優先上場(但不保證,讓組合持續混合);連休兩輪保證上場;遲到者直接進入正常輪替
- 記分:按「這隊獲勝」後快速點選輸家得分(11 分制)、可輸入特殊比分、趕時間可不記分
- 統計:每人今日與累計勝敗、勝率、「今日+/-」(當天平均每場淨勝分)
- 可離線使用;左上角日期旁顯示版本號(目前 v4)

## 怎麼安裝到手機

- **iPhone**:用 Safari 或 Chrome 開網址 → 分享按鈕 → 加入主畫面
- **Android**:用 Chrome 開網址 → 右上角選單 → 加到主畫面
- 在 LINE 點連結的話,先用選單改成瀏覽器開啟,再安裝

## 紀錄存在哪裡?

- 存在**每台裝置自己的儲存空間**:每個人各自獨立、互不相通,也不會上傳到網路
- 「加入主畫面」的版本儲存最穩定;**不要**用 LINE 傳 html 檔案的方式使用(存不住紀錄)
- 「今日」數據隔天自動歸零;總戰績持續累計
- 想要球隊共同紀錄:固定用同一台手機操作記分
- 改版後所有人重開 App 即自動更新,紀錄不受影響

## 檔案說明

- `index.html` — 程式本體(單一檔案,電腦雙擊也能離線用)
- `sw.js` — 離線快取(改版時 CACHE 版本號要 +1)
- `manifest.webmanifest`、`icon-*.png` — 安裝成 App 的描述檔與圖示
- `qr.png` — 網址 QR code

## 改版與部署(給 Claude 的備忘)

1. 改完 `index.html`:同步更新 `renderHeader` 的版本字樣(v?)與 `sw.js` 的 `CACHE`(pb-v?)
2. commit 後部署(GitHub 遠端 `pickleball-app` = https://github.com/Ostabudin/pickleball):

   ```powershell
   git branch -D pages-deploy
   git subtree split --prefix=Pickleball -b pages-deploy
   $env:GIT_TERMINAL_PROMPT='1'; $env:GCM_INTERACTIVE='always'
   git -c credential.interactive=always push pickleball-app pages-deploy:main pages-deploy:gh-pages
   ```

3. 驗證:`curl https://ostabudin.github.io/pickleball/` 內容出現新版本字樣即上線(CDN 快取約 10 分鐘,程式端已用強制核對繞過)

## 沿革

工作區成立前的第一個作品。2026-08 大改版:輪替規則翻新(移除已打場數邏輯→優先制混合輪替)、新增記分與「今日+/-」統計、PWA 化並部署上線。
