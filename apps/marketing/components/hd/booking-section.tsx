'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Check, Calendar, Lock, Mail, Phone, Loader2 } from 'lucide-react'
import { useAvailableSlots, useCreateBooking } from '@/hooks/use-booking'

const needOptions = [
  'Création société France',
  'LLC Delaware / US',
  'Secrétariat juridique',
  'M&A Corporate',
  'Autre',
]

interface BookingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  duration: '15' | '30'
  need: string
}

export function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [calendarLink, setCalendarLink] = useState<string | null>(null)
  const [formData, setFormData] = useState<BookingData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    duration: '30',
    need: 'Création société France',
  })

  // API hooks
  const { slots, isLoading: slotsLoading } = useAvailableSlots(
    selectedDate?.toISOString().split('T')[0] || null
  )
  const { createBooking, isSubmitting, error: bookingError } = useCreateBooking()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right')
            elements.forEach((el) => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    let startDay = firstDay.getDay() - 1
    if (startDay < 0) startDay = 6

    const days: (Date | null)[] = []

    for (let i = 0; i < startDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const isWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  const isPast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isSameDay = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setShowForm(false)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedDate || !selectedTime) return

    const result = await createBooking({
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      service: formData.need,
      message: `Durée souhaitée : ${formData.duration} minutes`,
    })

    if (result) {
      setIsBooked(true)
      setCalendarLink(result.calendarLink || null)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
    }
  }

  const days = getDaysInMonth(currentDate)
  const monthYear = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

  // Get available time slots from API
  const availableTimeSlots = slots.filter((slot) => slot.available)

  return (
    <section id="booking" ref={sectionRef} className="bg-hd-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div className="reveal-left" style={{ transitionDelay: '0.2s' }}>
            <span className="text-sm text-hd-gold tracking-wide font-medium">
              — Gratuit, sans engagement
            </span>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-hd-green mt-4 mb-6">
              Parlons de votre projet.{' '}
              <em className="italic">30 minutes offertes.</em>
            </h2>

            <p className="text-hd-green/80 leading-relaxed mb-8">
              {
                "Que vous soyez jeune entrepreneur français ou membre de la diaspora, réservez un appel gratuit avec Hamidou. On analyse votre situation, on répond à vos questions — zéro vente forcée."
              }
            </p>

            {/* Reassurance points */}
            <ul className="space-y-3 mb-10">
              {[
                'Appel vidéo Google Meet ou WhatsApp',
                '15 ou 30 minutes selon votre besoin',
                'Réponse sous 24h',
                '100% gratuit, sans engagement',
              ].map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-hd-gold rounded-full" />
                  <span className="text-sm text-hd-green/70">{point}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-hd-green/10 pt-8 mb-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="mailto:hamidoudiallo.fusac@gmail.com"
                  className="flex items-center gap-3 text-sm text-hd-green/70 hover:text-hd-green transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hamidoudiallo.fusac@gmail.com
                </a>
                <a
                  href="tel:+33767376622"
                  className="flex items-center gap-3 text-sm text-hd-green/70 hover:text-hd-green transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (+33) 07 67 37 66 22
                </a>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-2 mb-3">
                <span className="text-hd-gold text-2xl font-serif">{'"'}</span>
              </div>
              <p className="text-hd-green/80 italic text-sm leading-relaxed mb-4">
                {
                  "J'ai lancé ma SAS à 24 ans grâce à Hamidou. Il a pris le temps de tout m'expliquer, même les trucs que je pensais trop techniques. Franchement, si t'hésites, fonce."
                }
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-hd-green rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">MB</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-hd-green">Mariam B.</p>
                  <p className="text-xs text-hd-green/50">Fondatrice, Studio Créatif</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar Widget */}
          <div className="reveal-right" style={{ transitionDelay: '0.3s' }}>
            {!isBooked ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Calendar Header */}
                <div className="bg-hd-green p-4 flex items-center justify-between">
                  <button
                    onClick={prevMonth}
                    className="text-white/70 hover:text-white transition-colors p-1"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-serif text-lg text-white capitalize">{monthYear}</span>
                  <button
                    onClick={nextMonth}
                    className="text-white/70 hover:text-white transition-colors p-1"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="p-4">
                  {/* Day headers */}
                  <div className="grid grid-cols-7 mb-2">
                    {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
                      <div key={day} className="text-center text-xs text-hd-green/50 font-medium py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => {
                      if (!day) {
                        return <div key={`empty-${index}`} className="aspect-square" />
                      }

                      const isAvailable = isWeekday(day) && !isPast(day)
                      const isSelected = isSameDay(day, selectedDate)

                      return (
                        <button
                          key={day.toISOString()}
                          onClick={() => isAvailable && handleDateSelect(day)}
                          disabled={!isAvailable}
                          className={`
                            aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all relative
                            ${
                              isAvailable
                                ? 'hover:bg-hd-green/5 cursor-pointer'
                                : 'text-hd-green/30 cursor-not-allowed'
                            }
                            ${isSelected ? 'bg-hd-green text-white hover:bg-hd-green' : 'text-hd-green'}
                          `}
                        >
                          {day.getDate()}
                          {isAvailable && !isSelected && (
                            <span className="absolute bottom-1.5 w-1 h-1 bg-hd-gold rounded-full" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="border-t border-hd-green/10 p-4 slide-down">
                    <p className="text-sm text-hd-green/60 mb-3">
                      Créneaux disponibles le {formatDate(selectedDate)}
                    </p>
                    {slotsLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="w-5 h-5 animate-spin text-hd-green/50" />
                      </div>
                    ) : availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableTimeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => handleTimeSelect(slot.time)}
                            className={`
                            py-2 px-3 text-sm rounded transition-all
                            ${
                              selectedTime === slot.time
                                ? 'bg-hd-gold text-hd-green'
                                : 'bg-hd-green/5 text-hd-green hover:bg-hd-green/10'
                            }
                          `}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-hd-green/50 text-center py-4">
                        Aucun créneau disponible ce jour
                      </p>
                    )}
                  </div>
                )}

                {/* Booking Form */}
                {showForm && (
                  <form onSubmit={handleSubmit} className="border-t border-hd-green/10 p-4 slide-down">
                    {bookingError && (
                      <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                        {bookingError}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Prénom"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm border border-hd-green/20 rounded focus:outline-none focus:border-hd-gold transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Nom"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm border border-hd-green/20 rounded focus:outline-none focus:border-hd-gold transition-colors"
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-hd-green/20 rounded focus:outline-none focus:border-hd-gold transition-colors mb-3"
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm border border-hd-green/20 rounded focus:outline-none focus:border-hd-gold transition-colors mb-3"
                    />
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <select
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({ ...formData, duration: e.target.value as '15' | '30' })
                        }
                        className="w-full px-3 py-2.5 text-sm border border-hd-green/20 rounded focus:outline-none focus:border-hd-gold transition-colors bg-white"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                      </select>
                      <select
                        value={formData.need}
                        onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm border border-hd-green/20 rounded focus:outline-none focus:border-hd-gold transition-colors bg-white"
                      >
                        {needOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-hd-green text-white py-3 rounded font-medium hover:bg-hd-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Réservation en cours...
                        </>
                      ) : (
                        'Confirmer ma réservation'
                      )}
                    </button>
                  </form>
                )}

                {/* Privacy note */}
                <div className="px-4 pb-4">
                  <p className="flex items-center justify-center gap-2 text-xs text-hd-green/40">
                    <Lock className="w-3 h-3" />
                    Vos données sont confidentielles et ne sont jamais partagées
                  </p>
                </div>
              </div>
            ) : (
              /* Confirmation */
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-hd-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-2xl text-hd-green mb-2">
                  Parfait ! Votre appel est réservé.
                </h3>
                <p className="text-hd-green/60 mb-6">
                  {selectedDate && selectedTime && (
                    <>
                      {formatDate(selectedDate)} à {selectedTime}
                      <br />
                      Durée : {formData.duration} minutes
                    </>
                  )}
                </p>
                <p className="text-sm text-hd-green/50 mb-6">
                  Vous recevrez une confirmation par email dans les prochaines minutes.
                </p>
                {calendarLink && (
                  <a
                    href={calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-hd-green/10 text-hd-green px-6 py-3 rounded font-medium hover:bg-hd-green/20 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Ajouter à mon calendrier
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-hd-green text-white px-6 py-4 rounded-lg shadow-xl toast flex items-center gap-3 z-50">
          <Check className="w-5 h-5 text-hd-gold" />
          <span>Réservation confirmée !</span>
        </div>
      )}
    </section>
  )
}
