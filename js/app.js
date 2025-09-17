// js/app.js
import {
  Hero,
  Overview,
  Work,
  TestimonialsCarousel,
  Capabilities,
  Education,
  ContactSection,
  SiteFooter
} from './components.js';

import { initAnimations } from './gsap.js';

const App = {
  components: {
    Hero, Overview, Work, TestimonialsCarousel, Capabilities, Education, ContactSection, SiteFooter
  },
  data(){
    return {
      resume: { contact:{}, core_competencies:{}, experience:[], education:[] },
      testimonials: [
        { quote: "Khizar delivered robust UI and helped us become a leading stack in development of AI systems.", author: "Ankur Goyal",  role: "CTO · Braintrust (sample)" },
        { quote: "Exceptionally fast iterations, thoughtful architecture decisions, and clean shipping every sprint.", author: "Rishi Srivastavai", role: "Sr Director of Engineering (sample)" },
        { quote: "A reliable partner across .NET, Python, and DevOps — the work just gets done right.",        author: "Product Owner",    role: "Enterprise Platform (sample)" }
      ],
      loading: true
    };
  },
  computed:{
    groupedSkills(){ return this.resume?.core_competencies || {}; },
    topTags(){
      const langs = this.resume?.core_competencies?.languages || [];
      const fw    = this.resume?.core_competencies?.frameworks || [];
      return [...langs.slice(0,4), ...fw.slice(0,3)];
    }
  },
  mounted(){
    // Robust path for modules: ../ goes from /js to project root
    const jsonURL = new URL('../resume_data.json', import.meta.url).toString();
    fetch(jsonURL, { cache:'no-store' })
      .then(r => { if(!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`); return r.json(); })
      .then(j => this.resume = j)
      .catch(e => console.error('Failed to load resume JSON', e))
      .finally(async () => {
        this.loading = false;
        await Vue.nextTick();
        initAnimations();
      });
  },
  template: `
    <div>
      <hero :resume="resume" :top-tags="topTags"></hero>
      <overview :resume="resume" :top-tags="topTags"></overview>
      <work :experience="resume.experience"></work>

      <testimonials-carousel :items="testimonials"></testimonials-carousel>

      <education :items="resume.education"></education>

      <capabilities :groups="groupedSkills"></capabilities>
      <contact-section :email="resume.contact.email" :linkedin="resume.contact.linkedin"></contact-section>
      <site-footer></site-footer>

      <div v-if="loading" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
        <div class="animate-pulse text-white/80">Loading resume…</div>
      </div>
    </div>
  `
};

Vue.createApp(App).mount('#app');
