import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CheckCircle, XCircle, Loader2, User, Trophy, Gamepad2, AlertTriangle } from 'lucide-react'

const PlayerVerifier = ({ onVerifiedPlayer }) => {
  const [uid, setUid] = useState('')
  const [loading, setLoading] = useState(false)
  const [playerData, setPlayerData] = useState(null)
  const [error, setError] = useState('')

  const verifyPlayer = async () => {
    if (!uid.trim()) {
      setError('Please enter a Player ID')
      return
    }

    if (!/^\d+$/.test(uid.trim())) {
      setError('Player ID must contain only numbers')
      return
    }

    setLoading(true)
    setError('')
    setPlayerData(null)

    try {
      // උඩ එකට වැඩ කරපු Allorigins සහ Chamindu API ක්‍රමයම මෙතැනටත් පාවිච්චි කරමු
      const apiUrl = `https://api.chamindu.site/api/v1/freefire/stalk?uid=${uid.trim()}&api_key=chama_api_c9874780f49a6f66d0e3fb70eb9acecb`;
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;
      
      const response = await fetch(proxyUrl)
      const result = await response.json()

      if (result && (result.status === true || result.data)) {
        const data = result.data || result;
        setPlayerData(data)
        
        if (onVerifiedPlayer) {
          onVerifiedPlayer({
            uid: uid.trim(),
            region: 'SG',
            nickname: data.nickname || 'Unknown',
            level: data.basic?.level || 0,
          })
        }
      } else {
        setError(result.detail || 'Player not found. Please check the ID.')
      }
    } catch (err) {
      setError('Network error. Please check your internet connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      verifyPlayer()
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <label htmlFor="uidInput" className="sr-only">Player ID</label>
          <input
            id="uidInput"
            name="uid"
            autoComplete="off"
            type="text"
            value={uid}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '')
              setUid(value)
              setError('')
              setPlayerData(null)
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter Free Fire Player ID (numbers only)..."
            className="input-field pr-12"
            maxLength={20}
          />
          <Gamepad2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
        
        <button
          onClick={verifyPlayer}
          disabled={loading || !uid.trim()}
          className="btn-primary py-3 px-6 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5" />
              Verify
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
          >
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p>{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {playerData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-6 border-neon-blue/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-neon-green" />
              <span className="text-neon-green font-semibold">Player Verified Successfully</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <User className="w-6 h-6 text-neon-blue mx-auto mb-2" />
                <p className="text-gray-400 text-xs mb-1">Nickname</p>
                <p className="text-white font-semibold text-sm truncate">{playerData.nickname || 'N/A'}</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <Trophy className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                <p className="text-gray-400 text-xs mb-1">Level</p>
                <p className="text-white font-semibold text-lg">{playerData.basic?.level || 'N/A'}</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <User className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
                <p className="text-gray-400 text-xs mb-1">Likes</p>
                <p className="text-white font-semibold text-lg">
                  {playerData.basic?.liked?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PlayerVerifier