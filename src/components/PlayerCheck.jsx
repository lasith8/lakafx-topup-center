import { useState } from 'react';

export default function PlayerCheck() {
    const [playerId, setPlayerId] = useState('');
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const checkPlayerId = async () => {
        if (!playerId || playerId.length < 5) {
            setError("කරුණාකර නිවැරදි Player ID එකක් ඇතුලත් කරන්න.");
            return;
        }

        setLoading(true);
        setError(null);
        setPlayerData(null);

        try {
            // Vercel Rewrite Proxy එක හරහා Chamindu API එකට කතා කිරීම
            const response = await fetch(`/api/chamindu/stalk?uid=${playerId}&api_key=chama_api_c9874780f49a6f66d0e3fb70eb9acecb`);
            const result = await response.json();

            // API එකෙන් status: true ආවොත් data ටික ගන්නවා
            if (result.status === true && result.data) {
                setPlayerData(result.data);
            } else {
                setError("Player ID එක වැරදියි හෝ ගිණුමක් නැත.");
            }
        } catch (err) {
            setError("සර්වර් දෝෂයක්. කරුණාකර නැවත උත්සාහ කරන්න.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700 mb-6 shadow-lg">
            <label htmlFor="playerIdInput" className="block text-slate-300 font-bold mb-2">
                Player ID එක ඇතුලත් කරන්න
            </label>
            
            <div className="flex gap-2">
                <input 
                    id="playerIdInput"
                    name="player_id"
                    type="number" 
                    autoComplete="off"
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    placeholder="Eg: 1234567890" 
                    className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white font-mono outline-none focus:border-[#fbbf24] transition-colors"
                />
                <button 
                    onClick={checkPlayerId}
                    disabled={loading}
                    className="bg-[#fbbf24] hover:bg-yellow-500 text-slate-900 font-bold px-5 py-3 rounded-lg whitespace-nowrap transition-transform active:scale-95 disabled:opacity-50"
                >
                    {loading ? "Checking..." : "Check ID"}
                </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-400 mt-3 text-sm font-medium">⚠️ {error}</p>}

            {/* Success Message (Player Profile Card) */}
            {playerData && (
                <div className="mt-4 p-4 bg-slate-900/80 border border-[#fbbf24]/30 rounded-lg flex items-center gap-4 animate-fade-up">
                    {playerData.assets?.avatar?.cdnUrl && (
                        <img 
                            src={playerData.assets.avatar.cdnUrl} 
                            alt="Avatar" 
                            className="w-16 h-16 rounded-md border-2 border-[#fbbf24]" 
                        />
                    )}
                    
                    <div>
                        <h3 className="text-[#fbbf24] font-black text-xl tracking-wide">
                            {playerData.nickname}
                        </h3>
                        <div className="text-slate-300 text-sm flex gap-4 mt-1">
                            <span className="bg-slate-800 px-2 py-1 rounded">
                                ⭐ Level: <b className="text-white">{playerData.basic?.level}</b>
                            </span>
                            <span className="bg-slate-800 px-2 py-1 rounded">
                                ❤️ Likes: <b className="text-white">{playerData.basic?.liked}</b>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}