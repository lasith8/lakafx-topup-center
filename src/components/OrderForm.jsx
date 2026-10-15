import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Gamepad2, Package, User, Phone, CreditCard } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'
import UploadScreenshot from './UploadScreenshot'
import PlayerVerifier from './PlayerVerifier'

const games = [
  { id: 'freefire', name: 'Free Fire', icon: '🔥', needsVerification: true },
  { id: 'pubg', name: 'PUBG Mobile', icon: '🎯', needsVerification: false },
  { id: 'mobilelegends', name: 'Mobile Legends', icon: '⚔️', needsVerification: false },
  { id: 'codm', name: 'COD Mobile', icon: '🎮', needsVerification: false },
]

const packages = {
  freefire: ['25 Diamonds', '50 Diamonds', '115 Diamonds', '240 Diamonds', '355 Diamonds', '530 Diamonds', '1060 Diamonds', '2180 Diamonds'],
  pubg: ['60 UC', '325 UC', '660 UC', '1800 UC', '3850 UC'],
  mobilelegends: ['86 Diamonds', '172 Diamonds', '257 Diamonds', '514 Diamonds'],
  codm: ['80 CP', '420 CP', '880 CP', '2400 CP'],
}

const OrderForm = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [formData, setFormData] = useState({
    game: '',
    package: '',
    playerId: '',
    phone: '',
    playerVerified: false,
    verifiedPlayerData: null,
  })
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'game' ? { package: '', playerVerified: false, verifiedPlayerData: null } : {}),
    }))
    setError('')
  }

  const handleVerifiedPlayer = (data) => {
    setFormData((prev) => ({
      ...prev,
      playerId: data.uid,
      playerVerified: true,
      verifiedPlayerData: data,
    }))
  }

  const handleImageUpload = (file) => {
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    setImageFile(null)
  }

  const validateForm = () => {
    if (!formData.game) return 'Please select a game'
    if (!formData.package) return 'Please select a package'
    if (!formData.playerId.trim()) return 'Please enter your Player ID'
    
    const selectedGame = games.find(g => g.id === formData.game)
    if (selectedGame?.needsVerification && !formData.playerVerified) {
      return 'Please verify your Free Fire Player ID before submitting'
    }
    
    if (!formData.phone.trim()) return 'Please enter your phone number'
    if (!imageFile) return 'Please upload payment screenshot'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      setIsUploading(true)
      const storageRef = ref(storage, `screenshots/${Date.now()}_${imageFile.name}`)
      await uploadBytes(storageRef, imageFile)
      const screenshotUrl = await getDownloadURL(storageRef)
      setIsUploading(false)

      const orderData = {
        game: formData.game,
        package: formData.package,
        playerId: formData.playerId,
        phone: formData.phone,
        paymentMethod: 'eZ Cash',
        paymentNumber: '0740482490', // මෙතන ඔයාගේ අලුත් නම්බර් එක (0750672056) දාන්න ඕනෙනම් වෙනස් කරන්න
        screenshot: screenshotUrl,
        status: 'Pending',
        playerVerified: formData.playerVerified,
        verifiedPlayerData: formData.verifiedPlayerData,
        createdAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'orders'), orderData)

      setSuccess(true)
      
      const gameName = games.find(g => g.id === formData.game)?.name || formData.game
      const whatsappMessage = `LAKAFX TOP UP CENTER%0A%0A` +
        `Game: ${gameName}%0A` +
        `Package: ${formData.package}%0A` +
        `Player ID: ${formData.playerId}%0A` +
        `Phone: ${formData.phone}%0A` +
        `Payment Method: eZ Cash%0A` +
        `Payment Number: 0740482490`

      setTimeout(() => {
        window.open(`https://wa.me/94740482490?text=${whatsappMessage}`, '_blank')
      }, 1500)

      setFormData({ game: '', package: '', playerId: '', phone: '', playerVerified: false, verifiedPlayerData: null })
      setUploadedImage(null)
      setImageFile(null)

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error('Error submitting order:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
      setIsUploading(false)
    }
  }

  if (success) {
    return (
      <section id="order" className="section-padding relative overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-neon-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-display text-3xl font-bold text-white mb-4">Order Submitted!</h3>
            <p className="text-gray-400 mb-6">Your order has been received. Redirecting to WhatsApp...</p>
            <div className="w-full bg-dark-600 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5 }}
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
              />
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  const selectedGame = games.find(g => g.id === formData.game)
  const showVerifier = selectedGame?.needsVerification && formData.game === 'freefire'

  return (
    <section id="order" className="section-padding relative overflow-hidden bg-dark-800/50">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px]" />
      
      <div className="max-w-2xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-neon-blue font-semibold text-sm tracking-widest uppercase mb-4 block">
            Place Order
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Order <span className="neon-text">Now</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card p-8 space-y-6"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Game Selection */}
          <div>
            <label htmlFor="gameSelect" className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-2">
              <Gamepad2 className="w-4 h-4 text-neon-blue" />
              Select Game
            </label>
            <select
              id="gameSelect"
              name="game"
              autoComplete="off"
              value={formData.game}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Choose a game...</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.icon} {game.name}
                </option>
              ))}
            </select>
          </div>

          {showVerifier && (
            <div className="bg-neon-blue/5 border border-neon-blue/20 rounded-xl p-4">
              <p className="text-neon-blue text-sm font-medium mb-3 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Verify Your Free Fire Account
              </p>
              <PlayerVerifier onVerifiedPlayer={handleVerifiedPlayer} />
            </div>
          )}

          {/* Player ID (if not verified through the component) */}
          {!showVerifier && (
            <div>
              <label htmlFor="playerIdInput" className="flex items-center gap-2 text-gray-300 text-sm font-medium mb-2">
                <User className="w-4 h-4 text-neon-pink" />
                Player ID
              </label>
              <input
                id="playerIdInput"
                type="text"
                name="playerId"
                autoComplete="off"
                value={formData.playerId}
                onChange={handleInputChange}
                placeholder="Enter your game Player ID"
                className="input-field"
              />
            </div>
          )}

          {formData.playerVerified &&