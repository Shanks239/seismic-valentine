import React, { useState, useRef, useEffect } from 'react';
import { Heart, Download, Upload, Sparkles } from 'lucide-react';

export default function SeismicValentineCard() {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const confettiCanvasRef = useRef(null);

  // Valentine's messages - will randomly pick one and personalize it
  const messages = [
    "Dear {name}, in a world of endless volatility, you're my constant. Through every bull and bear market, my heart only knows one direction with you... up. Forever bullish on us. 💝",
    "{name}, they say diamonds are formed under pressure, but you shine brightest in every moment. You're not just rare, you're 1 of 1, and I'm grateful every day that I found you. 💎",
    "To {name}, some people chase pumps, but I found everything I need when I found you. You're my moon, my stars, and the reason I believe in something bigger than myself. 🌙",
    "{name}, in this decentralized world, you're the only consensus I need. Every block, every day, every moment with you is a treasure I'll HODL forever. ❤️",
    "My dearest {name}, they say 'WAGMI' but with you, I know we already have. You're the gem I never knew I was searching for, and now I never want to let go. 💕",
    "{name}, forget the charts and the gains - you're the only investment that truly matters. My heart yields infinite returns when I'm with you. Forever staking my love with you. 📈",
    "To my Valentine {name}, in a sea of noise and chaos, you're my signal. You're the reason I believe in magic, in connection, and in a future brighter than any moon. ✨",
    "{name}, some things are meant to be held forever. My keys, my seed phrase, and most importantly... my love for you. Happy Valentine's Day. 🚀"
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCard = () => {
    if (!name || !profilePic) {
      alert('Please enter your name and upload a profile picture! 💝');
      return;
    }
    
    setIsGenerating(true);
    setTimeout(() => {
      setShowCard(true);
      setIsGenerating(false);
      setShowConfetti(true);
      drawCard();
      
      // Stop confetti after 4 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
    }, 800);
  };

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = 1200;
    const height = 630;
    
    canvas.width = width;
    canvas.height = height;

    // Brand colors from Figma - gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#2d2433');  // Dark purple/brown
    gradient.addColorStop(0.4, '#6b4d5e'); // Mid mauve
    gradient.addColorStop(0.7, '#9b7b8f'); // Light mauve  
    gradient.addColorStop(1, '#b89da8');   // Soft pink
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some floating hearts in background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 25 + 15;
      ctx.font = `${size}px Arial`;
      ctx.fillText('💝', x, y);
    }

    // Load images with proper sequencing
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    
    logoImg.onload = () => {
      // Seismic logo - CENTERED watermark
      const logoSize = 200;
      const logoX = width / 2 - logoSize / 2;
      const logoY = height / 2 - logoSize / 2 + 20;
      
      ctx.globalAlpha = 0.15;
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
      ctx.globalAlpha = 1;

      // "Seismic" text next to logo (centered)
      ctx.globalAlpha = 0.15;
      ctx.font = 'bold 80px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.fillText('Seismic', logoX + logoSize + 20, logoY + logoSize / 2 + 25);
      ctx.globalAlpha = 1;

      // Now load and draw profile picture
      if (profilePic) {
        const pfpImg = new Image();
        pfpImg.onload = () => {
          const pfpSize = 140;
          const pfpX = 60;
          const pfpY = 50;
          
          // Draw circle clip for pfp
          ctx.save();
          ctx.beginPath();
          ctx.arc(pfpX + pfpSize / 2, pfpY + pfpSize / 2, pfpSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(pfpImg, pfpX, pfpY, pfpSize, pfpSize);
          ctx.restore();
          
          // Border around pfp with brand gold color
          ctx.strokeStyle = '#c9b895';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(pfpX + pfpSize / 2, pfpY + pfpSize / 2, pfpSize / 2, 0, Math.PI * 2);
          ctx.stroke();

          // Draw the message
          drawMessage(ctx, width, height);
        };
        pfpImg.src = profilePic;
      } else {
        drawMessage(ctx, width, height);
      }
    };
    
    logoImg.onerror = () => {
      console.log('Logo failed to load, drawing without it');
      if (profilePic) {
        const pfpImg = new Image();
        pfpImg.onload = () => {
          const pfpSize = 140;
          const pfpX = 60;
          const pfpY = 50;
          
          ctx.save();
          ctx.beginPath();
          ctx.arc(pfpX + pfpSize / 2, pfpY + pfpSize / 2, pfpSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(pfpImg, pfpX, pfpY, pfpSize, pfpSize);
          ctx.restore();
          
          ctx.strokeStyle = '#c9b895';
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(pfpX + pfpSize / 2, pfpY + pfpSize / 2, pfpSize / 2, 0, Math.PI * 2);
          ctx.stroke();

          drawMessage(ctx, width, height);
        };
        pfpImg.src = profilePic;
      } else {
        drawMessage(ctx, width, height);
      }
    };
    
    logoImg.src = '/seismic-logo.jpg';
  };

  const drawMessage = (ctx, width, height) => {
    // Personalized message - wrapped text for longer messages
    const message = messages[Math.floor(Math.random() * messages.length)].replace('{name}', name);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 15;
    
    // Word wrap function
    const maxWidth = width - 120;
    const lineHeight = 40;
    const words = message.split(' ');
    let line = '';
    let y = height - 200;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, width / 2, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width / 2, y);
    
    ctx.shadowBlur = 0;

    // "Happy Valentine's Day" subtitle at bottom
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#e8dcc8'; // Brand cream color
    ctx.fillText('Happy Valentine\'s Day 💕', width / 2, height - 40);

    // Small Seismic branding - top right
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'right';
    ctx.fillText('Seismic', width - 30, 35);
  };

  useEffect(() => {
    if (showCard) {
      drawCard();
    }
  }, [showCard, name, profilePic]);

  useEffect(() => {
    if (showConfetti) {
      const canvas = confettiCanvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const confettiPieces = [];
      const confettiCount = 150;
      const colors = ['#ff6b9d', '#c9b895', '#ffc93c', '#b89da8', '#9b7b8f', '#ff8fab'];
      
      // Create confetti pieces
      for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height - canvas.height,
          w: Math.random() * 10 + 5,
          h: Math.random() * 10 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 10 - 5
        });
      }
      
      let animationFrame;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach((piece) => {
          ctx.save();
          ctx.translate(piece.x + piece.w / 2, piece.y + piece.h / 2);
          ctx.rotate((piece.rotation * Math.PI) / 180);
          ctx.fillStyle = piece.color;
          ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
          ctx.restore();
          
          piece.y += piece.speed;
          piece.rotation += piece.rotationSpeed;
          
          if (piece.y > canvas.height) {
            piece.y = -20;
            piece.x = Math.random() * canvas.width;
          }
        });
        
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [showConfetti]);

  const downloadCard = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `seismic-valentine-${name}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen text-white p-6" style={{
      background: 'linear-gradient(135deg, #2d2433 0%, #6b4d5e 40%, #9b7b8f 70%, #b89da8 100%)'
    }}>
      {/* Confetti Canvas */}
      {showConfetti && (
        <canvas
          ref={confettiCanvasRef}
          className="fixed inset-0 pointer-events-none z-50"
        />
      )}
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-pink-400 animate-pulse" />
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-300 to-amber-200 bg-clip-text text-transparent">
            Seismic Valentine's
          </h1>
          <p className="text-xl text-gray-300">
            Create your personalized Valentine's card 💝
          </p>
        </div>

        {!showCard ? (
          /* Input Form */
          <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name or username"
                  className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-white placeholder-gray-400"
                />
              </div>

              {/* Profile Picture Upload */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Profile Picture
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-6 py-4 bg-black/40 border-2 border-dashed border-white/20 rounded-lg hover:border-pink-400/50 transition-all flex items-center justify-center gap-3 group"
                >
                  <Upload className="w-5 h-5 group-hover:text-pink-400 transition-colors" />
                  <span className="group-hover:text-pink-400 transition-colors">
                    {profilePic ? '✓ Picture Uploaded' : 'Upload Profile Picture'}
                  </span>
                </button>
                
                {profilePic && (
                  <div className="mt-4 flex justify-center">
                    <img 
                      src={profilePic} 
                      alt="Preview" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-pink-500"
                    />
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={generateCard}
                disabled={isGenerating}
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg text-white"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Generating Your Card...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    Generate Valentine's Card
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Generated Card Display */
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
              <canvas
                ref={canvasRef}
                className="w-full rounded-lg shadow-xl"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={downloadCard}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download Card
              </button>
              
              <button
                onClick={() => {
                  setShowCard(false);
                  setName('');
                  setProfilePic(null);
                }}
                className="flex-1 px-8 py-4 bg-black/50 hover:bg-black/70 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3 border border-white/20"
              >
                Create Another
              </button>
            </div>

            <p className="text-center text-gray-400 text-sm">
              Share your Valentine's card with the community! 💝
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with love ❤️ by raya for the seismic community</p>
        </div>
      </div>
    </div>
  );
}
