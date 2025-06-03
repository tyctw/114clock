// 設定目標日期（2026年5月23日）
const targetDate = new Date('2026-05-23T00:00:00');
const startDate = new Date('2023-05-23T00:00:00'); // 假設從2023年5月23日開始倒數

// 激勵語錄數組
const motivationalQuotes = [
    "加油！堅持就是勝利！",
    "今天的努力，是明天的實力。",
    "沒有人可以替你學習，除了你自己。",
    "每一次的努力，都是為了更好的自己。",
    "不要放棄，你正在取得進步。",
    "成功不是偶然的，而是日積月累的結果。",
    "每一個問題都是成長的機會。",
    "相信自己，你擁有無窮的潛力。",
    "專注當下，不要為過去後悔，不要為未來焦慮。",
    "正確的時間做正確的事，就是效率。",
    "知識就是力量，學習讓你更強大。",
    "勝利屬於最堅持的人。",
    "行動是治愈恐懼的良藥。",
    "努力的路上，你並不孤單。",
    "好好休息，才能走得更遠。 "
];

// 備考小貼士數組
const studyTips = [
    "建立讀書計劃，合理分配時間",
    "掌握核心概念，不必死記硬背",
    "定期複習，避免遺忘曲線",
    "做好筆記，整理重點",
    "適當休息，保持身心健康",
    "利用碎片時間複習知識點",
    "找出自己的弱項，重點突破",
    "嘗試不同的學習方法，找到適合自己的",
    "保持規律作息，確保充足睡眠",
    "設立階段性目標，及時調整學習計劃",
    "尋求幫助，不要獨自鑽牛角尖",
    "複習時做題，檢驗學習效果",
    "保持學習環境整潔，提高效率",
    "遇到難題，嘗試圖解釋給別人聽",
    "培養良好的學習習慣，堅持到底"
];

// 菜單切換功能
const menuButton = document.querySelector('.menu-button');
const fullscreenMenu = document.querySelector('.fullscreen-menu');
const closeMenuButton = document.querySelector('.close-menu-btn');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    menuButton.classList.toggle('active');
    fullscreenMenu.classList.toggle('active');
    
    // 防止背景滾動
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        menuButton.classList.remove('active');
        fullscreenMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

menuButton.addEventListener('click', toggleMenu);
closeMenuButton.addEventListener('click', closeMenu);

// 點擊菜單項後關閉菜單
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // 設置延遲，使點擊效果更明顯
        setTimeout(() => {
            closeMenu();
        }, 300);
    });
});

// 按下ESC鍵關閉菜單
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
    }
});

// 深淺模式切換功能
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');
let isDarkMode = true; // 預設為深色模式

function toggleMode() {
    isDarkMode = !isDarkMode;
    
    // 添加過渡動畫類
    document.body.classList.add('mode-transition');
    
    // 切換模式
    if (isDarkMode) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
        modeToggle.setAttribute('title', '切換到淺色模式');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
        modeToggle.setAttribute('title', '切換到深色模式');
    }
    
    // 移除過渡動畫類
    setTimeout(() => {
        document.body.classList.remove('mode-transition');
    }, 800);
    
    // 保存模式選擇到本地存儲
    localStorage.setItem('darkMode', isDarkMode);
}

modeToggle.addEventListener('click', toggleMode);

// 載入已保存的模式設定
function loadSavedMode() {
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode !== null) {
        isDarkMode = savedMode === 'true';
        
        if (!isDarkMode) {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
            modeToggle.setAttribute('title', '切換到深色模式');
        } else {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            modeIcon.classList.add('fa-moon');
            modeIcon.classList.remove('fa-sun');
            modeToggle.setAttribute('title', '切換到淺色模式');
        }
    } else {
        // 如果沒有保存的設定，默認使用深色模式
        document.body.classList.add('dark-mode');
        modeToggle.setAttribute('title', '切換到淺色模式');
    }
}

// 主題切換功能
const themeBtns = document.querySelectorAll('.theme-btn');

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 移除所有主題類
        document.body.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-orange');
        
        // 移除所有按鈕的活動狀態
        themeBtns.forEach(b => b.classList.remove('active'));
        
        // 如果不是默認主題，則添加對應的主題類
        const theme = btn.getAttribute('data-theme');
        if (theme !== 'blue') {
            document.body.classList.add(`theme-${theme}`);
        }
        
        // 設置當前按鈕為活動狀態
        btn.classList.add('active');
        
        // 保存主題選擇到本地存儲
        localStorage.setItem('selectedTheme', theme);
    });
});

