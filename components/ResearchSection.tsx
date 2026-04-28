"use client"

import { motion } from "framer-motion"
import { FileText, ExternalLink, Award, Brain, Languages, Sparkles } from "lucide-react"

const highlights = [
  { icon: Brain, label: "Transformer-based NLP" },
  { icon: Sparkles, label: "Explainable AI (SHAP)" },
  { icon: Languages, label: "Multi-language Detection" },
]

export default function ResearchSection() {
  return (
    <section id="research" className="py-12 sm:py-16 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Research & Publications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contributing to the academic community through innovative research
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
        >
          {/* Published Badge */}
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium border border-green-500/30">
              <Award size={16} />
              Published
            </span>
          </div>

          {/* Paper Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center mb-6 border border-primary/30">
            <FileText className="w-8 h-8 text-primary" />
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 pr-32">
            Explainable AI for Indian Language Detection
          </h3>
          
          {/* Conference */}
          <p className="text-primary font-medium mb-4">
            International Conference Paper
          </p>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Developed an IndicBERT-based Transformer model with SHAP-based explainability 
            for detecting and classifying multiple Indian languages. The research focuses on 
            making AI decisions transparent and interpretable for multilingual NLP applications.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-3 mb-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm"
              >
                <item.icon size={16} className="text-primary" />
                <span className="text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* View Paper Button */}
          <motion.a
            href="#"
            className="flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Paper</span>
            <ExternalLink size={18} />
          </motion.a>

          {/* Decorative gradient */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </div>
    </section>
  )
}
