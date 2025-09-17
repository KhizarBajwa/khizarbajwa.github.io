// js/app.js
import {
  Hero, AboutSection, Overview, FeaturedLinks, Work, TestimonialsCarousel,
  Education, Certifications, CoursesList, SkillsGrid,
  Capabilities, AdditionalTools, ContactSection, SiteFooter
} from './components.js';

import { initAnimations } from './gsap.js';

const App = {
  components: {
    Hero, AboutSection, Overview, FeaturedLinks, Work, TestimonialsCarousel,
    Education, Certifications, CoursesList, SkillsGrid,
    Capabilities, AdditionalTools, ContactSection, SiteFooter
  },
  data(){
    return {
      resume: {
        contact:{}, profile:{}, core_competencies:{},
        additional_tools:{}, experience:[], education:[],
        featured:[], certifications:[], courses:[], skills_linkedin:[]
      },
      testimonials: [
        { quote: "Khizar delivered robust UI and helped us become a leading stack in development of AI systems.", author: "Ankur Goyal",  role: "CTO · Braintrust (sample)" },
        { quote: "Exceptionally fast iterations, thoughtful architecture decisions, and clean shipping every sprint.", author: "Rishi Srivastavai", role: "Sr Director of Engineering (sample)" },
        { quote: "A reliable partner across .NET, Python, and DevOps — the work just gets done right.", author: "Product Owner",    role: "Enterprise Platform (sample)" }
      ],
      loading: true
    };
  },
  computed:{
    groupedSkills(){ return this.resume?.core_competencies || {}; },
    topTags(){
      const cc = this.resume?.core_competencies || {};
      const pick = (...arrs) => arrs.flat().filter(Boolean);
      const tags = pick(
        (cc.languages||[]).slice(0,4),
        (cc.frameworks||[]).slice(0,3),
        (cc.devops_cloud||[]).slice(0,2),
        (cc.databases||[]).slice(0,1)
      );
      return tags.length ? tags : ['.NET','Python','Angular','SQL','Docker','AWS'];
    }
  },
  mounted(){
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

      <about-section :profile="resume.profile"></about-section>

      <overview :resume="resume" :top-tags="topTags"></overview>

      <featured-links :items="resume.featured"></featured-links>

      <work :experience="resume.experience"></work>

      <testimonials-carousel :items="testimonials"></testimonials-carousel>

      <education :items="resume.education"></education>

      <certifications :items="resume.certifications"></certifications>

      <courses-list :items="resume.courses"></courses-list>

      <skills-grid :skills="resume.skills_linkedin"></skills-grid>

      <capabilities :groups="groupedSkills"></capabilities>

      <additional-tools :tools="resume.additional_tools"></additional-tools>

      <contact-section :email="resume.contact.email" :linkedin="resume.contact.linkedin"></contact-section>

      <site-footer></site-footer>

      <div v-if="loading" class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
        <div class="animate-pulse text-white/80">Loading resume…</div>
      </div>
    </div>
  `
};

Vue.createApp(App).mount('#app');