// 載入已保存的主題
const savedTheme = localStorage.getItem('selectedTheme');
if (savedTheme) {
    const targetBtn = document.querySelector(`.theme-btn.${savedTheme}`);
    if (targetBtn) {
        targetBtn.click();
    }
}

// 每日激勵語功能
const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote-btn');

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
}

// 更新激勵語
function updateQuote() {
    const quote = getRandomQuote();
    
    // 使用淡出淡入效果
    quoteText.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = quote;
        quoteText.style.opacity = '1';
    }, 300);
}

// 點擊按鈕更換激勵語
newQuoteBtn.addEventListener('click', updateQuote);

// 隨機更新學習小貼士
function updateStudyTips() {
    const tipsList = document.getElementById('tips-list');
    const selectedTips = [];
    const tipCount = 5; // 顯示5條小貼士
    
    // 避免重複
    while (selectedTips.length < tipCount) {
        const randomIndex = Math.floor(Math.random() * studyTips.length);
        const tip = studyTips[randomIndex];
        
        if (!selectedTips.includes(tip)) {
            selectedTips.push(tip);
        }
    }
    
    // 更新列表
    tipsList.innerHTML = '';
    selectedTips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
}

// 更新版權年份
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
}

// 數字變化動畫
function animateValue(elem, start, end, duration) {
    if (start === end) return;
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    
    stepTime = Math.max(stepTime, minTimer);
    
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;
    
    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));
        elem.textContent = String(value).padStart(2, '0');
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}

