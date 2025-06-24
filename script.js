let CANVAS_WIDTH = document.body.clientWidth;
        let CANVAS_HEIGHT = document.body.clientHeight + 200;
        let c = document.getElementById('canvas');
        let ctx = c.getContext("2d");

        var metaData = {
            winCenter: {
                x: CANVAS_WIDTH / 2,
                y: CANVAS_HEIGHT / 2
            }
        };

        var mainStructure = {
            lineColor: '#86e8f6',
            gradLight: '#233169',
            gradDark: '#19183a',
            gradPink0: '#f0d4fa',
            gradPink1: '#e47dec',
            gradPink2: '#862eaf',
            gradPink3: '#1f0b43',
            draw: function() {
                // --- FOND SYNTHWAVE ---
                // Dégradé radial
                let grad = ctx.createRadialGradient(
                    CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH*0.1,
                    CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH/2
                );
                grad.addColorStop(0, '#3a1c71'); // centre violet foncé
                grad.addColorStop(0.4, '#d76d77'); // rose
                grad.addColorStop(0.7, '#ffaf7b'); // orange/jaune
                grad.addColorStop(1, '#1a0033'); // bords très foncés
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

                // Vignettage (bords sombres)
                let vignette = ctx.createRadialGradient(
                    CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH*0.4,
                    CANVAS_WIDTH/2, CANVAS_HEIGHT/2, CANVAS_WIDTH/2
                );
                vignette.addColorStop(0, 'rgba(0,0,0,0)');
                vignette.addColorStop(1, 'rgba(10,0,30,0.55)');
                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                // --- FIN FOND ---
                
                //Background
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.fill();
                
                var grdMain = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT / 3 * 2);
                grdMain.addColorStop(0,this.gradPink3);
                grdMain.addColorStop(0.2,this.gradPink3);
                grdMain.addColorStop(0.8,this.gradPink2);
                grdMain.addColorStop(0.95,this.gradPink1);
                grdMain.addColorStop(1, this.gradPink0);
                ctx.fillStyle = grdMain;
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT / 3 * 2);
                
                // Soleil façon .switch__sun
                let horizon = CANVAS_HEIGHT / 3 * 2;
                let sunRadius = 300;
                let sunX = CANVAS_WIDTH / 2;
                let sunY = horizon;

                // Décalages pour chaque canal
                let dxR = 16, dxG = -16, dxB = 0;

                // Dégradé pour chaque canal
                function getSunGradient(color1, color2) {
                    let grad = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
                    grad.addColorStop(0, color1);
                    grad.addColorStop(0.5, color2);
                    return grad;
                }

                // Rouge split (décalé à gauche)
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.beginPath();
                ctx.arc(sunX + dxR, sunY, sunRadius, Math.PI, 0, false);
                ctx.lineTo(sunX + dxR + sunRadius, sunY);
                ctx.lineTo(sunX + dxR - sunRadius, sunY);
                ctx.closePath();
                ctx.fillStyle = getSunGradient('#ff3a3a', '#ff4700');
                ctx.globalAlpha = 0.18; // plus subtil
                ctx.fill();
                ctx.restore();

                // Bleu/cyan split (décalé à droite)
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.beginPath();
                ctx.arc(sunX - dxG, sunY, sunRadius, Math.PI, 0, false);
                ctx.lineTo(sunX - dxG + sunRadius, sunY);
                ctx.lineTo(sunX - dxG - sunRadius, sunY);
                ctx.closePath();
                ctx.fillStyle = getSunGradient('#00ffe7', '#00b3ff');
                ctx.globalAlpha = 0.13; // encore plus subtil
                ctx.fill();
                ctx.restore();

                // Jaune/orange (couche centrale, non décalée, par-dessus)
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.beginPath();
                ctx.arc(sunX, sunY, sunRadius, Math.PI, 0, false);
                ctx.lineTo(sunX + sunRadius, sunY);
                ctx.lineTo(sunX - sunRadius, sunY);
                ctx.closePath();
                let gradYellow = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
                gradYellow.addColorStop(0, '#ffff05');
                gradYellow.addColorStop(1, '#ff9900');
                ctx.fillStyle = gradYellow;
                ctx.globalAlpha = 0.95; // plus opaque
                ctx.shadowColor = 'rgba(255, 200, 50, 0.8)';
                ctx.shadowBlur = 60;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.restore();

                ctx.globalCompositeOperation = 'source-over';
                
                //Horizons (horizontal lines at the end)
                ctx.strokeStyle = this.lineColor;
                
                //Bottom
                var grdBottom = ctx.createLinearGradient(0, CANVAS_HEIGHT / 3 * 2, 0, CANVAS_HEIGHT);
                grdBottom.addColorStop(0, this.gradLight);
                grdBottom.addColorStop(1, this.gradDark);
                ctx.fillStyle = grdBottom;
                ctx.fillRect(0, CANVAS_HEIGHT / 3 * 2, CANVAS_WIDTH, CANVAS_HEIGHT);
                
                ctx.moveTo(0, CANVAS_HEIGHT / 3 * 2);
                ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 3 * 2);
                ctx.stroke();

                let verticalLines = 20;
                let stepWidth = CANVAS_WIDTH * 3 / verticalLines;

                //Vertical lines bottom
                posLine = 0 - CANVAS_WIDTH;

                for (let i = 1; i <= verticalLines; i++) {
                    ctx.moveTo(posLine, CANVAS_HEIGHT);

                    let m = (metaData.winCenter.y - CANVAS_HEIGHT) / (metaData.winCenter.x - posLine);
                    let b = CANVAS_HEIGHT - (m * posLine);

                    let x = (CANVAS_HEIGHT / 3 * 2 - b) / m;

                    posLine = posLine + stepWidth;

                    ctx.lineTo(x, CANVAS_HEIGHT / 3 * 2);
                    ctx.strokeStyle = this.lineColor;
                    ctx.stroke();
                }
            }
        }

        var HorizontalLine = {
            horizontalLinesTop: null,
            horizontalLinesBottom: null,
            count: null,
            constructor: function(I) {
                I.acceleration = 0;

                I.from = {
                    x: 0,
                    y: 0
                };

                I.to = {
                    x: CANVAS_WIDTH,
                    y: 0
                };

                return I;
            },
            init: function() {
                this.horizontalLinesBottom = this.generateHorizontalLines(CANVAS_HEIGHT / 3 * 2, CANVAS_HEIGHT, 7, 'bottom');

                this.horizontalLinesTop = this.generateHorizontalLines(0, CANVAS_HEIGHT / 3, 7, 'top')
            },
            generateHorizontalLines: function(from, to, num, mode) {
                this.count = num;

                var horizontalLines = [];
                var horizontalSpace = to - from;
                var yPos = from;

                for (let i = 0; i < num; i++) {
                    yPos = yPos + horizontalSpace / num;
                    hl = this.constructor({});
                    hl.from.y = yPos;
                    hl.to.y = yPos;

                    if (mode === 'top') {
                        hl.acceleration = num - i;
                    } else {
                        hl.acceleration = i;
                    }

                    horizontalLines.push(hl);
                }

                return horizontalLines;
            },
            draw: function() {
                this.horizontalLinesBottom.forEach(function(hl) {
                    ctx.moveTo(hl.from.x, hl.from.y);
                    ctx.lineTo(hl.to.x, hl.to.y);
                    ctx.shadowBlur = 0.3;
                    ctx.shadowColor = "#4595b4";
                    ctx.stroke();
                });
            },
            update: function() {
                this.horizontalLinesBottom.forEach(function(hl) {
                    hl.from.y += hl.acceleration;
                    hl.to.y += hl.acceleration;
                    hl.acceleration += 0.2;

                    if (hl.to.y >= CANVAS_HEIGHT || hl.from.y >= CANVAS_HEIGHT) {
                        hl.acceleration = 0;
                        hl.from.y = CANVAS_HEIGHT / 3 * 2;
                        hl.to.y = CANVAS_HEIGHT / 3 * 2;
                    }
                });

                this.horizontalLinesTop.forEach(function(hl) {
                    hl.from.y -= hl.acceleration;
                    hl.to.y -= hl.acceleration;
                    hl.acceleration += 0.2;

                    if (hl.to.y <= 0 || hl.from.y <= 0) {
                        hl.acceleration = 0;
                        hl.from.y = CANVAS_HEIGHT / 3;
                        hl.to.y = CANVAS_HEIGHT / 3;
                    }
                });
            }
        };

        var init = function() {
            c.width = CANVAS_WIDTH;
            c.height = CANVAS_HEIGHT;

            HorizontalLine.init();
        }

        var update = function() {
            HorizontalLine.update();
        }

        var draw = function() {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.beginPath();
            mainStructure.draw();
            drawSunReflection();
            HorizontalLine.draw();
            drawStars(performance.now());
            drawScanlines();
            drawCRTGlitch();
            drawCarImage(performance.now());
            drawTitleGlitch(performance.now());
        }

        let animationStarted = false;
        let music = document.getElementById('bg-music');
        let playBtn = document.getElementById('play-btn');

        // --- Audio analyser pour reflet audio-réactif ---
        let audioCtx, analyser, dataArray, source;
        function setupAudioAnalyser() {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            source = audioCtx.createMediaElementSource(music);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            analyser.fftSize = 128;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
        }

        function startExperience() {
            if (!animationStarted) {
                animationStarted = true;
                playBtn.style.display = 'none';
                setupAudioAnalyser();
                audioCtx.resume();
                music.currentTime = 17;
                music.play();
                requestAnimationFrame(animate);
            }
        }

        playBtn.addEventListener('click', startExperience);

        function animate() {
            update();
            draw();
            if (animationStarted) {
                requestAnimationFrame(animate);
            }
        }

        function resizeCanvas() {
            const minDim = Math.min(window.innerWidth, window.innerHeight);
            CANVAS_WIDTH = minDim;
            CANVAS_HEIGHT = minDim;
            c.width = CANVAS_WIDTH;
            c.height = CANVAS_HEIGHT;
            metaData.winCenter.x = CANVAS_WIDTH / 2;
            metaData.winCenter.y = CANVAS_HEIGHT / 2;
            HorizontalLine.init();
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function drawSunReflection() {
            if (!analyser) return;
            analyser.getByteTimeDomainData(dataArray);

            let horizon = CANVAS_HEIGHT / 3 * 2;
            let sunRadius = 300;
            let sunX = CANVAS_WIDTH / 2;
            let baseY = horizon;
            let n = dataArray.length;
            let amplitude = 80;

            ctx.save();
            for (let i = 0; i < n; i++) {
                let t = i / (n - 1);
                let angle = Math.PI * (1 - t); // de PI à 0
                let v = (dataArray[i] - 128) / 128;
                let deform = v * amplitude;

                // Point de base (ligne droite)
                let x0 = sunX + Math.cos(angle) * sunRadius;
                let y0 = baseY;

                // Point haut (courbe déformée)
                let x1 = sunX + Math.cos(angle) * sunRadius;
                let y1 = baseY + Math.sin(angle) * sunRadius - deform;

                // Dégradé néon sur chaque trait
                let grad = ctx.createLinearGradient(x0, y0, x1, y1);
                grad.addColorStop(0, '#ff00cc');
                grad.addColorStop(1, '#00ffe7');

                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.lineTo(x1, y1);
                ctx.strokeStyle = grad;
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.lineWidth = 3;
                ctx.globalAlpha = 0.3;
                ctx.stroke();
            }
            ctx.restore();
        }

        // --- Etoiles scintillantes ---
        let stars = Array.from({length: 60}, () => ({
            x: Math.random(),
            y: Math.random() * 0.5,
            r: Math.random() * 1.5 + 0.5,
            phase: Math.random() * Math.PI * 2
        }));

        function drawStars(time) {
            ctx.save();
            let sunRadius = 300;
            let sunX = CANVAS_WIDTH / 2;
            let sunY = CANVAS_HEIGHT / 3 * 2;
            for (const s of stars) {
                const px = s.x * CANVAS_WIDTH;
                const py = s.y * CANVAS_HEIGHT;
                const dist = Math.sqrt((px - sunX) ** 2 + (py - sunY) ** 2);
                if (dist < sunRadius) continue; // Ignore les étoiles sur le soleil
                ctx.save();
                // Palette synthwave
                const synthColors = ['#00ffe7', '#ff00cc', '#ffe066', '#a4508b', '#00b3ff', '#fff'];
                const color = synthColors[s.colorIndex ?? (s.colorIndex = Math.floor(Math.random() * synthColors.length))];
                // Scintillement accentué
                const twinkle = 0.5 + 0.7 * Math.abs(Math.sin(time * 0.0015 + s.phase));
                const radius = s.r * twinkle;
                ctx.beginPath();
                ctx.arc(px, py, radius, 0, 2 * Math.PI);
                ctx.shadowColor = color;
                ctx.shadowBlur = 18 + 12 * twinkle;
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.7 + 0.3 * twinkle;
                ctx.fill();
                ctx.restore();
            }
            ctx.restore();
        }

        // Ajout d'une étoile au clic dans le ciel
        c.addEventListener('click', function(e) {
            const rect = c.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            // Position réelle en pixels
            let sunRadius = 300;
            let sunX = CANVAS_WIDTH / 2;
            let sunY = CANVAS_HEIGHT / 3 * 2;
            const px = x * CANVAS_WIDTH;
            const py = y * CANVAS_HEIGHT;
            const dist = Math.sqrt((px - sunX) ** 2 + (py - sunY) ** 2);
            if (y < 0.55 && dist > sunRadius) { // Seulement dans le ciel et hors du soleil
                stars.push({
                    x: x,
                    y: y,
                    r: Math.random() * 1.5 + 0.5,
                    phase: Math.random() * Math.PI * 2
                });
            }
        });

        function drawScanlines() {
            ctx.save();
            ctx.globalAlpha = 0.10;
            for (let y = 0; y < CANVAS_HEIGHT; y += 3) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(CANVAS_WIDTH, y);
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();
        }

        function drawCRTGlitch() {
            // 10% de chance d'avoir un effet CRT à chaque frame (plus fréquent)
            if (Math.random() < 0.10) {
                let n = Math.floor(Math.random() * 5) + 1; // 1 à 5 bandes
                for (let i = 0; i < n; i++) {
                    let y = Math.random() * CANVAS_HEIGHT;
                    let h = 16 + Math.random() * 24; // bandes plus hautes
                    let dx = (Math.random() - 0.5) * 40; // décalage encore plus fort
                    let imageData = ctx.getImageData(0, y, CANVAS_WIDTH, h);
                    ctx.putImageData(imageData, dx, y);
                }
            }
        }

        // Charger l'image de la voiture
        const carImg = new Image();
        carImg.src = 'assets/Car.png';

        function drawCarImage(time) {
            if (!carImg.complete) return; // attend que l'image soit chargée
            const scale = (CANVAS_WIDTH / 800) * 0.2;
            const cx = CANVAS_WIDTH / 2;
            const cy = CANVAS_HEIGHT * 0.82;

            // Mouvement vertical (vibration régulière)
            const vibY = Math.sin(time * 0.008) * 4;
            // Pas de mouvement horizontal
            const vibX = 0;
            // Rotation légère aléatoire
            const rot = Math.sin(time * 0.002 + Math.random()) * 0.03;

            ctx.save();
            ctx.translate(cx + vibX, cy + vibY);
            ctx.rotate(rot);
            ctx.scale(scale, scale);
            ctx.drawImage(carImg, -carImg.width / 2, -carImg.height / 2);
            ctx.restore();
        }

        function drawTitleGlitch(time) {
            const text = "91's - PNL";
            const sunY = CANVAS_HEIGHT / 3 * 2;
            const y = sunY - 370; // plus haut au-dessus du soleil
            const x = CANVAS_WIDTH / 2;

            // Style synthwave
            ctx.save();
            ctx.font = `bold ${Math.floor(CANVAS_WIDTH / 13)}px 'Arial Black', Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Glow néon
            ctx.shadowColor = '#ff00cc';
            ctx.shadowBlur = 32;

            // Glitch : décalages colorés rapides
            for (let i = 0; i < 3; i++) {
                let dx = Math.sin(time * 0.012 + i * 2) * (i === 0 ? 0 : 4 + Math.random() * 4);
                let color;
                if (i === 0) color = '#fff';
                if (i === 1) color = '#00ffe7';
                if (i === 2) color = '#ff00cc';
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.85 - i * 0.25;
                ctx.fillText(text, x + dx, y + (i === 2 ? 2 : 0));
            }

            // Lignes de glitch horizontales (aléatoires)
            for (let i = 0; i < 2; i++) {
                if (Math.random() < 0.2) {
                    let glitchY = y + (Math.random() - 0.5) * 40;
                    ctx.save();
                    ctx.beginPath();
                    ctx.rect(x - 200, glitchY, 400, 6 + Math.random() * 6);
                    ctx.clip();
                    ctx.fillStyle = '#fff';
                    ctx.globalAlpha = 0.25 + Math.random() * 0.3;
                    ctx.fillText(text, x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 4);
                    ctx.restore();
                }
            }

            ctx.restore();
        }

        init();