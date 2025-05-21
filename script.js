var gk_isXlsx = false;
        var gk_xlsxFileLookup = {};
        var gk_fileData = {};
        function filledCell(cell) {
          return cell !== '' && cell != null;
        }
        function loadFileData(filename) {
        if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
            try {
                var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
                var firstSheetName = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[firstSheetName];

                // Convert sheet to JSON to filter blank rows
                var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
                // Filter out blank rows (rows where all cells are empty, null, or undefined)
                var filteredData = jsonData.filter(row => row.some(filledCell));

                // Heuristic to find the header row by ignoring rows with fewer filled cells than the next row
                var headerRowIndex = filteredData.findIndex((row, index) =>
                  row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
                );
                // Fallback
                if (headerRowIndex === -1 || headerRowIndex > 25) {
                  headerRowIndex = 0;
                }

                // Convert filtered JSON back to CSV
                var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex)); // Create a new sheet from filtered array of arrays
                csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
                return csv;
            } catch (e) {
                console.error(e);
                return "";
            }
        }
        return gk_fileData[filename] || "";
        }

        // 3D Holographic Nebula Background
    const canvas = document.getElementById('nebula');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 350;

    class Particle {
      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * canvas.width / 1.5;
        this.distance = Math.random() * canvas.width;
        this.size = Math.random() * 3.5 + 1;
        this.speed = Math.random() * 0.03 + 0.015;
        this.pulse = Math.random() * Math.PI * 2;
      }

      update() {
        this.angle += this.speed;
        this.distance -= 0.6;
        this.pulse += 0.05;
        if (this.distance < 0.1) {
          this.distance = canvas.width;
          this.angle = Math.random() * Math.PI * 2;
          this.radius = Math.random() * canvas.width / 1.5;
        }
      }

      draw() {
        const x = canvas.width / 2 + Math.cos(this.angle) * this.radius;
        const y = canvas.height / 2 + Math.sin(this.angle) * this.radius;
        const perspective = canvas.width / (canvas.width + this.distance);
        const px = (x - canvas.width / 2) * perspective + canvas.width / 2;
        const py = (y - canvas.height / 2) * perspective + canvas.height / 2;
        const size = this.size * perspective * (1 + 0.3 * Math.sin(this.pulse));

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = document.body.classList.contains('day-mode') ? 'rgba(243, 207, 198, 0.9)' : 'rgba(153, 102, 204, 0.9)';
        ctx.fill();

        if (Math.random() < 0.07) {
          const sparkle = document.createElement('div');
          sparkle.className = 'sparkle';
          sparkle.style.left = `${px}px`;
          sparkle.style.top = `${py}px`;
          document.querySelector('.background').appendChild(sparkle);
          setTimeout(() => sparkle.remove(), 1600);
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateNebula() {
      ctx.fillStyle = document.body.classList.contains('day-mode') ? 'rgba(0, 0, 0, 0.04)' : 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateNebula);
    }

    animateNebula();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Day/Night Mode Toggle
    function toggleMode() {
      document.body.classList.toggle('day-mode');
      document.body.classList.toggle('night-mode');
      const toggleIcon = document.querySelector('.toggle-mode');
      toggleIcon.textContent = document.body.classList.contains('day-mode') ? '🌞' : '🌙';
    }

    // Sample Quran Data (placeholder with multiple Ayats)
    const surahs = [
      {
        id: 1,
        name: 'Al-Fatihah',
        ayats: [
          {
            arabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
            transliteration: 'Bismillahir-Rahmanir-Raheem',
            translation: 'In the name of Allah, the Most Gracious, the Most Merciful.',
            urduTranslation: 'اللہ کے نام سے جو رحمان و رحیم ہے۔'
          },
          {
            arabic: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
            transliteration: 'Al-hamdu lillahi rabbil-‘alameen',
            translation: 'All praise is due to Allah, Lord of the worlds.',
            urduTranslation: 'تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے۔'
          },
          {
            arabic: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
            transliteration: 'Ar-Rahmanir-Raheem',
            translation: 'The Most Gracious, the Most Merciful.',
            urduTranslation: 'رحمان و رحیم۔'
          },
          {
            arabic: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
            transliteration: 'Maliki yawmid-deen',
            translation: 'Master of the Day of Judgment.',
            urduTranslation: 'روز جزا کا مالک۔'
          },
          {
            arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
            transliteration: 'Iyyaka na‘budu wa iyyaka nasta‘een',
            translation: 'You alone we worship, and You alone we ask for help.',
            urduTranslation: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد چاہتے ہیں۔'
          },
          {
            arabic: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
            transliteration: 'Ihdinas-siratal-mustaqeem',
            translation: 'Guide us to the straight path.',
            urduTranslation: 'ہمیں سیدھے راستے کی ہدایت دے۔'
          },
          {
            arabic: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
            transliteration: 'Siratal-latheena an‘amta ‘alayhim ghayril-maghdoobi ‘alayhim wa lad-dalleen',
            translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
            urduTranslation: 'ان لوگوں کا راستہ جن پر تو نے انعام کیا، نہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا۔'
          }
        ]
      },
      {
        id: 2,
        name: 'Al-Baqarah',
        ayats: [
          {
            arabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
            transliteration: 'Bismillahir-Rahmanir-Raheem',
            translation: 'In the name of Allah, the Most Gracious, the Most Merciful.',
            urduTranslation: 'اللہ کے نام سے جو رحمان و رحیم ہے۔'
          },
          {
            arabic: 'الم',
            transliteration: 'Alif-Lam-Mim',
            translation: 'Alif, Lam, Mim.',
            urduTranslation: 'الف لام میم۔'
          },
          {
            arabic: 'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًۭى لِّلْمُتَّقِينَ',
            transliteration: 'Dhalika alkitabu la rayba feehi hudan lilmuttaqeen',
            translation: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.',
            urduTranslation: 'یہ وہ کتاب ہے جس میں کوئی شک نہیں، پرہیزگاروں کے لیے ہدایت ہے۔'
          },
          {
            arabic: 'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ',
            transliteration: 'Allatheena yu/minoona bialghaybi wayuqeemoona alssalata wamimma razaqnahum yunfiqoon',
            translation: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them.',
            urduTranslation: 'جو غیب پر ایمان لاتے ہیں، نماز قائم کرتے ہیں اور جو کچھ ہم نے انہیں دیا ہے اس میں سے خرچ کرتے ہیں۔'
          },
          {
            arabic: 'وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْـَٔاخِرَةِ هُمْ يُوقِنُونَ',
            transliteration: 'Waallatheena yu/minoona bima onzila ilayka wama onzila min qablika wabial-akhirati hum yooqinoon',
            translation: 'And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain.',
            urduTranslation: 'اور جو کچھ آپ پر نازل کیا گیا ہے اور جو کچھ آپ سے پہلے نازل کیا گیا تھا اس پر ایمان لاتے ہیں اور آخرت پر یقین رکھتے ہیں۔'
          }
        ]
      },
      {
        id: 112,
        name: 'Al-Ikhlas',
        ayats: [
          {
            arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ',
            transliteration: 'Qul huwa Allahu ahad',
            translation: 'Say, He is Allah, the One.',
            urduTranslation: 'کہو، وہ اللہ ایک ہے۔'
          },
          {
            arabic: 'ٱللَّهُ ٱلصَّمَدُ',
            transliteration: 'Allahus-samad',
            translation: 'Allah, the Eternal Refuge.',
            urduTranslation: 'اللہ بےنیاز ہے۔'
          },
          {
            arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
            transliteration: 'Lam yalid walam yoolad',
            translation: 'He neither begets nor is born.',
            urduTranslation: 'نہ اس نے جنا اور نہ وہ جنا گیا۔'
          },
          {
            arabic: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
            transliteration: 'Walam yakun lahu kufuwan ahad',
            translation: 'Nor is there to Him any equivalent.',
            urduTranslation: 'اور کوئی اس کا ہمسر نہیں۔'
          }
        ]
      },
      {
        id: 113,
        name: 'Al-Falaq',
        ayats: [
          {
            arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ',
            transliteration: 'Qul aAAoothu birabbi alfalaq',
            translation: 'Say, "I seek refuge in the Lord of daybreak.',
            urduTranslation: 'کہو، میں فجر کے رب کی پناہ مانگتا ہوں۔'
          },
          {
            arabic: 'مِن شَرِّ مَا خَلَقَ',
            transliteration: 'Min sharri ma khalaq',
            translation: 'From the evil of that which He created.',
            urduTranslation: 'اس کی پیدا کی ہوئی چیزوں کے شر سے۔'
          },
          {
            arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
            transliteration: 'Wamin sharri ghasiqin ithawaqab',
            translation: 'And from the evil of darkness when it settles.',
            urduTranslation: 'اور اندھیری رات کے شر سے جب وہ چھا جائے۔'
          },
          {
            arabic: 'وَمِن شَرِّ ٱلنَّفَّـٰثَـٰتِ فِى ٱلْعُقَدِ',
            transliteration: 'Wamin sharri alnnaffathatifee alAAuqad',
            translation: 'And from the evil of the blowers in knots.',
            urduTranslation: 'اور گرہوں میں پھونکنے والیوں کے شر سے۔'
          },
          {
            arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
            transliteration: 'Wamin sharri hasidin ithahasad',
            translation: 'And from the evil of an envier when he envies.',
            urduTranslation: 'اور حسد کرنے والے کے شر سے جب وہ حسد کرے۔'
          }
        ]
      },
      {
        id: 114,
        name: 'An-Nas',
        ayats: [
          {
            arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ',
            transliteration: 'Qul a‘udhu birabbinnas',
            translation: 'Say, I seek refuge in the Lord of mankind.',
            urduTranslation: 'کہو، میں انسانوں کے رب کی پناہ مانگتا ہوں۔'
          },
          {
            arabic: 'مَلِكِ ٱلنَّاسِ',
            transliteration: 'Malikin-nas',
            translation: 'The Sovereign of mankind.',
            urduTranslation: 'انسانوں کے بادشاہ کی۔'
          },
          {
            arabic: 'إِلَـٰهِ ٱلنَّاسِ',
            transliteration: 'Ilahin-nas',
            translation: 'The God of mankind.',
            urduTranslation: 'انسانوں کے معبود کی۔'
          },
          {
            arabic: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ',
            transliteration: 'Min sharril-waswasil-khannas',
            translation: 'From the evil of the retreating whisperer.',
            urduTranslation: 'وسوسہ ڈالنے والے کے شر سے جو پیچھے ہٹ جاتا ہے۔'
          },
          {
            arabic: 'ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ',
            transliteration: 'Allathee yuwaswisu fee sudoorinnas',
            translation: 'Who whispers [evil] into the breasts of mankind.',
            urduTranslation: 'جو لوگوں کے سینوں میں وسوسہ ڈالتا ہے۔'
          },
          {
            arabic: 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
            transliteration: 'Minal-jinnati wannas',
            translation: 'From among the jinn and mankind.',
            urduTranslation: 'خواہ وہ جنات میں سے ہو یا انسانوں میں سے۔'
          }
        ]
      }
    ];

    let currentSurahId = null;
    let currentAyatIndex = 0;

    // Populate Surah Select
    const surahSelect = document.getElementById('surahSelect');
    surahs.forEach(surah => {
      const option = document.createElement('option');
      option.value = surah.id;
      option.textContent = `${surah.id}. ${surah.name}`;
      surahSelect.appendChild(option);
    });

    // Display Selected Surah and First Ayat
    function displaySurah() {
      const id = parseInt(surahSelect.value);
      if (!id) return;
      currentSurahId = id;
      currentAyatIndex = 0;
      displayCurrentAyat();
    }

    // Display Current Ayat
    function displayCurrentAyat() {
      if (currentSurahId === null) return;
      const surah = surahs.find(s => s.id === currentSurahId);
      if (surah && surah.ayats[currentAyatIndex]) {
        const ayat = surah.ayats[currentAyatIndex];
        document.getElementById('arabicText').textContent = ayat.arabic;
        document.getElementById('transliteration').textContent = ayat.transliteration;
        document.getElementById('translation').textContent = ayat.translation;
        document.getElementById('urduTranslation').textContent = ayat.urduTranslation;
        document.getElementById('surahContent').style.display = 'block';
      }
    }

    // Display Random Surah
    function displayRandomSurah() {
      const randomIndex = Math.floor(Math.random() * surahs.length);
      const surah = surahs[randomIndex];
      currentSurahId = surah.id;
      currentAyatIndex = 0;
      surahSelect.value = surah.id;
      displayCurrentAyat();
    }

    // Navigate to Previous Ayat
    function prevAyat() {
      if (currentSurahId === null) return;
      const surah = surahs.find(s => s.id === currentSurahId);
      if (surah && currentAyatIndex > 0) {
        currentAyatIndex--;
        displayCurrentAyat();
      }
    }

    // Navigate to Next Ayat
    function nextAyat() {
      if (currentSurahId === null) return;
      const surah = surahs.find(s => s.id === currentSurahId);
      if (surah && currentAyatIndex < surah.ayats.length - 1) {
        currentAyatIndex++;
        displayCurrentAyat();
      }
    }

    // Search Surahs
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      surahSelect.innerHTML = '<option value="" disabled selected>Select a Surah</option>';
      surahs
        .filter(surah => surah.name.toLowerCase().includes(query))
        .forEach(surah => {
          const option = document.createElement('option');
          option.value = surah.id;
          option.textContent = `${surah.id}. ${surah.name}`;
          surahSelect.appendChild(option);
        });
    });

    // Initialize with a random Surah
    displayRandomSurah();