// 計算進度百分比
function updateProgressBar(currentDate, startDate, targetDate) {
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const percentContainer = document.querySelector('.progress-percent-container');
    const totalDuration = targetDate - startDate;
    const elapsedDuration = currentDate - startDate;
    let percent = (elapsedDuration / totalDuration) * 100;
    
    // 確保進度在0-100之間
    percent = Math.max(0, Math.min(100, percent));
    
    // 格式化為保留兩位小數
    const formattedPercent = percent.toFixed(2);
    
    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${formattedPercent}%`;
    
    // 更新百分比文字的位置
    const containerWidth = progressBar.parentElement.offsetWidth;
    const rightPosition = containerWidth - (containerWidth * percent / 100);
    
    // 確保文字不會超出容器
    if (percent > 92) {
        percentContainer.style.right = '0px';
    } else if (percent < 8) {
        percentContainer.style.right = (containerWidth - 60) + 'px';
    } else {
        percentContainer.style.right = rightPosition + 'px';
    }
}

// 更新倒數計時
function updateCountdown() {
    const currentDate = new Date();
    const difference = targetDate - currentDate;

    // 計算天、時、分、秒
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // 獲取元素
    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');

    // 只在數值變化時進行動畫，避免不必要的更新
    if (daysElem.textContent !== String(days).padStart(2, '0')) {
        animateValue(daysElem, parseInt(daysElem.textContent), days, 500);
    }
    
    if (hoursElem.textContent !== String(hours).padStart(2, '0')) {
        animateValue(hoursElem, parseInt(hoursElem.textContent), hours, 500);
    }
    
    if (minutesElem.textContent !== String(minutes).padStart(2, '0')) {
        animateValue(minutesElem, parseInt(minutesElem.textContent), minutes, 500);
    }
    
    // 秒數直接更新，不使用動畫
    secondsElem.textContent = String(seconds).padStart(2, '0');

    // 更新進度條
    updateProgressBar(currentDate, startDate, targetDate);

    // 如果倒數結束
    if (difference < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-items').innerHTML = '<h2 class="countdown-end">考試已開始！</h2>';
        document.getElementById('progress-bar').style.width = '100%';
        document.getElementById('progress-percent').textContent = '100%';
        document.querySelector('.progress-percent-container').style.right = '0px';
    }
}

// 每秒更新一次
const countdownInterval = setInterval(updateCountdown, 1000);

// 添加視差效果
function parallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const circles = document.querySelectorAll('.gradient-circle');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const factor = (index + 1) * 15;
            const xOffset = factor * (x - 0.5);
            const yOffset = factor * (y - 0.5);
            
            circle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// 彈出視窗功能設置
function setupPopups() {
    console.log('設置彈出視窗功能...');
    
    // 獲取彈出視窗相關元素
    const tipsPopup = document.getElementById('tips-popup');
    const datesPopup = document.getElementById('dates-popup');
    const tipsTrigger = document.getElementById('tips-trigger');
    const datesTrigger = document.getElementById('dates-trigger');
    const popupCloseButtons = document.querySelectorAll('.popup-close');
    const allPopups = document.querySelectorAll('.popup-overlay');
    
    console.log('彈出視窗元素獲取結果:', {
        tipsPopup: tipsPopup ? '已找到' : '未找到',
        datesPopup: datesPopup ? '已找到' : '未找到',
        tipsTrigger: tipsTrigger ? '已找到' : '未找到',
        datesTrigger: datesTrigger ? '已找到' : '未找到',
        popupCloseButtons: popupCloseButtons.length + '個',
        allPopups: allPopups.length + '個'
    });

    // 顯示彈出視窗
    function openPopup(popup) {
        if (!popup) {
            console.error('嘗試打開不存在的彈出視窗');
            return;
        }
        console.log('打開彈出視窗', popup.id);
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滾動
    }

    // 關閉彈出視窗
    function closePopup(popup) {
        if (!popup) {
            console.error('嘗試關閉不存在的彈出視窗');
            return;
        }
        console.log('關閉彈出視窗', popup.id);
        popup.classList.remove('active');
        document.body.style.overflow = ''; // 恢復背景滾動
    }

    // 關閉所有彈出視窗
    function closeAllPopups() {
        console.log('關閉所有彈出視窗');
        allPopups.forEach(popup => {
            closePopup(popup);
        });
    }

    // 為小貼士按鈕添加點擊事件
    if (tipsTrigger) {
        console.log('為小貼士按鈕添加點擊事件');
        tipsTrigger.onclick = function(e) {
            console.log('點擊了小貼士按鈕');
            e.preventDefault();
            openPopup(tipsPopup);
            // 進入彈出視窗時更新小貼士
            updateStudyTips();
        };
    } else {
        console.error('未找到小貼士按鈕');
    }

    // 為重要日期按鈕添加點擊事件
    if (datesTrigger) {
        console.log('為重要日期按鈕添加點擊事件');
        datesTrigger.onclick = function(e) {
            console.log('點擊了重要日期按鈕');
            e.preventDefault();
            openPopup(datesPopup);
        };
    } else {
        console.error('未找到重要日期按鈕');
    }

    // 為所有關閉按鈕添加點擊事件
    popupCloseButtons.forEach(button => {
        button.onclick = function(e) {
            console.log('點擊了關閉按鈕');
            e.preventDefault();
            const popup = button.closest('.popup-overlay');
            closePopup(popup);
        };
    });

    // 點擊彈出視窗背景關閉
    allPopups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                console.log('點擊了彈出視窗背景');
                closePopup(popup);
            }
        });
    });

    // 按ESC鍵關閉彈出視窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            console.log('按下了ESC鍵');
            closeAllPopups();
        }
    });

    // 為彈出視窗中的小貼士刷新按鈕添加點擊事件
    const newTipsBtn = document.getElementById('new-tips-btn');
    if (newTipsBtn) {
        console.log('為小貼士刷新按鈕添加點擊事件');
        newTipsBtn.onclick = function(e) {
            console.log('點擊了小貼士刷新按鈕');
            e.preventDefault();
            updateStudyTips();
        };
    } else {
        console.error('未找到小貼士刷新按鈕');
    }
}

// 確保DOM加載完成後再設置彈出視窗功能
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPopups);
} else {
    setupPopups();
}

// 初始化頁面
function initPage() {
    loadSavedMode();
    updateCountdown();
    updateCopyrightYear();
    updateQuote();
    parallaxEffect();
    
    // 每天隨機更新學習小貼士
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    const timeUntilTomorrow = tomorrow - new Date();
    
    setTimeout(() => {
        updateStudyTips();
        // 每24小時更新一次
        setInterval(updateStudyTips, 24 * 60 * 60 * 1000);
    }, timeUntilTomorrow);
}

// 頁面加載後初始化
window.addEventListener('load', initPage); 