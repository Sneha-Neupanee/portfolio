import React, { useRef, useEffect, useState, useCallback } from 'react';
import '../styles/ParticlePlayground.css';

const ParticlePlayground = () => {
  const canvasRef = useRef(null);
  const gameStateRef = useRef({
    bird: { x: 80, y: 150, vy: 0, width: 38, height: 30 },
    obstacles: [],
    score: 0,
    gameOver: false,
    animFrame: null,
    lastObstacleTime: 0,
    groundY: 0,
    bgClouds: [],
  });
  const isHoldingRef = useRef(false);
  const scoreRef = useRef(0);
  const [highScore, setHighScore] = useState(0);
  const [screen, setScreen] = useState('play'); // play | instructions | game | over
  const [isHovering, setIsHovering] = useState(false);
  const [, forceUpdate] = useState(0);

  const GRAVITY = 0.3;
  const HOLD_FORCE = -0.5;
  const OBSTACLE_SPEED = 2;
  const OBSTACLE_INTERVAL = 2800;
  const OBSTACLE_WIDTH = 44;
  const OBSTACLE_GAP = 150;
  const CANVAS_HEIGHT = 300;
  const GROUND_H = 36;

  useEffect(() => {
    const clouds = [];
    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: Math.random() * 500,
        y: 20 + Math.random() * 100,
        w: 50 + Math.random() * 60,
        speed: 0.2 + Math.random() * 0.3,
        opacity: 0.15 + Math.random() * 0.15,
      });
    }
    gameStateRef.current.bgClouds = clouds;
  }, []);

  const resetGame = useCallback(() => {
    const gs = gameStateRef.current;
    gs.bird = { x: 80, y: CANVAS_HEIGHT * 0.4, vy: 0, width: 38, height: 30 };
    gs.obstacles = [];
    gs.score = 0;
    scoreRef.current = 0;
    gs.gameOver = false;
    gs.lastObstacleTime = performance.now();
  }, []);

  // ===================== GAME LOOP =====================
  const gameLoop = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gs = gameStateRef.current;
    const W = canvas.width;
    const H = canvas.height;
    gs.groundY = H - GROUND_H;

    if (isHoldingRef.current) {
      gs.bird.vy += HOLD_FORCE;
    } else {
      gs.bird.vy += GRAVITY;
    }
    if (gs.bird.vy < -5) gs.bird.vy = -5;
    if (gs.bird.vy > 6) gs.bird.vy = 6;
    gs.bird.y += gs.bird.vy;

    if (gs.bird.y + gs.bird.height >= gs.groundY) {
      gs.gameOver = true;
      setHighScore(prev => Math.max(prev, gs.score));
      setScreen('over');
      draw(ctx, W, H);
      return;
    }
    if (gs.bird.y < 0) { gs.bird.y = 0; gs.bird.vy = 2; }

    if (timestamp - gs.lastObstacleTime > OBSTACLE_INTERVAL) {
      const minTop = 50;
      const maxTop = gs.groundY - OBSTACLE_GAP - 40;
      const topH = minTop + Math.random() * (maxTop - minTop);
      gs.obstacles.push({ x: W + 10, topH, bottomY: topH + OBSTACLE_GAP, scored: false });
      gs.lastObstacleTime = timestamp;
    }

    for (let i = gs.obstacles.length - 1; i >= 0; i--) {
      const obs = gs.obstacles[i];
      obs.x -= OBSTACLE_SPEED;

      if (!obs.scored && obs.x + OBSTACLE_WIDTH < gs.bird.x) {
        obs.scored = true;
        gs.score++;
        scoreRef.current = gs.score;
        forceUpdate(n => n + 1);
      }

      const pad = 6;
      const bx = gs.bird.x + pad;
      const by = gs.bird.y + pad;
      const bw = gs.bird.width - pad * 2;
      const bh = gs.bird.height - pad * 2;

      if (bx < obs.x + OBSTACLE_WIDTH && bx + bw > obs.x && by < obs.topH) {
        gs.gameOver = true;
        setHighScore(prev => Math.max(prev, gs.score));
        setScreen('over');
        draw(ctx, W, H);
        return;
      }
      if (bx < obs.x + OBSTACLE_WIDTH && bx + bw > obs.x && by + bh > obs.bottomY) {
        gs.gameOver = true;
        setHighScore(prev => Math.max(prev, gs.score));
        setScreen('over');
        draw(ctx, W, H);
        return;
      }

      if (obs.x + OBSTACLE_WIDTH < -20) gs.obstacles.splice(i, 1);
    }

    draw(ctx, W, H);
    gameStateRef.current.animFrame = requestAnimationFrame(gameLoop);
  }, []);

  // ===================== DRAW HELPERS =====================
  const drawSkyAndGround = (ctx, W, H) => {
    const groundY = H - GROUND_H;
    const gs = gameStateRef.current;

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, groundY);
    sky.addColorStop(0, '#87CEEB');
    sky.addColorStop(0.6, '#B0E0E6');
    sky.addColorStop(1, '#FFE4E1');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, groundY);

    gs.bgClouds.forEach(c => {
      ctx.save();
      ctx.globalAlpha = c.opacity;
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w / 2, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(c.x - c.w * 0.2, c.y + 4, c.w * 0.3, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(c.x + c.w * 0.22, c.y + 3, c.w * 0.28, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Ground gradient
    const grd = ctx.createLinearGradient(0, groundY, 0, H);
    grd.addColorStop(0, '#90EE90');
    grd.addColorStop(1, '#228B22');
    ctx.fillStyle = grd;
    ctx.fillRect(0, groundY, W, H - groundY);

    ctx.strokeStyle = '#32CD32';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(W, groundY);
    ctx.stroke();
  };

  const drawPipe = (ctx, x, y, w, h, isTop) => {
    if (h <= 0) return;
    ctx.save();

    // Pipe body
    const pipeGrad = ctx.createLinearGradient(x, 0, x + w, 0);
    pipeGrad.addColorStop(0, '#FFB6C1');
    pipeGrad.addColorStop(0.5, '#FF69B4');
    pipeGrad.addColorStop(1, '#FFB6C1');
    ctx.fillStyle = pipeGrad;
    ctx.fillRect(x + 4, y, w - 8, h);

    const capH = 18;
    const capGrad = ctx.createLinearGradient(x, 0, x + w, 0);
    capGrad.addColorStop(0, '#FF1493');
    capGrad.addColorStop(0.5, '#FF69B4');
    capGrad.addColorStop(1, '#FF1493');
    ctx.fillStyle = capGrad;

    if (isTop) {
      ctx.beginPath();
      ctx.roundRect(x, y + h - capH, w, capH, [0, 0, 6, 6]);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.roundRect(x, y, w, capH, [6, 6, 0, 0]);
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + (isTop ? 4 : capH + 4));
    ctx.lineTo(x + 10, y + h - (isTop ? capH + 4 : 4));
    ctx.stroke();

    ctx.restore();
  };

  const drawBird = (ctx, bird) => {
    const { x, y, width, height } = bird;
    const tilt = Math.min(Math.max(bird.vy * 0.07, -0.35), 1.1);

    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(tilt);
    ctx.translate(-width / 2, -height / 2);

    // Bird body
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(width / 2, height / 2, width / 2, height / 2 - 1, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.ellipse(width / 2 + 2, height / 2 + 3, width / 2 - 7, height / 2 - 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wing
    ctx.fillStyle = '#FF8C00';
    ctx.beginPath();
    ctx.ellipse(width / 2 - 4, height / 2 - 2, 7, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Eye white
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(width / 2 + 6, height / 2 - 4, 5, 0, Math.PI * 2);
    ctx.fill();

    // Eye pupil
    ctx.fillStyle = '#2d3436';
    ctx.beginPath();
    ctx.arc(width / 2 + 7.5, height / 2 - 4, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Beak
    ctx.fillStyle = '#FF6347';
    ctx.beginPath();
    ctx.moveTo(width, height / 2 - 2);
    ctx.lineTo(width + 7, height / 2 + 1);
    ctx.lineTo(width, height / 2 + 4);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  // ===================== DRAW MAIN GAME =====================
  const draw = (ctx, W, H) => {
    const gs = gameStateRef.current;
    const groundY = gs.groundY || H - GROUND_H;

    drawSkyAndGround(ctx, W, H);

    gs.obstacles.forEach(obs => {
      drawPipe(ctx, obs.x, 0, OBSTACLE_WIDTH, obs.topH, true);
      drawPipe(ctx, obs.x, obs.bottomY, OBSTACLE_WIDTH, groundY - obs.bottomY, false);
    });

    drawBird(ctx, gs.bird);

    // Live score on canvas
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px "Georgia", serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 3;
    ctx.fillText(gs.score.toString(), W / 2, 30);
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';

    if (gs.gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, W, H);

      const cardW = 210, cardH = 150;
      const cx = W / 2 - cardW / 2, cy = H / 2 - cardH / 2;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.roundRect(cx, cy, cardW, cardH, 14);
      ctx.fill();

      ctx.fillStyle = '#FF69B4';
      ctx.font = 'bold 22px "Georgia", serif';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', W / 2, cy + 40);

      ctx.fillStyle = '#636e72';
      ctx.font = '15px "Georgia", serif';
      ctx.fillText('Score: ' + gs.score, W / 2, cy + 68);

      ctx.fillStyle = '#b2bec3';
      ctx.font = '12px "Georgia", serif';
      ctx.fillText('Tap anywhere to play again', W / 2, cy + 108);
      ctx.textAlign = 'left';
    }
  };

  // ===================== DRAW PLAY SCREEN =====================
  const drawPlayScreen = useCallback((ctx, W, H) => {
    const groundY = H - GROUND_H;
    drawSkyAndGround(ctx, W, H);

    const time = Date.now();

    // Gentle floating particles
    const particles = [
      { x: W * 0.15, y: 40 + Math.sin(time / 800) * 8, r: 3, color: '#FFB6C1' },
      { x: W * 0.35, y: 70 + Math.sin(time / 900 + 1) * 10, r: 4, color: '#FF69B4' },
      { x: W * 0.65, y: 50 + Math.sin(time / 1000 + 2) * 9, r: 3.5, color: '#FFB6C1' },
      { x: W * 0.85, y: 65 + Math.sin(time / 850 + 3) * 7, r: 3, color: '#FF1493' },
    ];
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Left pipe
    drawPipe(ctx, -10, 0, OBSTACLE_WIDTH, groundY * 0.38, true);
    drawPipe(ctx, -10, groundY * 0.62, OBSTACLE_WIDTH, groundY - groundY * 0.62, false);

    // Right pipe
    drawPipe(ctx, W - OBSTACLE_WIDTH + 6, 0, OBSTACLE_WIDTH, groundY * 0.42, true);
    drawPipe(ctx, W - OBSTACLE_WIDTH + 6, groundY * 0.66, OBSTACLE_WIDTH, groundY - groundY * 0.66, false);

    // Bird floating animation
    const bobY = Math.sin(time / 500) * 8;
    const birdCx = W / 2;
    const birdCy = groundY * 0.35 + bobY;
    
    const idleBird = { x: birdCx - 19, y: birdCy, vy: 0, width: 38, height: 30 };
    drawBird(ctx, idleBird);

    // Title
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 28px "Comic Sans MS", cursive';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(255,105,180,0.5)';
    ctx.shadowBlur = 8;
    ctx.fillText('Cloud Dodge', W / 2, groundY * 0.16);
    ctx.shadowBlur = 0;

    // PLAY button with hover effect
    const playScale = isHovering ? 1.12 : 1;
    const playY = groundY * 0.58;
    
    ctx.save();
    ctx.translate(W / 2, playY + 23);
    ctx.scale(playScale, playScale);
    ctx.translate(-W / 2, -(playY + 23));

    // Button background
    const btnW = 140, btnH = 46;
    const bx = W / 2 - btnW / 2;
    
    // Button glow
    if (isHovering) {
      ctx.shadowColor = '#FF69B4';
      ctx.shadowBlur = 20;
    }
    
    // Button gradient
    const btnGrad = ctx.createLinearGradient(bx, playY, bx, playY + btnH);
    btnGrad.addColorStop(0, '#FFB6C1');
    btnGrad.addColorStop(1, '#FF69B4');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(bx, playY, btnW, btnH, 23);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    
    // PLAY text
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 24px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 2;
    ctx.fillText('PLAY', W / 2, playY + 31);
    ctx.shadowBlur = 0;
    
    ctx.restore();
    ctx.textAlign = 'left';
  }, [isHovering]);

  // ===================== DRAW INSTRUCTIONS =====================
  const drawInstructions = useCallback((ctx, W, H) => {
    drawSkyAndGround(ctx, W, H);

    const cardW = W - 48, cardH = 210;
    const cx = 24, cy = (H - cardH) / 2 - 10;
    ctx.fillStyle = 'rgba(255,255,255,0.93)';
    ctx.beginPath();
    ctx.roundRect(cx, cy, cardW, cardH, 14);
    ctx.fill();

    ctx.fillStyle = '#FF69B4';
    ctx.font = 'bold 18px "Georgia", serif';
    ctx.textAlign = 'center';
    ctx.fillText('How to Play', W / 2, cy + 34);

    const lines = [
      'Hold down to make the bird fly up.',
      'Let go and the bird will fall down.',
      'Dodge the pink pipes on the right.',
      'Each pipe you pass gives you a point.',
    ];
    ctx.fillStyle = '#636e72';
    ctx.font = '13px "Georgia", serif';
    ctx.textAlign = 'left';
    lines.forEach((line, i) => {
      ctx.fillText((i + 1) + '.  ' + line, cx + 22, cy + 72 + i * 26);
    });

    // Start button
    const btnW = 130, btnH = 38;
    const bx = W / 2 - btnW / 2, by = cy + cardH - 58;
    
    const btnGrad = ctx.createLinearGradient(bx, by, bx, by + btnH);
    btnGrad.addColorStop(0, '#FFB6C1');
    btnGrad.addColorStop(1, '#FF69B4');
    ctx.fillStyle = btnGrad;
    ctx.beginPath();
    ctx.roundRect(bx, by, btnW, btnH, 20);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 15px "Georgia", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Start Game', W / 2, by + btnH / 2 + 5);
    ctx.textAlign = 'left';
  }, []);

  // ===================== EFFECT: idle screen animation loop =====================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = CANVAS_HEIGHT;
    };
    resize();
    window.addEventListener('resize', resize);

    let idleFrame = null;
    const idleLoop = () => {
      if (screen === 'play') {
        drawPlayScreen(ctx, canvas.width, canvas.height);
      } else if (screen === 'instructions') {
        drawInstructions(ctx, canvas.width, canvas.height);
      }
      idleFrame = requestAnimationFrame(idleLoop);
    };

    if (screen === 'play' || screen === 'instructions') {
      idleFrame = requestAnimationFrame(idleLoop);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (idleFrame) cancelAnimationFrame(idleFrame);
    };
  }, [screen, drawPlayScreen, drawInstructions]);

  // Cancel game loop when not playing
  useEffect(() => {
    if (screen !== 'game' && screen !== 'over') {
      if (gameStateRef.current.animFrame) {
        cancelAnimationFrame(gameStateRef.current.animFrame);
        gameStateRef.current.animFrame = null;
      }
    }
  }, [screen]);

  // ===================== INPUT HANDLERS =====================
  const getCanvasPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const handlePressStart = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const W = canvas.width;
    const H = canvas.height;
    const groundY = H - GROUND_H;

    if (screen === 'play') {
      setScreen('instructions');
      return;
    }

    if (screen === 'instructions') {
      const cardH = 210;
      const cy = (H - cardH) / 2 - 10;
      const btnW = 130, btnH = 38;
      const bx = W / 2 - btnW / 2, by = cy + cardH - 58;
      const pos = getCanvasPos(e);
      if (pos.x >= bx && pos.x <= bx + btnW && pos.y >= by && pos.y <= by + btnH) {
        resetGame();
        setScreen('game');
        isHoldingRef.current = true;
        gameStateRef.current.animFrame = requestAnimationFrame(gameLoop);
      }
      return;
    }

    if (screen === 'over') {
      resetGame();
      setScreen('game');
      isHoldingRef.current = true;
      gameStateRef.current.animFrame = requestAnimationFrame(gameLoop);
      return;
    }

    isHoldingRef.current = true;
  };

  const handlePressEnd = (e) => {
    e.preventDefault();
    isHoldingRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (screen !== 'play') return;
    
    const canvas = canvasRef.current;
    const W = canvas.width;
    const H = canvas.height;
    const groundY = H - GROUND_H;
    const pos = getCanvasPos(e);
    
    // Check if hovering over PLAY button
    const playY = groundY * 0.58;
    const btnW = 140, btnH = 46;
    const bx = W / 2 - btnW / 2;
    
    const isHover = pos.x >= bx && 
                    pos.x <= bx + btnW &&
                    pos.y >= playY && 
                    pos.y <= playY + btnH;
    
    setIsHovering(isHover);
  };

  return (
    <div className="particle-playground">
      <div className="playground-header">
        <h3>Cloud Dodge</h3>
        {(screen === 'game' || screen === 'over') && (
          <div className="score-row">
            <span className="score-label">Score: {scoreRef.current}</span>
            <span className="score-label">Best: {highScore}</span>
          </div>
        )}
      </div>

      <canvas
        ref={canvasRef}
        className="particle-canvas"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={(e) => {
          handlePressEnd(e);
          setIsHovering(false);
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        style={{ cursor: 'pointer', touchAction: 'none' }}
      />
    </div>
  );
};

export default ParticlePlayground;