const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Rate limiting for the AI assistant
const aiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: { success: false, error: 'Too many queries. Please try again shortly or contact our team directly.' }
});

const VBRION_KNOWLEDGE = {
  company: 'vbrion (vbrion analytics)',
  tagline: "engineering what's next",
  positioning: 'A forward-looking firm combining expert consulting with data, analytics, and AI engineering.',
  phone: '+91 7718079297',
  email: 'info@vbrion.com',
  consulting: [
    'Risk & Governance (ERM frameworks, internal controls, board advisory)',
    'Legal Compliances (statutory mapping, cross-border regulatory audit)',
    'Business Solutions (operational bottlenecks, lean scaling, revenue ops)',
    'Career Consulting (C-suite executive roadmaps, competency gaps)',
    'Placement Consulting (high-impact executive & quant talent search)',
    'Technology Consulting (cloud modernization, FinOps, enterprise AI governance)'
  ],
  analytical: [
    'Fintech Solutions (real-time fraud detection, credit scoring, payment reconciliation)',
    'Healthcare Analytics (predictive triage, clinical lakehouses, readmission drops)',
    'Banking Solutions (Basel III/IV stress testing, AML triaging, customer LTV)',
    'Education Analytics (adaptive telemetry, dropout early warnings, curriculum metrics)',
    'Business Development Analytics (B2B intent scoring, dynamic pricing, pipeline models)'
  ]
};

router.post('/chat', aiLimiter, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Please provide a message query.' });
    }

    const query = message.toLowerCase().trim();

    // Check if external LLM API key is present in env (optional feature flag)
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
      const candidateModels = [
        'gemini-2.5-flash',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
        'gemini-flash-latest'
      ];
      
      for (const model of candidateModels) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY.trim()}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `You are the executive AI assistant for vbrion (vbrion analytics), tagline "engineering what's next". 
Positioning: A firm combining expert consulting with data, analytics, and AI engineering.
Services:
Consulting: Risk & Governance, Legal Compliances, Business Solutions, Career Consulting, Placement Consulting, Technology Consulting.
Analytical Solutions: Fintech, Healthcare, Banking Solutions, Education, Business Development.
Contact: +91 7718079297, info@vbrion.com.
Always be concise, professional, foresight-oriented, and recommend scheduling a discussion via our contact form or calling +91 7718079297.
User asks: "${message}"`
                }]
              }]
            })
          });

          const data = await response.json();
          if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
            return res.json({
              success: true,
              reply: data.candidates[0].content.parts[0].text,
              source: `gemini-live (${model})`
            });
          }

          // If the key itself is invalid or unauthorized, break immediately to avoid latency
          if (data?.error?.status === 'INVALID_ARGUMENT' || data?.error?.code === 403 || data?.error?.code === 400) {
            console.warn(`[AI Route] Gemini API key notice: ${data.error.message}. Using built-in domain engine.`);
            break;
          }
        } catch (err) {
          // Continue to next candidate or fallback
        }
      }
    }

    // Embedded Domain Expert Assistant Engine
    let reply = '';
    let suggestedAction = 'contact_form';

    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      reply = "Welcome to vbrion analytics. We combine high-stakes strategic consulting with advanced data and AI engineering to help enterprises engineer sustainable advantage. How can I guide you today—would you like to explore our Consulting Services or Analytical Solutions?";
    } else if (query.includes('consult') || query.includes('risk') || query.includes('legal') || query.includes('governance')) {
      reply = "vbrion's Consulting Services division provides comprehensive advisory in:\n• Risk & Governance (ERM frameworks & audit readiness)\n• Legal Compliances (statutory mapping & cross-border audits)\n• Business Solutions & Technology Modernisation\n• Career & Placement Consulting for executive leadership.\n\nWould you like our team to conduct an initial discovery session for your organization?";
      suggestedAction = 'contact_form';
    } else if (query.includes('analytic') || query.includes('ai') || query.includes('ml') || query.includes('data') || query.includes('model')) {
      reply = "Our Analytical Solutions team engineers high-throughput algorithmic pipelines across:\n• Fintech (sub-15ms fraud detection & alternative credit scoring)\n• Healthcare (predictive patient triage & clinical lakehouses)\n• Banking (dynamic Basel stress testing & AML triaging)\n• Education & B2B Revenue Intelligence.\n\nAll solutions are built on modern data stacks (Snowflake, Databricks, PyTorch, Kafka). Would you like to view our case studies?";
      suggestedAction = 'view_work';
    } else if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('call') || query.includes('hire')) {
      reply = `You can connect directly with our leadership team at:\n📞 Phone: ${VBRION_KNOWLEDGE.phone}\n✉️ Email: ${VBRION_KNOWLEDGE.email}\nOr submit the contact form below with your specific domain requirements for a prompt reply.`;
      suggestedAction = 'contact_form';
    } else if (query.includes('fintech') || query.includes('fraud') || query.includes('payment')) {
      reply = "In Fintech, vbrion engineers real-time neural fraud meshes and alternative credit scoring engines with sub-15ms decisioning latency. Check out our case study on real-time transaction telemetry or connect with our financial engineering practice.";
    } else if (query.includes('health') || query.includes('hospital') || query.includes('clinic')) {
      reply = "In Healthcare, vbrion builds HIPAA-compliant clinical predictive lakehouses that cut emergency readmission by 30%+ through early risk trajectory forecasting. Let us know if you'd like a technical walkthrough.";
    } else if (query.includes('career') || query.includes('placement') || query.includes('recruit') || query.includes('job') || query.includes('hiring')) {
      reply = "vbrion provides specialized Career & Placement Consulting for senior executive talent and specialized quant/AI engineering teams. Reach out via info@vbrion.com or the enquiry form to discuss your talent pipeline.";
    } else {
      reply = `vbrion specializes in engineering what's next across 11 key service lines—from Risk, Governance & Legal Compliances to Fintech, Healthcare, and Banking AI. How can we tailor an engagement for your team? You can also reach our desk directly at ${VBRION_KNOWLEDGE.phone} or info@vbrion.com.`;
    }

    return res.json({
      success: true,
      reply,
      source: 'vbrion-domain-engine',
      suggestedAction
    });
  } catch (error) {
    console.error('[AI Assistant Route] Error:', error);
    res.status(500).json({ success: false, error: 'Assistant temporarily unavailable.' });
  }
});

module.exports = router;
