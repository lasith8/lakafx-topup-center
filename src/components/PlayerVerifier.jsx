import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CheckCircle, XCircle, Loader2, User, Trophy, Gamepad2, AlertTriangle } from 'lucide-react'

const regions = [
  { code: 'SG', name: 'Singapore (Sri Lanka)' },
  { code: 'IND', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'US', name: 'USA' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'TH', name: 'Thailand' },
  { code: 'ME', name: 'Middle East' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'CIS', name: 'CIS' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'RU', name: 'Russia' },
  { code: 'TW', name: 'Taiwan' },
]

const PlayerVerifier = ({ onVerifiedPlayer }) => {
  const [region, setRegion] = useState('SG')
  const [uid, setUid] = useState('')
  const [loading, setLoading] = useState(false)
  const [playerData, setPlayerData] = useState(null)
  const [error, setError] = useState('')
  const [apiResponse, setApiResponse] = useState(null)

  const verifyPlayer = async () => {
    if (!uid.trim()) {
      setError('Please enter a Player ID')
      return
    }

    // Validate UID is numeric
    if (!/^\d+$/.test(uid.trim())) {
      setError('Player ID must contain only numbers')
      return
    }

    setLoading(true)
    setError('')
    setPlayerData(null)
    setApiResponse(null)

    try {
      // කෙලින්ම API එකට යන්නේ නැතුව allorigins proxy එක හරහා යැවීම
      const targetUrl = `https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=${region}&uid=${uid.trim()}`;
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      
      // Log the raw response for debugging
      console.log('API Response Status:', response.status)
      
      // Try to parse JSON regardless of status
      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError)
        setError('Invalid response from server. Please try again later.')
        setLoading(false)
        return
      }
      
      console.log('API Response Data:', data)
      setApiResponse(data)

      // Check for API error response
      if (data.error) {
        setError(data.message || 'Player not found. Please check the ID and region.')
        setLoading(false)
        return
      }

      // Check if basicInfo exists (the actual player data)
      if (!data.basicInfo || !data.basicInfo.accountId) {
        setError('Player not found. Please check the ID and region.')
        setLoading(false)
        return
      }

      // Player found!
      setPlayerData(data)
      
      if (onVerifiedPlayer) {
        onVerifiedPlayer({
          uid: uid.trim(),
          region,
          nickname: data.basicInfo?.nickname || 'Unknown',
          level: data.basicInfo?.level || 0,
        })
      }
    } catch (err) {
      console.error('Network/Error:', err)
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
        
        {/* අලුතින් එකතු කළ Region Label සහ Attributes */}
        <label htmlFor="regionSelect" className="sr-only">Select Region</label>
        <select
          id="regionSelect"
          name="region"
          autoComplete="off"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="input-field sm:w-48"
        >
          {regions.map((r) => (
            <option key={r.code} value={r.code}>
              {r.code} - {r.name}
            </option>
          ))}
        </select>
        
        <div className="flex-1 relative">
          {/* අලුතින් එකතු කළ Player ID Label සහ Attributes */}
          <label htmlFor="uidInput" className="sr-only">Player ID</label>
          <input
            id="uidInput"
            name="uid"
            autoComplete="off"
            type="text"
            value={uid}
            onChange={(e) => {
              // Only allow numbers
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

      {/* Tips for users */}
      {!playerData && !error && !loading && (
        <div className="flex items-start gap-2 p-3 bg-neon-blue/5 border border-neon-blue/20 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-neon-blue flex-shrink-0 mt-0.5" />
          <p className="text-gray-400 text-xs">
            Tip: Your Player ID is a number found in your Free Fire profile. 
            For Sri Lanka, try <span className="text-neon-blue">SG (Singapore)</span> or <span className="text-neon-blue">IND (India)</span> region.
          </p>
        </div>
      )}

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
              {apiResponse && (
                <p className="text-xs mt-1 opacity-70">Response: {JSON.stringify(apiResponse).substring(0, 100)}...</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {playerData && playerData.basicInfo && (
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
                <p className="text-white font-semibold text-sm truncate">{playerData.basicInfo?.nickname || 'N/A'}</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <Trophy className="w-6 h-6 text-neon-purple mx-auto mb-2" />
                <p className="text-gray-400 text-xs mb-1">Level</p>
                <p className="text-white font-semibold text-lg">{playerData.basicInfo?.level || 'N/A'}</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <Gamepad2 className="w-6 h-6 text-neon-pink mx-auto mb-2" />
                <p className="text-gray-400 text-xs mb-1">Rank</p>
                <p className="text-white font-semibold text-lg">{playerData.basicInfo?.rank || 'N/A'}</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <User className="w-6 h-6 text-neon-cyan mx-auto mb-2" />
                <p className="text-gray-400 text-xs mb-1">Likes</p>
                <p className="text-white font-semibold text-lg">
                  {playerData.basicInfo?.liked?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-gray-400 text-xs text-center">
                Region: <span className="text-neon-blue">{region}</span> | 
                UID: <span className="text-neon-blue">{uid}</span> | 
                Account ID: <span className="text-neon-blue">{playerData.basicInfo?.accountId}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PlayerVerifier