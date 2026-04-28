"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Linkedin, Send, CheckCircle } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 px-4 sm:px-6 pb-20 sm:pb-28">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-6" />
          <p className="text-muted-foreground text-lg mb-10">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>

          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-4 mb-10">
            <motion.a
              href="mailto:amitmishra71204@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-3 glass rounded-2xl border border-primary/30 hover:border-primary/60 transition-all"
            >
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-foreground">amitmishra71204@gmail.com</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/amit-mishra-424a58308"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-3 glass rounded-2xl border border-primary/30 hover:border-primary/60 transition-all"
            >
              <Linkedin className="w-5 h-5 text-primary" />
              <span className="text-foreground">LinkedIn</span>
            </motion.a>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-5 sm:p-8"
          >
            <div className="grid gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isSubmitted
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gradient-to-r from-primary to-accent text-primary-foreground glow-cyan"
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
