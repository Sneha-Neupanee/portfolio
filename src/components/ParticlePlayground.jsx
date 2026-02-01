import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../styles/ParticlePlayground.css';

const ParticlePlayground = () => {
  const canvasRef = useRef(null);
  const gameStateRef = useRef({
    bird: null,
    structures: [],
    particles: [],
    score: 0,
    livesThisLevel: 3,       // attempts left for THIS level only
    currentLevel: 1,
    birdsUsedThisLevel: 0,
    maxBirdsPerLevel: 3,
    levelComplete: false,
    gameOver: false,
    animFrame: null,
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    launched: false,
    allStructuresDestroyed: false,
    birdStoppedTime: 0,
    waitingForRespawn: false,
    respawning: false,
    trail: [],               // sparkle trail behind bird
  });

  const [highScore, setHighScore] = useState(0);
  const [screen, setScreen] = useState('play');
  const [livesThisLevel, setLivesThisLevel] = useState(3);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [, forceUpdate] = useState(0);

  const CANVAS_HEIGHT = 300;
  const GROUND_Y = CANVAS_HEIGHT - 36;
  const GRAVITY = 0.35;          // slightly floatier
  const SLING_X = 100;
  const MAX_DRAG = 100;          // longer pull = more power
  const BIRD_STOP_DELAY = 900;
  const LAUNCH_POWER = 0.28;     // was 0.2 → stronger launch
  const BIRD_RADIUS = 15;        // was 12 → chunkier bird
  const IMPACT_MULT = 18;        // was 10 → blocks break easier

  // ─── LEVEL DATA ──────────────────────────────────────────
  const getLevelStructures = (level) => {
    if (level === 1) {
      // just two easy wood blocks side by side
      return [
        { x: 310, y: GROUND_Y - 35, w: 40, h: 35, type: 'wood', health: 60, destroyed: false },
        { x: 310, y: GROUND_Y - 70, w: 40, h: 35, type: 'wood', health: 60, destroyed: false },
      ];
    } else if (level === 2) {
      return [
        { x: 290, y: GROUND_Y - 35, w: 40, h: 35, type: 'wood', health: 70, destroyed: false },
        { x: 290, y: GROUND_Y - 70, w: 40, h: 35, type: 'wood', health: 70, destroyed: false },
        { x: 350, y: GROUND_Y - 35, w: 40, h: 35, type: 'wood', health: 70, destroyed: false },
        { x: 350, y: GROUND_Y - 70, w: 40, h: 35, type: 'stone', health: 90, destroyed: false },
      ];
    } else {
      return [
        { x: 270, y: GROUND_Y - 35, w: 40, h: 35, type: 'wood',  health: 70, destroyed: false },
        { x: 270, y: GROUND_Y - 70, w: 40, h: 35, type: 'stone', health: 100, destroyed: false },
        { x: 270, y: GROUND_Y -105, w: 40, h: 35, type: 'wood',  health: 70, destroyed: false },
        { x: 340, y: GROUND_Y - 35, w: 40, h: 35, type: 'stone', health: 100, destroyed: false },
        { x: 340, y: GROUND_Y - 70, w: 40, h: 35, type: 'wood',  health: 70, destroyed: false },
        { x: 410, y: GROUND_Y - 35, w: 40, h: 35, type: 'stone', health: 100, destroyed: false },
        { x: 410, y: GROUND_Y - 70, w: 40, h: 35, type: 'stone', health: 100, destroyed: false },
      ];
    }
  };

  // ─── BIRD / LEVEL SPAWNING ───────────────────────────────
  const spawnBird = () => {
    const gs = gameStateRef.current;
    gs.bird = {
      x: SLING_X,
      y: GROUND_Y - 44,
      vx: 0, vy: 0,
      radius: BIRD_RADIUS,
      launched: false,
    };
    gs.launched = false;
    gs.isDragging = false;
    gs.waitingForRespawn = false;
    gs.respawning = false;
    gs.birdStoppedTime = 0;
    gs.trail = [];
    forceUpdate(n => n + 1);
  };

  const loadLevel = useCallback((level) => {
    const gs = gameStateRef.current;
    gs.structures = getLevelStructures(level);
    gs.birdsUsedThisLevel = 0;
    gs.levelComplete = false;
    gs.allStructuresDestroyed = false;
    gs.particles = [];
    gs.waitingForRespawn = false;
    gs.respawning = false;
    gs.birdStoppedTime = 0;
    gs.livesThisLevel = 3;        // RESET lives for the new level
    gs.trail = [];
    setLivesThisLevel(3);
    setCurrentLevel(level);
    spawnBird();
  }, []);

  const resetGame = useCallback(() => {
    const gs = gameStateRef.current;
    gs.bird = null;
    gs.particles = [];
    gs.score = 0;
    gs.livesThisLevel = 3;
    gs.currentLevel = 1;
    gs.birdsUsedThisLevel = 0;
    gs.levelComplete = false;
    gs.gameOver = false;
    gs.launched = false;
    gs.isDragging = false;
    gs.allStructuresDestroyed = false;
    gs.waitingForRespawn = false;
    gs.respawning = false;
    gs.birdStoppedTime = 0;
    gs.trail = [];
    setLivesThisLevel(3);
    setCurrentLevel(1);
    gs.structures = getLevelStructures(1);
    spawnBird();
  }, []);

  // ─── COLLISION ───────────────────────────────────────────
  const checkCollision = (bird, block) => {
    const cx = block.x + block.w / 2;
    const cy = block.y + block.h / 2;
    const dx = Math.abs(bird.x - cx);
    const dy = Math.abs(bird.y - cy);
    if (dx > block.w / 2 + bird.radius) return false;
    if (dy > block.h / 2 + bird.radius) return false;
    if (dx <= block.w / 2 || dy <= block.h / 2) return true;
    const cornerDist = (dx - block.w / 2) ** 2 + (dy - block.h / 2) ** 2;
    return cornerDist <= bird.radius ** 2;
  };

  // ─── PARTICLES ───────────────────────────────────────────
  const createParticles = (x, y, color) => {
    const gs = gameStateRef.current;
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * 4.5;
      gs.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 45,
        color,
        size: 2.5 + Math.random() * 4,
      });
    }
  };

  const createStarParticles = (x, y) => {
    const gs = gameStateRef.current;
    for (let i = 0; i < 10; i++) {
      const angle = (Math.PI * 2 * i) / 10;
      const speed = 3 + Math.random() * 4;
      gs.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        life: 55,
        color: ['#FFD700','#FF69B4','#FFA0D0','#FFE066'][i % 4],
        size: 4,
        isStar: true,
      });
    }
  };

  // ─── GAME LOOP ───────────────────────────────────────────
  const gameLoop = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gs = gameStateRef.current;
    const W = canvas.width;
    const H = canvas.height;

    // ── level-complete check ──
    const activeStructures = gs.structures.filter(s => !s.destroyed);
    if (activeStructures.length === 0 && !gs.allStructuresDestroyed && gs.birdsUsedThisLevel > 0) {
      gs.allStructuresDestroyed = true;
      gs.levelComplete = true;
      const birdsLeft = gs.maxBirdsPerLevel - gs.birdsUsedThisLevel;
      gs.score += birdsLeft * 500;
      for (let i = 0; i < 25; i++) createStarParticles(W / 2, H / 2);

      setTimeout(() => {
        if (gs.currentLevel < 3) {
          gs.currentLevel++;
          loadLevel(gs.currentLevel);
          forceUpdate(n => n + 1);
        } else {
          setHighScore(prev => Math.max(prev, gs.score));
          setScreen('victory');
        }
      }, 2200);
    }

    // ── bird physics ──
    if (gs.bird && gs.bird.launched && !gs.respawning) {
      gs.bird.vy += GRAVITY;
      gs.bird.x += gs.bird.vx;
      gs.bird.y += gs.bird.vy;

      // sparkle trail
      if (gs.bird.launched) {
        gs.trail.push({ x: gs.bird.x, y: gs.bird.y, life: 18 });
        if (gs.trail.length > 22) gs.trail.shift();
      }

      // collisions
      gs.structures.forEach(block => {
        if (!block.destroyed && checkCollision(gs.bird, block)) {
          const impact = Math.sqrt(gs.bird.vx ** 2 + gs.bird.vy ** 2);
          block.health -= impact * IMPACT_MULT;
          if (block.health <= 0) {
            block.destroyed = true;
            gs.score += block.type === 'stone' ? 150 : 100;
            createParticles(
              block.x + block.w / 2,
              block.y + block.h / 2,
              block.type === 'stone' ? '#a8b2bd' : '#e8a87c'
            );
            forceUpdate(n => n + 1);
          }
          gs.bird.vx *= -0.25;
          gs.bird.vy *= -0.25;
        }
      });

      // ground
      if (gs.bird.y >= GROUND_Y - gs.bird.radius) {
        gs.bird.y = GROUND_Y - gs.bird.radius;
        gs.bird.vy *= -0.35;
        gs.bird.vx *= 0.75;
      }

      // stop / off-screen detection
      const isMoving = Math.abs(gs.bird.vx) > 0.4 || Math.abs(gs.bird.vy) > 0.4;
      const isOnGround = gs.bird.y >= GROUND_Y - gs.bird.radius - 1;
      const isOffScreen = gs.bird.x > W + 60 || gs.bird.y > GROUND_Y + 60;

      if ((isOffScreen || (!isMoving && isOnGround)) && !gs.waitingForRespawn) {
        gs.waitingForRespawn = true;
        gs.birdStoppedTime = timestamp;
      }

      // respawn after delay
      if (gs.waitingForRespawn && timestamp - gs.birdStoppedTime > BIRD_STOP_DELAY) {
        gs.respawning = true;
        gs.birdsUsedThisLevel++;

        if (gs.birdsUsedThisLevel >= gs.maxBirdsPerLevel) {
          const remaining = gs.structures.filter(s => !s.destroyed);
          if (remaining.length > 0) {
            // used all birds, level NOT cleared → lose one life FOR THIS LEVEL
            gs.livesThisLevel--;
            setLivesThisLevel(gs.livesThisLevel);

            if (gs.livesThisLevel <= 0) {
              // no attempts left on this level → game over
              gs.gameOver = true;
              setHighScore(prev => Math.max(prev, gs.score));
              setScreen('over');
            } else {
              // retry same level
              setTimeout(() => {
                gs.structures = getLevelStructures(gs.currentLevel);
                gs.birdsUsedThisLevel = 0;
                gs.levelComplete = false;
                gs.allStructuresDestroyed = false;
                gs.particles = [];
                gs.waitingForRespawn = false;
                gs.respawning = false;
                gs.trail = [];
                spawnBird();
                forceUpdate(n => n + 1);
              }, 1100);
            }
          }
        } else {
          spawnBird();
        }
      }
    }

    // ── trail decay ──
    gs.trail = gs.trail.filter(t => { t.life--; return t.life > 0; });

    // ── particle update ──
    gs.particles = gs.particles.filter(p => {
      p.x += p.vx; p.y += p.vy;
      p.vy += GRAVITY * 0.3;
      p.vx *= 0.985;
      p.life--;
      return p.life > 0;
    });

    // ── destroyed blocks fall ──
    gs.structures.forEach(block => {
      if (block.destroyed && block.y < GROUND_Y - block.h) {
        block.vy = (block.vy || 0) + GRAVITY;
        block.y += block.vy;
        if (block.y >= GROUND_Y - block.h) block.y = GROUND_Y - block.h;
      }
    });

    draw(ctx, W, H);
    gs.animFrame = requestAnimationFrame(gameLoop);
  }, [loadLevel]);

  // ═══════════════════════════════════════════════════════════
  //  DRAWING
  // ═══════════════════════════════════════════════════════════

  const drawBackground = (ctx, W, H) => {
    // soft pastel sky
    const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
    sky.addColorStop(0, '#c9e4ff');
    sky.addColorStop(0.6, '#e8f4fd');
    sky.addColorStop(1, '#ffe8ec');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, GROUND_Y);

    // clouds – soft & puffy
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    [{ x: 55, y: 38, s: 1 }, { x: 195, y: 55, s: 0.75 }, { x: 370, y: 42, s: 0.85 }, { x: 480, y: 60, s: 0.6 }]
      .forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 22 * c.s, 0, Math.PI * 2);
        ctx.arc(c.x + 17 * c.s, c.y - 6 * c.s, 16 * c.s, 0, Math.PI * 2);
        ctx.arc(c.x + 34 * c.s, c.y, 19 * c.s, 0, Math.PI * 2);
        ctx.fill();
      });

    // ground – soft green
    const grd = ctx.createLinearGradient(0, GROUND_Y, 0, H);
    grd.addColorStop(0, '#a8e6a3');
    grd.addColorStop(1, '#5cb85c');
    ctx.fillStyle = grd;
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);

    // grass tuft line
    ctx.strokeStyle = '#7dcc78';
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(W, GROUND_Y); ctx.stroke();

    ctx.strokeStyle = '#5cb85c';
    ctx.lineWidth = 2;
    for (let i = 0; i < W; i += 14) {
      ctx.beginPath();
      ctx.moveTo(i, GROUND_Y);
      ctx.lineTo(i + 3, GROUND_Y - 7);
      ctx.stroke();
    }
  };

  // cute heart
  const drawHeart = (ctx, x, y, size, filled) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size, size);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-0.5, -0.5, -1, -0.2, -1, 0.3);
    ctx.bezierCurveTo(-1, 0.7, -0.5, 1, 0, 1.5);
    ctx.bezierCurveTo(0.5, 1, 1, 0.7, 1, 0.3);
    ctx.bezierCurveTo(1, -0.2, 0.5, -0.5, 0, 0);
    ctx.closePath();
    if (filled) {
      const g = ctx.createRadialGradient(-0.2, 0.1, 0, 0, 0.4, 1.1);
      g.addColorStop(0, '#ff85c2');
      g.addColorStop(1, '#e91e8c');
      ctx.fillStyle = g;
      ctx.fill();
      // highlight
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath(); ctx.arc(-0.3, -0.1, 0.28, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.strokeStyle = '#d4a0b8';
      ctx.lineWidth = 0.18;
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawSlingshot = (ctx, isDragging, dragPos) => {
    const side = 8, top = GROUND_Y - 52, bot = GROUND_Y;
    // poles
    const pg = ctx.createLinearGradient(SLING_X - side - 6, 0, SLING_X, 0);
    pg.addColorStop(0, '#7a5230'); pg.addColorStop(1, '#a0714f');
    ctx.fillStyle = pg;
    ctx.beginPath();
    ctx.roundRect(SLING_X - side - 6, top, side, bot - top, 3); ctx.fill();
    ctx.beginPath();
    ctx.roundRect(SLING_X + 5, top, side, bot - top, 3); ctx.fill();

    // band
    const bx1 = SLING_X - 4, bx2 = SLING_X + 5 + side, by = top + 10;
    ctx.strokeStyle = '#7a5230';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    if (isDragging && dragPos) {
      ctx.beginPath(); ctx.moveTo(bx1, by); ctx.lineTo(dragPos.x, dragPos.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx2, by); ctx.lineTo(dragPos.x, dragPos.y); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(bx1, by); ctx.lineTo(SLING_X, GROUND_Y - 44); ctx.lineTo(bx2, by); ctx.stroke();
    }
  };

  // ── cute bird with rosy cheeks ──
  const drawBird = (ctx, x, y, radius) => {
    ctx.save();

    // shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(x + 2, GROUND_Y - 2, radius * 0.85, radius * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();

    // body
    const bg = ctx.createRadialGradient(x - 4, y - 4, 1, x, y, radius);
    bg.addColorStop(0, '#ffb3d9');
    bg.addColorStop(0.7, '#ff6faf');
    bg.addColorStop(1, '#e6447a');
    ctx.fillStyle = bg;
    ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();

    // belly
    ctx.fillStyle = '#ffe0ec';
    ctx.beginPath(); ctx.ellipse(x + 1, y + 3, radius * 0.55, radius * 0.48, 0.15, 0, Math.PI * 2); ctx.fill();

    // beak
    ctx.fillStyle = '#ffaa44';
    ctx.beginPath();
    ctx.moveTo(x + radius * 0.55, y - 1);
    ctx.lineTo(x + radius + 7, y - 2);
    ctx.lineTo(x + radius * 0.55, y + 4);
    ctx.closePath(); ctx.fill();
    // beak line
    ctx.strokeStyle = '#e08830'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + radius * 0.55, y + 1); ctx.lineTo(x + radius + 7, y - 2); ctx.stroke();

    // eye white
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.ellipse(x + radius * 0.32, y - radius * 0.22, radius * 0.38, radius * 0.42, -0.15, 0, Math.PI * 2); ctx.fill();

    // pupil
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.arc(x + radius * 0.38, y - radius * 0.18, radius * 0.22, 0, Math.PI * 2); ctx.fill();

    // eye shine
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(x + radius * 0.42, y - radius * 0.28, radius * 0.1, 0, Math.PI * 2); ctx.fill();

    // ★ rosy cheeks ★
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = '#ffb0c8';
    ctx.beginPath(); ctx.ellipse(x - radius * 0.42, y + radius * 0.18, radius * 0.22, radius * 0.14, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x + radius * 0.62, y + radius * 0.22, radius * 0.2, radius * 0.13, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    // eyebrow
    ctx.strokeStyle = '#c44070'; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x + radius * 0.05, y - radius * 0.55);
    ctx.quadraticCurveTo(x + radius * 0.25, y - radius * 0.7, x + radius * 0.55, y - radius * 0.5);
    ctx.stroke();

    // little tuft on top
    ctx.fillStyle = '#ff85bf';
    ctx.beginPath();
    ctx.moveTo(x - 1, y - radius + 1);
    ctx.quadraticCurveTo(x - 5, y - radius - 7, x - 2, y - radius - 5);
    ctx.quadraticCurveTo(x + 1, y - radius - 9, x + 2, y - radius - 4);
    ctx.quadraticCurveTo(x + 4, y - radius - 6, x + 2, y - radius);
    ctx.closePath(); ctx.fill();

    ctx.restore();
  };

  // ── block ──
  const drawBlock = (ctx, block) => {
    if (block.destroyed) return;
    ctx.save();

    if (block.type === 'wood') {
      const wg = ctx.createLinearGradient(block.x, block.y, block.x + block.w, block.y + block.h);
      wg.addColorStop(0, '#f0c27f');
      wg.addColorStop(0.5, '#d4a054');
      wg.addColorStop(1, '#c08a3a');
      ctx.fillStyle = wg;
      ctx.beginPath(); ctx.roundRect(block.x, block.y, block.w, block.h, 4); ctx.fill();
      // wood lines
      ctx.strokeStyle = 'rgba(160,100,40,0.3)'; ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const ly = block.y + (block.h / 4) * i;
        ctx.beginPath(); ctx.moveTo(block.x + 4, ly); ctx.lineTo(block.x + block.w - 4, ly); ctx.stroke();
      }
    } else {
      const sg = ctx.createLinearGradient(block.x, block.y, block.x + block.w, block.y + block.h);
      sg.addColorStop(0, '#c5cdd6');
      sg.addColorStop(0.5, '#9aa5b4');
      sg.addColorStop(1, '#7a8797');
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.roundRect(block.x, block.y, block.w, block.h, 4); ctx.fill();
      // stone cracks
      ctx.strokeStyle = 'rgba(80,90,100,0.25)'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(block.x + block.w * 0.3, block.y + 3); ctx.lineTo(block.x + block.w * 0.22, block.y + block.h - 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(block.x + block.w * 0.72, block.y + block.h * 0.25); ctx.lineTo(block.x + block.w * 0.8, block.y + block.h - 5); ctx.stroke();
    }

    // border
    ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.roundRect(block.x, block.y, block.w, block.h, 4); ctx.stroke();
    ctx.restore();
  };

  // ── sparkle trail ──
  const drawTrail = (ctx) => {
    const gs = gameStateRef.current;
    gs.trail.forEach((t, i) => {
      const alpha = (t.life / 18) * 0.7;
      const size = 2 + (t.life / 18) * 3;
      ctx.save();
      ctx.globalAlpha = alpha;
      // alternate pink / gold sparkles
      ctx.fillStyle = i % 2 === 0 ? '#ffb6d9' : '#ffe066';
      ctx.beginPath();
      ctx.arc(t.x + (Math.random() - 0.5) * 4, t.y + (Math.random() - 0.5) * 4, size * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  };

  // ── main draw ──
  const draw = (ctx, W, H) => {
    const gs = gameStateRef.current;
    drawBackground(ctx, W, H);

    gs.structures.forEach(b => drawBlock(ctx, b));

    // particles
    gs.particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life / (p.isStar ? 55 : 45);
      if (p.isStar) {
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
          const px = Math.cos(a) * p.size, py = Math.sin(a) * p.size;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();
    });

    // trail behind bird
    if (gs.bird && gs.bird.launched) drawTrail(ctx);

    // slingshot (only when bird not yet launched)
    if (!gs.launched) drawSlingshot(ctx, gs.isDragging, gs.bird);

    // bird
    if (gs.bird) drawBird(ctx, gs.bird.x, gs.bird.y, gs.bird.radius);

    // ── HUD ──
    ctx.save();

    // hearts (lives this level)
    for (let i = 0; i < 3; i++) {
      if (i < gs.livesThisLevel) {
        ctx.shadowColor = '#ff85c2'; ctx.shadowBlur = 7;
      }
      drawHeart(ctx, 22 + i * 26, 22, 9, i < gs.livesThisLevel);
      ctx.shadowBlur = 0;
    }

    // level badge
    const bX = W - 82, bY = 18;
    ctx.fillStyle = 'rgba(255,195,215,0.92)';
    ctx.beginPath(); ctx.roundRect(bX, bY, 68, 28, 14); ctx.fill();
    ctx.fillStyle = '#d63384';
    ctx.font = 'bold 14px "Georgia", serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Level ${gs.currentLevel}`, bX + 34, bY + 19);

    // score
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px "Georgia", serif';
    ctx.strokeStyle = '#e91e8c'; ctx.lineWidth = 3;
    ctx.strokeText(`${gs.score}`, W - 44, 60);
    ctx.fillText(`${gs.score}`, W - 44, 60);
    ctx.textAlign = 'left';

    // birds left pill
    const birdsLeft = gs.maxBirdsPerLevel - gs.birdsUsedThisLevel;
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.beginPath(); ctx.roundRect(12, 48, 88, 24, 12); ctx.fill();
    ctx.fillStyle = '#d63384';
    ctx.font = 'bold 13px "Georgia", serif';
    ctx.fillText(`Birds: ${birdsLeft}/${gs.maxBirdsPerLevel}`, 20, 65);

    ctx.restore();

    // ── overlays ──
    if (gs.levelComplete && gs.currentLevel < 3) {
      ctx.fillStyle = 'rgba(100,220,170,0.35)';
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 16;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 34px "Comic Sans MS", cursive';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#f0a500'; ctx.lineWidth = 4;
      ctx.strokeText('Level Complete! ✨', W / 2, H / 2 - 22);
      ctx.fillText('Level Complete! ✨', W / 2, H / 2 - 22);
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ff85c2';
      ctx.font = 'bold 18px "Georgia", serif';
      ctx.fillText('Next level loading... uwu', W / 2, H / 2 + 20);
      ctx.textAlign = 'left';
      ctx.restore();
    }

    if (gs.gameOver) {
      ctx.fillStyle = 'rgba(30,20,40,0.65)';
      ctx.fillRect(0, 0, W, H);

      const cW = 255, cH = 200;
      const cx = W / 2 - cW / 2, cy = H / 2 - cH / 2;

      ctx.save();
      ctx.shadowColor = 'rgba(230,80,140,0.5)'; ctx.shadowBlur = 18;
      ctx.fillStyle = 'rgba(255,245,248,0.97)';
      ctx.beginPath(); ctx.roundRect(cx, cy, cW, cH, 18); ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();

      ctx.fillStyle = '#e91e8c';
      ctx.font = 'bold 30px "Comic Sans MS", cursive';
      ctx.textAlign = 'center';
      ctx.fillText('Aww, game over~ 💔', W / 2, cy + 52);

      ctx.fillStyle = '#7a6b7a';
      ctx.font = '17px "Georgia", serif';
      ctx.fillText(`Level: ${gs.currentLevel}`, W / 2, cy + 88);
      ctx.fillText(`Score: ${gs.score}`, W / 2, cy + 112);

      ctx.fillStyle = '#c49aad';
      ctx.font = '14px "Georgia", serif';
      ctx.fillText('✨ tap to try again ✨', W / 2, cy + 158);
      ctx.textAlign = 'left';
    }
  };

  // ── victory screen ──
  const drawVictoryScreen = (ctx, W, H) => {
    const gs = gameStateRef.current;
    drawBackground(ctx, W, H);

    ctx.fillStyle = 'rgba(255,220,235,0.4)';
    ctx.fillRect(0, 0, W, H);

    const cW = 275, cH = 225;
    const cx = W / 2 - cW / 2, cy = H / 2 - cH / 2;

    ctx.save();
    ctx.shadowColor = 'rgba(255,180,210,0.6)'; ctx.shadowBlur = 22;
    ctx.fillStyle = 'rgba(255,250,252,0.97)';
    ctx.beginPath(); ctx.roundRect(cx, cy, cW, cH, 20); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.fillStyle = '#e91e8c';
    ctx.font = 'bold 36px "Comic Sans MS", cursive';
    ctx.textAlign = 'center';
    ctx.fillText('🎉 You did it!! 🎉', W / 2, cy + 52);

    ctx.fillStyle = '#ff85c2';
    ctx.font = 'bold 20px "Georgia", serif';
    ctx.fillText('All levels complete~ uwu', W / 2, cy + 90);

    ctx.fillStyle = '#7a6b7a';
    ctx.font = '18px "Georgia", serif';
    ctx.fillText(`Final Score: ${gs.score}`, W / 2, cy + 125);
    ctx.fillText(`Best: ${Math.max(highScore, gs.score)}`, W / 2, cy + 150);

    ctx.fillStyle = '#c49aad';
    ctx.font = '15px "Georgia", serif';
    ctx.fillText('✨ tap to play again ✨', W / 2, cy + 195);
    ctx.textAlign = 'left';
  };

  // ── title / play screen ──
  const drawPlayScreen = useCallback((ctx, W, H) => {
    drawBackground(ctx, W, H);

    drawBlock(ctx, { x: 310, y: GROUND_Y - 35, w: 40, h: 35, type: 'wood', destroyed: false });
    drawBlock(ctx, { x: 310, y: GROUND_Y - 70, w: 40, h: 35, type: 'stone', destroyed: false });
    drawSlingshot(ctx, false, null);
    drawBird(ctx, SLING_X, GROUND_Y - 44, BIRD_RADIUS);

    // title glow
    ctx.save();
    ctx.shadowColor = 'rgba(233,30,140,0.5)'; ctx.shadowBlur = 14;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 34px "Comic Sans MS", cursive';
    ctx.textAlign = 'center';
    ctx.fillText('Angry Birds', W / 2, 62);
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.fillStyle = '#d63384';
    ctx.font = 'bold 15px "Georgia", serif';
    ctx.textAlign = 'center';
    ctx.fillText('3 Levels • 3 Tries Each • Destroy All~', W / 2, 86);

    // PLAY button
    const btnW = 155, btnH = 52;
    const bx = W / 2 - btnW / 2, by = H / 2 - 8;
    ctx.save();
    ctx.shadowColor = '#ff85c2'; ctx.shadowBlur = 18;
    const btnG = ctx.createLinearGradient(bx, by, bx, by + btnH);
    btnG.addColorStop(0, '#ffb3d9');
    btnG.addColorStop(1, '#e91e8c');
    ctx.fillStyle = btnG;
    ctx.beginPath(); ctx.roundRect(bx, by, btnW, btnH, 26); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.restore();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 26px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PLAY ▶', W / 2, by + 36);
    ctx.textAlign = 'left';
  }, []);

  // ═══════════════════════════════════════════════════════════
  //  INPUT
  // ═══════════════════════════════════════════════════════════
  const getCanvasPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (cx - rect.left) * (canvas.width / rect.width),
      y: (cy - rect.top) * (canvas.height / rect.height),
    };
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const pos = getCanvasPos(e);
    const gs = gameStateRef.current;

    if (screen === 'play') { setScreen('game'); resetGame(); gs.animFrame = requestAnimationFrame(gameLoop); return; }
    if (screen === 'over' || screen === 'victory') { resetGame(); setScreen('game'); gs.animFrame = requestAnimationFrame(gameLoop); return; }

    if (gs.bird && !gs.bird.launched && !gs.respawning) {
      const dx = pos.x - gs.bird.x, dy = pos.y - gs.bird.y;
      if (Math.sqrt(dx * dx + dy * dy) < 35) {
        gs.isDragging = true;
        gs.dragStart = pos;
      }
    }
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    const gs = gameStateRef.current;
    if (gs.isDragging && gs.bird && !gs.respawning) {
      const pos = getCanvasPos(e);
      let dx = pos.x - SLING_X, dy = pos.y - (GROUND_Y - 44);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > MAX_DRAG) { dx = (dx / dist) * MAX_DRAG; dy = (dy / dist) * MAX_DRAG; }
      gs.bird.x = SLING_X + dx;
      gs.bird.y = (GROUND_Y - 44) + dy;
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    const gs = gameStateRef.current;
    if (gs.isDragging && gs.bird && !gs.respawning) {
      gs.isDragging = false;
      const dx = SLING_X - gs.bird.x;
      const dy = (GROUND_Y - 44) - gs.bird.y;
      gs.bird.vx = dx * LAUNCH_POWER;
      gs.bird.vy = dy * LAUNCH_POWER;
      gs.bird.launched = true;
      gs.launched = true;
    }
  };

  // ═══════════════════════════════════════════════════════════
  //  EFFECTS
  // ═══════════════════════════════════════════════════════════
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = CANVAS_HEIGHT; };
    resize();
    window.addEventListener('resize', resize);

    let idleFrame = null;
    const idleLoop = () => {
      if (screen === 'play') drawPlayScreen(ctx, canvas.width, canvas.height);
      else if (screen === 'victory') drawVictoryScreen(ctx, canvas.width, canvas.height);
      idleFrame = requestAnimationFrame(idleLoop);
    };
    if (screen === 'play' || screen === 'victory') idleFrame = requestAnimationFrame(idleLoop);

    return () => { window.removeEventListener('resize', resize); if (idleFrame) cancelAnimationFrame(idleFrame); };
  }, [screen, drawPlayScreen, highScore]);

  useEffect(() => {
    if (screen !== 'game' && screen !== 'over') {
      const gs = gameStateRef.current;
      if (gs.animFrame) { cancelAnimationFrame(gs.animFrame); gs.animFrame = null; }
    }
  }, [screen]);

  // ═══════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="particle-playground">
      <div className="playground-header">
        <h3>Angry Birds 🎮</h3>
        {(screen === 'game' || screen === 'over') && (
          <div className="score-row">
            <span className="score-label">Level {currentLevel} • ❤️ {livesThisLevel}</span>
            <span className="score-label">Score: {gameStateRef.current.score}</span>
          </div>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className="particle-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{ cursor: 'pointer', touchAction: 'none' }}
      />
    </div>
  );
};

export default ParticlePlayground;